/**
 * ダウンロードオプションの型定義
 */
export interface DownloadOptions {
  /** ダウンロードファイル名 */
  filename?: string;
  /** 画像品質（0-1） */
  quality?: number;
}

/**
 * 現在の日時からファイル名を生成する
 * @returns YYYYMMDD_HHMMSS形式のファイル名
 */
function generateFilename(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `qrcode_${year}${month}${day}_${hours}${minutes}${seconds}.png`;
}

/**
 * QRコード画像をダウンロードする
 * @param dataURL - ダウンロードする画像のData URL
 * @param options - ダウンロードオプション
 */
export function downloadQRCode(
  dataURL: string,
  options: DownloadOptions = {}
): void {
  try {
    // ファイル名の生成
    const filename = options.filename || generateFilename();

    // アンカー要素を作成してダウンロードをトリガー
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;

    // DOMに追加せずにクリックイベントをトリガー
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    throw new Error(`ダウンロードエラー: ${error instanceof Error ? error.message : String(error)}`);
  }
}
