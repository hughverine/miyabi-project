import { describe, it, expect, beforeEach, vi } from 'vitest';
import { downloadQRCode } from '../src/utils/download';

// DOM環境のモック
global.document = {
  createElement: vi.fn(),
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn()
  }
} as any;

describe('downloadQRCode', () => {
  let mockLink: any;

  beforeEach(() => {
    // モックリンク要素をリセット
    mockLink = {
      href: '',
      download: '',
      click: vi.fn()
    };

    // createElementのモック
    vi.mocked(document.createElement).mockReturnValue(mockLink);

    // body操作のモックをリセット
    vi.mocked(document.body.appendChild).mockClear();
    vi.mocked(document.body.removeChild).mockClear();
  });

  describe('正常系', () => {
    it('Data URLからダウンロードを実行する', () => {
      const dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      downloadQRCode(dataURL);

      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(mockLink.href).toBe(dataURL);
      expect(mockLink.download).toMatch(/^qrcode_\d{8}_\d{6}\.png$/);
      expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
      expect(mockLink.click).toHaveBeenCalled();
      expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
    });

    it('カスタムファイル名でダウンロードする', () => {
      const dataURL = 'data:image/png;base64,test';
      const customFilename = 'my-qrcode.png';

      downloadQRCode(dataURL, { filename: customFilename });

      expect(mockLink.download).toBe(customFilename);
    });

    it('ファイル名が自動生成される場合、正しい形式になる', () => {
      const dataURL = 'data:image/png;base64,test';

      downloadQRCode(dataURL);

      // ファイル名の形式: qrcode_YYYYMMDD_HHMMSS.png
      expect(mockLink.download).toMatch(/^qrcode_\d{8}_\d{6}\.png$/);
    });
  });

  describe('エラーハンドリング', () => {
    it('DOM操作でエラーが発生した場合、エラーをスローする', () => {
      vi.mocked(document.createElement).mockImplementation(() => {
        throw new Error('DOM error');
      });

      const dataURL = 'data:image/png;base64,test';

      expect(() => downloadQRCode(dataURL)).toThrow('ダウンロードエラー');
    });
  });

  describe('ファイル名生成', () => {
    it('異なる時刻に生成したファイル名は異なる', () => {
      const dataURL = 'data:image/png;base64,test';

      downloadQRCode(dataURL);
      const filename1 = mockLink.download;

      // 少し待機
      vi.useFakeTimers();
      vi.advanceTimersByTime(1000);

      mockLink.download = '';
      downloadQRCode(dataURL);
      const filename2 = mockLink.download;

      vi.useRealTimers();

      expect(filename1).not.toBe(filename2);
    });
  });
});
