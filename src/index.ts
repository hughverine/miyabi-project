/**
 * URL to QRコード変換アプリケーション - メインエントリーポイント
 * Powered by Miyabi Framework
 */

import { validateURL } from './utils/validation';
import { generateQRCode, QR_SIZE_PRESETS } from './utils/qrcode';
import { downloadQRCode } from './utils/download';

/**
 * アプリケーション状態
 */
interface AppState {
  currentQRCode: string | null;
  isGenerating: boolean;
}

const state: AppState = {
  currentQRCode: null,
  isGenerating: false
};

/**
 * DOM要素の参照（遅延初期化）
 */
let elements: {
  urlInput: HTMLInputElement;
  errorMessage: HTMLDivElement;
  sizeSelect: HTMLSelectElement;
  errorLevel: HTMLSelectElement;
  qrcodeImg: HTMLImageElement;
  placeholder: HTMLDivElement;
  loading: HTMLDivElement;
  generateBtn: HTMLButtonElement;
  downloadBtn: HTMLButtonElement;
  clearBtn: HTMLButtonElement;
};

/**
 * DOM要素を初期化
 */
function initElements(): void {
  elements = {
    urlInput: document.getElementById('urlInput') as HTMLInputElement,
    errorMessage: document.getElementById('errorMessage') as HTMLDivElement,
    sizeSelect: document.getElementById('sizeSelect') as HTMLSelectElement,
    errorLevel: document.getElementById('errorLevel') as HTMLSelectElement,
    qrcodeImg: document.getElementById('qrcode') as HTMLImageElement,
    placeholder: document.getElementById('placeholder') as HTMLDivElement,
    loading: document.getElementById('loading') as HTMLDivElement,
    generateBtn: document.getElementById('generateBtn') as HTMLButtonElement,
    downloadBtn: document.getElementById('downloadBtn') as HTMLButtonElement,
    clearBtn: document.getElementById('clearBtn') as HTMLButtonElement
  };
}

/**
 * エラーメッセージを表示
 */
function showError(message: string): void {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.add('show');
  elements.urlInput.classList.add('error');
}

/**
 * エラーメッセージをクリア
 */
function clearError(): void {
  elements.errorMessage.classList.remove('show');
  elements.urlInput.classList.remove('error');
}

/**
 * ローディング状態を設定
 */
function setLoading(loading: boolean): void {
  state.isGenerating = loading;

  if (loading) {
    elements.placeholder.style.display = 'none';
    elements.qrcodeImg.classList.remove('show');
    elements.loading.classList.add('show');
    elements.generateBtn.disabled = true;
  } else {
    elements.loading.classList.remove('show');
    elements.generateBtn.disabled = false;
  }
}

/**
 * QRコードを表示
 */
function displayQRCode(dataURL: string): void {
  state.currentQRCode = dataURL;
  elements.qrcodeImg.src = dataURL;
  elements.qrcodeImg.classList.add('show');
  elements.placeholder.style.display = 'none';
  elements.downloadBtn.disabled = false;
}

/**
 * 表示をリセット
 */
function resetDisplay(): void {
  state.currentQRCode = null;
  elements.qrcodeImg.classList.remove('show');
  elements.placeholder.style.display = 'block';
  elements.downloadBtn.disabled = true;
}

/**
 * QRコード生成処理
 */
async function handleGenerate(): Promise<void> {
  const url = elements.urlInput.value.trim();

  // バリデーション
  clearError();
  const validationResult = validateURL(url);

  if (!validationResult.isValid) {
    showError(validationResult.errorMessage || 'エラーが発生しました');
    return;
  }

  try {
    setLoading(true);

    // QRコード生成オプション
    const size = parseInt(elements.sizeSelect.value, 10);
    const errorCorrectionLevel = elements.errorLevel.value as 'L' | 'M' | 'Q' | 'H';

    // QRコード生成
    const qrCodeDataURL = await generateQRCode(url, {
      size,
      errorCorrectionLevel
    });

    // 表示
    displayQRCode(qrCodeDataURL);
  } catch (error) {
    showError(
      error instanceof Error
        ? error.message
        : 'QRコードの生成中にエラーが発生しました'
    );
  } finally {
    setLoading(false);
  }
}

/**
 * ダウンロード処理
 */
function handleDownload(): void {
  if (!state.currentQRCode) {
    return;
  }

  try {
    downloadQRCode(state.currentQRCode);
  } catch (error) {
    showError(
      error instanceof Error
        ? error.message
        : 'ダウンロード中にエラーが発生しました'
    );
  }
}

/**
 * クリア処理
 */
function handleClear(): void {
  elements.urlInput.value = '';
  clearError();
  resetDisplay();
  elements.urlInput.focus();
}

/**
 * イベントリスナーの設定
 */
function setupEventListeners(): void {
  // 生成ボタン
  elements.generateBtn.addEventListener('click', handleGenerate);

  // ダウンロードボタン
  elements.downloadBtn.addEventListener('click', handleDownload);

  // クリアボタン
  elements.clearBtn.addEventListener('click', handleClear);

  // Enterキーで生成
  elements.urlInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleGenerate();
    }
  });

  // 入力時にエラーをクリア
  elements.urlInput.addEventListener('input', () => {
    clearError();
  });

  // サイズ変更時に再生成（QRコードが既に生成されている場合）
  elements.sizeSelect.addEventListener('change', () => {
    if (state.currentQRCode) {
      handleGenerate();
    }
  });

  // エラー訂正レベル変更時に再生成
  elements.errorLevel.addEventListener('change', () => {
    if (state.currentQRCode) {
      handleGenerate();
    }
  });
}

/**
 * アプリケーション初期化
 */
function initApp(): void {
  console.log('🔗 URL to QRコード変換アプリ起動');
  console.log('Powered by Miyabi Framework');

  initElements();
  setupEventListeners();
  elements.urlInput.focus();
}

// DOMContentLoaded後に初期化
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

// エクスポート（テスト用）
export { handleGenerate, handleDownload, handleClear };
