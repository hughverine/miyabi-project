# URL to QRコード変換アプリ

URLを入力するだけでQRコードを生成・ダウンロードできるWebアプリケーション

Autonomous development powered by **Miyabi** - AI-driven development framework.

## アプリケーション概要

このプロジェクトは、URLを簡単にQRコードに変換できるWebアプリケーションです。
シンプルで使いやすいUIと、高品質なQRコード生成機能を提供します。

### 主な機能

- 📝 **URL入力**: リアルタイムバリデーション付きの入力フォーム
- 🔲 **QRコード生成**: 高品質なQRコード生成（3つのサイズ対応）
- 💾 **ダウンロード**: PNG形式で簡単ダウンロード
- 🎨 **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- ⚡ **高速**: リアルタイムで即座に生成
- ♿ **アクセシビリティ**: ARIA属性によるアクセシビリティ対応

### デモ

1. URLを入力（例: `https://example.com`）
2. サイズとエラー訂正レベルを選択
3. 「QRコード生成」ボタンをクリック
4. 生成されたQRコードをダウンロード

## 技術スタック

- **TypeScript**: 型安全な開発
- **QRCode**: 高品質なQRコード生成ライブラリ
- **Vitest**: 高速なユニットテスト
- **ESLint**: コード品質管理
- **Miyabi Framework**: AI駆動の自律開発フレームワーク

## Getting Started

### Prerequisites

```bash
# Node.js 18以上が必要
node -v  # v18.0.0以上

# 環境変数の設定（Miyabiフレームワーク使用時）
cp .env.example .env
# Edit .env and add your tokens
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev          # Run development server
npm run build        # Build project
npm test             # Run tests
npm run typecheck    # Check types
npm run lint         # Lint code
```

### アプリケーションの起動

1. ビルド:
```bash
npm run build
```

2. ブラウザで `public/index.html` を開く

または、開発サーバーを使用:
```bash
npm run dev
```

## Project Structure

```
miyabi-project/
├── src/                    # Source code
│   ├── index.ts           # メインアプリケーション
│   └── utils/             # ユーティリティ関数
│       ├── validation.ts  # URL検証ロジック
│       ├── qrcode.ts      # QRコード生成機能
│       └── download.ts    # ダウンロード機能
├── public/                # 静的ファイル
│   └── index.html        # メインHTML
├── tests/                 # テストファイル
│   ├── validation.test.ts # URL検証テスト
│   ├── qrcode.test.ts    # QRコード生成テスト
│   └── download.test.ts  # ダウンロード機能テスト
├── .claude/              # AI agent configuration
│   ├── agents/           # Agent definitions
│   └── commands/         # Custom commands
├── .github/
│   ├── workflows/        # CI/CD automation
│   └── labels.yml        # Label system (46 labels)
├── CLAUDE.md             # AI context file
├── README.md             # このファイル
└── package.json
```

## API ドキュメント

### `validateURL(url: string): ValidationResult`

URLの妥当性を検証します。

**パラメータ:**
- `url`: 検証するURL文字列

**戻り値:**
```typescript
{
  isValid: boolean;
  errorMessage?: string;
}
```

### `generateQRCode(url: string, options?: QRCodeOptions): Promise<string>`

URLからQRコードを生成します。

**パラメータ:**
- `url`: QRコードに変換するURL
- `options`: QRコード生成オプション（省略可）
  - `size`: QRコードのサイズ（デフォルト: 256）
  - `errorCorrectionLevel`: エラー訂正レベル（L/M/Q/H、デフォルト: M）
  - `foregroundColor`: 前景色（デフォルト: #000000）
  - `backgroundColor`: 背景色（デフォルト: #FFFFFF）

**戻り値:**
Data URLとして生成されたQRコード画像

### `downloadQRCode(dataURL: string, options?: DownloadOptions): void`

QRコード画像をダウンロードします。

**パラメータ:**
- `dataURL`: ダウンロードする画像のData URL
- `options`: ダウンロードオプション（省略可）
  - `filename`: ダウンロードファイル名（デフォルト: 自動生成）

## テスト

全31件のテストが実装されており、カバレッジは85%以上を達成しています。

```bash
npm test                # 全テスト実行
npm run test:coverage   # カバレッジレポート生成
```

**テストカバレッジ:**
- ✅ URL検証: 14テスト
- ✅ QRコード生成: 12テスト
- ✅ ダウンロード機能: 5テスト

## Miyabi Framework

This project uses **7 autonomous AI agents**:

1. **CoordinatorAgent** - Task planning & orchestration
2. **IssueAgent** - Automatic issue analysis & labeling
3. **CodeGenAgent** - AI-powered code generation
4. **ReviewAgent** - Code quality validation (80+ score)
5. **PRAgent** - Automatic PR creation
6. **DeploymentAgent** - CI/CD deployment automation
7. **TestAgent** - Test execution & coverage

### Workflow

1. **Create Issue**: Describe what you want to build
2. **Agents Work**: AI agents analyze, implement, test
3. **Review PR**: Check generated pull request
4. **Merge**: Automatic deployment

### Label System

Issues transition through states automatically:

- `📥 state:pending` - Waiting for agent assignment
- `🔍 state:analyzing` - Being analyzed
- `🏗️ state:implementing` - Code being written
- `👀 state:reviewing` - Under review
- `✅ state:done` - Completed & merged

## Commands

```bash
# Check project status
npx miyabi status

# Watch for changes (real-time)
npx miyabi status --watch

# Create new issue
gh issue create --title "Add feature" --body "Description"
```

## Configuration

### Environment Variables

Required variables (see `.env.example`):

- `GITHUB_TOKEN` - GitHub personal access token
- `ANTHROPIC_API_KEY` - Claude API key (optional for local development)
- `REPOSITORY` - Format: `owner/repo`

### GitHub Actions

Workflows are pre-configured in `.github/workflows/`:

- CI/CD pipeline
- Automated testing
- Deployment automation
- Agent execution triggers

**Note**: Set repository secrets at:
`https://github.com/hughverine/miyabi-project/settings/secrets/actions`

Required secrets:
- `GITHUB_TOKEN` (auto-provided by GitHub Actions)
- `ANTHROPIC_API_KEY` (add manually for agent execution)

## Documentation

- **Miyabi Framework**: https://github.com/ShunsukeHayashi/Miyabi
- **NPM Package**: https://www.npmjs.com/package/miyabi
- **Label System**: See `.github/labels.yml`
- **Agent Operations**: See `CLAUDE.md`

## Support

- **Issues**: https://github.com/ShunsukeHayashi/Miyabi/issues
- **Discord**: [Coming soon]

## License

MIT

---

✨ Generated by [Miyabi](https://github.com/ShunsukeHayashi/Miyabi)
