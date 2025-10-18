import { describe, it, expect } from 'vitest';
import { validateURL } from '../src/utils/validation';

describe('validateURL', () => {
  describe('有効なURL', () => {
    it('http://プロトコルのURLを許可する', () => {
      const result = validateURL('http://example.com');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it('https://プロトコルのURLを許可する', () => {
      const result = validateURL('https://example.com');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it('パスを含むURLを許可する', () => {
      const result = validateURL('https://example.com/path/to/page');
      expect(result.isValid).toBe(true);
    });

    it('クエリパラメータを含むURLを許可する', () => {
      const result = validateURL('https://example.com?query=test&foo=bar');
      expect(result.isValid).toBe(true);
    });

    it('ポート番号を含むURLを許可する', () => {
      const result = validateURL('https://example.com:8080');
      expect(result.isValid).toBe(true);
    });

    it('ハッシュを含むURLを許可する', () => {
      const result = validateURL('https://example.com#section');
      expect(result.isValid).toBe(true);
    });
  });

  describe('無効なURL', () => {
    it('空文字列を拒否する', () => {
      const result = validateURL('');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('URLを入力してください');
    });

    it('空白のみの文字列を拒否する', () => {
      const result = validateURL('   ');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('URLを入力してください');
    });

    it('プロトコルのないURLを拒否する', () => {
      const result = validateURL('example.com');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('有効なURLを入力してください');
    });

    it('無効なプロトコルを拒否する', () => {
      const result = validateURL('ftp://example.com');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('http:// または https://');
    });

    it('長すぎるURL（2048文字超）を拒否する', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(2048);
      const result = validateURL(longUrl);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('URLが長すぎます（最大2048文字）');
    });

    it('不正な形式の文字列を拒否する', () => {
      const result = validateURL('not a url at all');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('有効なURLを入力してください');
    });
  });

  describe('境界値テスト', () => {
    it('ちょうど2048文字のURLを許可する', () => {
      const url = 'https://example.com/' + 'a'.repeat(2048 - 'https://example.com/'.length);
      const result = validateURL(url);
      expect(result.isValid).toBe(true);
    });

    it('2049文字のURLを拒否する', () => {
      const url = 'https://example.com/' + 'a'.repeat(2049 - 'https://example.com/'.length);
      const result = validateURL(url);
      expect(result.isValid).toBe(false);
    });
  });
});
