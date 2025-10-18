/**
 * URL検証結果の型定義
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * URLの妥当性を検証する
 * @param url - 検証するURL文字列
 * @returns 検証結果
 */
export function validateURL(url: string): ValidationResult {
  // 空欄チェック
  if (!url || url.trim() === '') {
    return {
      isValid: false,
      errorMessage: 'URLを入力してください'
    };
  }

  // 長さ制限チェック（QRコード生成可能範囲）
  if (url.length > 2048) {
    return {
      isValid: false,
      errorMessage: 'URLが長すぎます（最大2048文字）'
    };
  }

  // URL形式の検証
  try {
    const urlObj = new URL(url);

    // プロトコルチェック（http/https）
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        isValid: false,
        errorMessage: '有効なURLを入力してください（http:// または https:// で始まる必要があります）'
      };
    }

    return {
      isValid: true
    };
  } catch (error) {
    return {
      isValid: false,
      errorMessage: '有効なURLを入力してください'
    };
  }
}
