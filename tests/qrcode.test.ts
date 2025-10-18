import { describe, it, expect } from 'vitest';
import { generateQRCode, DEFAULT_QR_OPTIONS, QR_SIZE_PRESETS } from '../src/utils/qrcode';

describe('generateQRCode', () => {
  describe('正常系', () => {
    it('デフォルトオプションでQRコードを生成する', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url);

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('カスタムサイズでQRコードを生成する', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: 512,
        errorCorrectionLevel: 'M'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('異なるエラー訂正レベルで生成する - L', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: 256,
        errorCorrectionLevel: 'L'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('異なるエラー訂正レベルで生成する - Q', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: 256,
        errorCorrectionLevel: 'Q'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('異なるエラー訂正レベルで生成する - H', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: 256,
        errorCorrectionLevel: 'H'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('カスタムカラーでQRコードを生成する', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: 256,
        errorCorrectionLevel: 'M',
        foregroundColor: '#FF0000',
        backgroundColor: '#FFFFFF'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('小サイズプリセットでQRコードを生成する', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: QR_SIZE_PRESETS.small,
        errorCorrectionLevel: 'M'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('大サイズプリセットでQRコードを生成する', async () => {
      const url = 'https://example.com';
      const result = await generateQRCode(url, {
        size: QR_SIZE_PRESETS.large,
        errorCorrectionLevel: 'M'
      });

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });
  });

  describe('異常系', () => {
    it('空文字列を渡すとエラーをスローする', async () => {
      await expect(generateQRCode('')).rejects.toThrow();
    });

    it('非常に長い文字列でも生成できる', async () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000);
      const result = await generateQRCode(longUrl);

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:image\/png;base64,/);
    });
  });

  describe('定数', () => {
    it('DEFAULT_QR_OPTIONSが正しく定義されている', () => {
      expect(DEFAULT_QR_OPTIONS).toBeDefined();
      expect(DEFAULT_QR_OPTIONS.size).toBe(256);
      expect(DEFAULT_QR_OPTIONS.errorCorrectionLevel).toBe('M');
      expect(DEFAULT_QR_OPTIONS.foregroundColor).toBe('#000000');
      expect(DEFAULT_QR_OPTIONS.backgroundColor).toBe('#FFFFFF');
    });

    it('QR_SIZE_PRESETSが正しく定義されている', () => {
      expect(QR_SIZE_PRESETS.small).toBe(128);
      expect(QR_SIZE_PRESETS.medium).toBe(256);
      expect(QR_SIZE_PRESETS.large).toBe(512);
    });
  });
});
