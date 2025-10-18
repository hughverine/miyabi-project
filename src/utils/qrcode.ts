import QRCode from 'qrcode';

/**
 * QRコード生成オプションの型定義
 */
export interface QRCodeOptions {
  /** QRコードのサイズ（ピクセル） */
  size: number;
  /** エラー訂正レベル */
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  /** 前景色（QRコードの色） */
  foregroundColor?: string;
  /** 背景色 */
  backgroundColor?: string;
}

/**
 * デフォルトのQRコード生成オプション
 */
export const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  size: 256,
  errorCorrectionLevel: 'M',
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF'
};

/**
 * URLからQRコードを生成する
 * @param url - QRコードに変換するURL
 * @param options - QRコード生成オプション
 * @returns Data URLとして生成されたQRコード画像
 */
export async function generateQRCode(
  url: string,
  options: Partial<QRCodeOptions> = {}
): Promise<string> {
  const mergedOptions = { ...DEFAULT_QR_OPTIONS, ...options };

  try {
    const dataURL = await QRCode.toDataURL(url, {
      width: mergedOptions.size,
      errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
      color: {
        dark: mergedOptions.foregroundColor || '#000000',
        light: mergedOptions.backgroundColor || '#FFFFFF'
      }
    });

    return dataURL;
  } catch (error) {
    throw new Error(`QRコード生成エラー: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 利用可能なQRコードサイズのプリセット
 */
export const QR_SIZE_PRESETS = {
  small: 128,
  medium: 256,
  large: 512
} as const;
