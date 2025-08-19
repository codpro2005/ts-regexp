# ts-regexp
[![npm version](https://img.shields.io/npm/v/ts-regexp.svg)](https://www.npmjs.com/package/ts-regexp)
[![bundle size](https://img.shields.io/bundlejs/size/ts-regexp)](https://www.npmjs.com/package/ts-regexp)
[![npm monthly downloads](https://img.shields.io/npm/dm/ts-regexp.svg)](https://www.npmjs.com/package/ts-regexp)
[![typescript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![github stars](https://img.shields.io/github/stars/codpro2005/ts-regexp.svg?style=social)](https://github.com/codpro2005/ts-regexp)

A strictly typed & minimal RegExp wrapper.

```ts
const groups1 = new RegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('1856-07-10')!.groups;
//      ⤴ '{ [key: string]: string; } | undefined' 🤮
const groups2 = typedRegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('1856-07-10')!.groups;
//      ⤴ '{ year: string, month: string, day: string }' 🥰
```
[▶ Try it in the TypeScript Playground](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzjAnmApgEwEroOYCiAHmHAL5wBmUEIcA5DAM4C0U+6J9A3AFC8B6AXABCAQybAAxnACuTMXnS8pEAHZN4qDJgAiYmOgAKBw1DVwAvMjRZchEgAp6APUcB+ADwp0YqAD4AHUDMBAAWMgBKFg9PEHUYAAsgkIQAJiiYr0wxFBTQjMiAEnoAGgY8eki+VQ14TnQpXCYrGx19QxMYMzUAOgapZzSABlGWAEZhljSwqoBCXrwaWTAmPiE4TbgXdxV1TTh2MAAbMSl0ZtbtLA7jU3RzXqPT84BJNSHRqcnp2fLHEAGKSJco+PzleJqJLlHIocoQSiUJjoGDlTRQYBqPDlJYQFZMSJWfxwAAGRQQuPxvVhZF65Mpq16kKStPpy0ZYKgZBJkTm62EW0FQuFItFYvFEslUolO34GwAwglODBZGJjnAxAB3PzoNToJhMQQCuC4GBiTEtVRQdhSeAQMAwYDqNXAVBwABGEiwcHUcCYqgwezqPodTrUaoAiqqoa6UABxdktazXHD4YhgZxuLwAR2jjtQ+QA1LFZGpXf4ANpiFgALwAuoXIpF3CVIkygYl3p9hmAiPNFom+PbHc7jlGxDHUAm8YzS67+dKRbLgJQ4I5h2HI3nY9OqbmJ-mUISELxBRvR+PJ-HE705zBuHANq9V-ur3BgC08MAAG668piOQy3gEB5Hgd10DgMAaG-YBMG9CQ4E1dBjmOXpTy2DZFyFWUyDlY0AEFjiYCBEOgABrFpNVdRINWOHoDDDIMDkxMBZHgZNbFTBwM1cWJDCIGBK2retGwAH1iV9DyLEsgKE2sGybVt2xgYEu3oEYez7XkBxnNZeBYtjbyAo1BWXVdHAMmBen49jLGsUs4MoTEsGPdDNksoz50fYRn3fNRWPgD81EYDVkGVcpXTgECDkBFSaMk2NEMSaQaMxKRjlkOCWgAu80MFTDNhwvC4AAZTESh8FVKBMENAqCH9MQwExPA4AAMjgeVEj8M4zHlU4DTgLq1EwY5mt4FN7HTZxglicMQCwFJIiqZTVI+ehPDmhalu0hk9IKrCDqlWUJrTJx6FiJyoE0fJImCcSvGRWpMDk+ttpWzs1rCUSxH7XaF0OgHAdM3YTu45wKwu4ArsE27AjrWJHvUZ7IjrftYtW5x-F+wcTKBvGZV2XG4CMGgMFgFA4E4D9DDUc4TIAAWYFhOAwW1metaAAC4GHRxJCOOd56DgQsGGeM50H5wW4EwdQQqpg5JFpiC1BI+hKioU48F4CtQam+gwHucxlt5yW1HKXWzoN7oHmCtsxfOU26z4C2eKtnoygqY2O1NvgGaZlnGhgdmaCgbn6ExTBpH1IWZf1YL6iIam-TS5XVcwIXKE18bOMmy3Ddt-oiEaZx+wjqO9Jd5w3Ztj36HTtsBhL7Sy-OPSiYAMU1uBvxdSPUD91gA7Zh4Q+5o5fEMTANcUbOdFz1389rr9KmqAfmZIQPg65hhZCFicp-ob8M81y0JxVsCINUEB3WczBZ7sU6F+to3yjV2Qj9Xkz8MwPvN3VUazBqj8pQaAsVGK1AOJwMQ4Bjh3GfhYDic9H7OBACgLo7tX5fnrnwKBMC4E9F6MRWQUBzj-QJrwXBJx8E216JnRQe1jTillHVROmhdTnB9KuOheBDSUNgegmhXUmDvEjq3HBRBoFUIEY8TQ0gyIoDIb0JRQA)
## 🚀 Setup
1. Install `ts-regexp`
```shell
# Using npm
npm install ts-regexp

# Using yarn
yarn add ts-regexp

# Using pnpm
pnpm add ts-regexp
```
2. Import `typedRegExp`:
```ts
import { typedRegExp } from 'ts-regexp';
```
## 🧩 Usage

### Basic Usage

Import and use `typedRegExp` just like the native `RegExp` constructor:

```typescript
import { typedRegExp } from 'ts-regexp';

const datePattern = typedRegExp('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})');
const emailPattern = typedRegExp('^(?<local>[a-z0-9._%+-]+)@(?<domain>[a-z0-9.-]+\.[a-z]{2,})$', 'i');
```

The function signature is:
```typescript
typedRegExp(pattern: string, flags?: string)
```
> Note: `typedRegExp` returns a plain object, **not** a `RegExp` instance.

### Standard RegExp Methods

All standard `RegExp` methods work exactly as expected, but with equivalent or improved typing:

```typescript
const pattern = typedRegExp('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})', 'gid');

// Standard methods
pattern.exec('2000-10-24')!.groups;  // { year: string; month: string; day: string; }
pattern.test('2000-10-24');  // boolean

// Access RegExp properties
pattern.source;  // "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})"
pattern.flags;   // "dgi"
pattern.global;  // true
pattern.sticky;  // false
//  ...
```

### Regex-first Methods

Each `RegExp`-related `string.prototype` method is available as `${MethodName}In` with equivalent or improved typing:

```typescript
const datePattern = typedRegExp('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})');
const text = '1976-11-21';

// Instead of: text.match(pattern)
const match = datePattern.matchIn(text); // typed match

// Instead of: text.replace(pattern, replacement)
const formatted1 = datePattern.replaceIn(text, '$<day>/$<month>/$<year>');
const formatted2 = datePattern.replaceIn(text, (match, year, month, day, offset, string, groups) => `${groups.day}/${groups.month}/${groups.year}`); // typed arguments

// Other inversed methods
datePattern.searchIn(text);    // like text.search(pattern)
datePattern.splitIn(text);     // like text.split(pattern)
```

### Global Flag Methods

When using the global (`g`) flag, additional methods become available:

```typescript
const digitPattern = typedRegExp('\\d', 'g');

// Only available with 'g' flag
digitPattern.matchAllIn('1973-12-08');     // like text.matchAll(pattern)
digitPattern.replaceAllIn('123-456', '#'); // like text.replaceAll(pattern, replacement)
```

### Advanced Usage

If you need access to the underlying `RegExp` instance:

```typescript
const pattern = typedRegExp('\\d+');
const nativeRegExp = pattern.regExp; // Regular RegExp instance
```

## ✨ Features
- ✅ Strictly typed named & unnamed capture groups
- ✅ Supports contextual awareness
- ✅ Parses:
  - nested groups
  - different group types (non-capturing, lookarounds, named captures, etc.)
  - alternation
  - character classes and escaped characters
- ✅ Infers group optionality from quantifiers (`?`, `*`, `{n,m}`)
- ✅ Validates flags
- ✅ Supports dynamic (non-literal) pattern + flag inputs


## 📘 API
> 📋 **Planned**

For now, refer to [Examples](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzjAnmApgEwEroOYCiAHmHAL5wBmUEIcA5DAM4C0U+6J9A3AFC8B6AXABCAQybAAxnACuTMXnS8pEAHZN4qDJgAiYmOgAKBw1DVwAvMjRZchEgAp6APUcB+ADwp0YqAD4AHUDMBAAWMgBKFg9PEHUYAAsgkIQAJiiYr0wxFBTQjMiAEnoAGgY8eki+VQ14TnQpXCYrGx19QxMYMzUAOgapZzSABlGWAEZhljSwqoBCXrwaWTAmPiE4TbgXdxV1TTh2MAAbMSl0ZtbtLA7jU3RzXqPT84BJNSHRqcnp2fLHEAGKSJco+PzleJqJLlHIocoQSiUJjoGDlTRQYBqPDlJYQFZMSJWfxwAAGRQQuPxvVhZF65Mpq16kKStPpy0ZYKgZBJkTm62EW0FQuFItFYvFEslUolO34GwAwglODBZGJjnAxAB3PzoNToJhMQQCuC4GBiTEtVRQdhSeAQMAwYDqNXAVBwABGEiwcHUcCYqgwezqPodTrUaoAiqqoa6UABxdktazXHD4YhgZxuLwAR2jjtQ+QA1LFZGpXf4ANpiFgALwAuoXIpF3CVIkygYl3p9hmAiPNFom+PbHc7jlGxDHUAm8YzS67+dKRbLgJQ4I5h2HI3nY9OqbmJ-mUISELxBRvR+PJ-HE705zBuHANq9V-ur3BgC08MAAG668piOQy3gEB5Hgd10DgMAaG-YBMG9CQ4E1dBjmOXpTy2DZFyFWUyDlY0AEFjiYCBEOgABrFpNVdRINWOHoDDDIMDkxMBZHgZNbFTBwM1cWJDCIGBK2retGwAH1iV9DyLEsgKE2sGybVt2xgYEu3oEYez7XkBxnNZeBYtjbyAo1BWXVdHAMmBen49jLGsUs4MoTEsGPdDNksoz50fYRn3fNRWPgD81EYDVkGVcpXTgECDkBFSaMk2NEMSaQaMxKRjlkOCWgAu80MFTDNhwvC4AAZTESh8FVKBMENAqCH9MQwExPA4AAMjgeVEj8M4zHlU4DTgLq1EwY5mt4FN7HTZxglicMQCwFJIiqZTVI+ehPDmhalu0hk9IKrCDqlWUJrTJx6FiJyoE0fJImCcSvGRWpMDk+ttpWzs1rCUSxH7XaF0OgHAdM3YTu45wKwu4ArsE27AjrWJHvUZ7IjrftYtW5x-F+wcTKBvGZV2XG4CMGgMFgFA4E4D9DDUc4TIAAWYFhOAwW1metaAAC4GHRxJCOOd56DgQsGGeM50H5wW4EwdQQqpg5JFpiC1BI+hKioU48F4CtQam+gwHucxlt5yW1HKXWzoN7oHmCtsxfOU26z4C2eKtnoygqY2O1NvgGaZlnGhgdmaCgbn6ExTBpH1IWZf1YL6iIam-TS5XVcwIXKE18bOMmy3Ddt-oiEaZx+wjqO9Jd5w3Ztj36HTtsBhL7Sy-OPSiYAMU1uBvxdSPUD91gA7Zh4Q+5o5fEMTANcUbOdFz1389rr9KmqAfmZIQPg65hhZCFicp-ob8M81y0JxVsCINUEB3WczBZ7sU6F+to3yjV2Qj9Xkz8MwPvN3VUazBqj8pQaAsVGK1AOJwMQ4Bjh3GfhYDic9H7OBACgLo7tX5fnrnwKBMC4E9F6MRWQUBzj-QJrwXBJx8E216JnRQe1jTillHVROmhdTnB9KuOheBDSUNgegmhXUmDvEjq3HBRBoFUIEY8TQ0gyIoDIb0JRQA) or [Usage](#-usage)
