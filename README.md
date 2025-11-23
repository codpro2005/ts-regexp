# ts-regexp
[![npm version](https://img.shields.io/npm/v/ts-regexp.svg)](https://www.npmjs.com/package/ts-regexp)
[![bundle size](https://img.shields.io/bundlejs/size/ts-regexp)](https://www.npmjs.com/package/ts-regexp)
[![npm monthly downloads](https://img.shields.io/npm/dm/ts-regexp.svg)](https://www.npmjs.com/package/ts-regexp)
[![typescript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![github stars](https://img.shields.io/github/stars/codpro2005/ts-regexp.svg?style=social)](https://github.com/codpro2005/ts-regexp)

A RegExp wrapper providing stronger type safety.

```ts
const groups1 = new RegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('9999-12-31')!.groups;
//      ⤴ '{ [key: string]: string; } | undefined' 🤮
const groups2 = typedRegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('9999-12-31')!.groups;
//      ⤴ '{ year: string, month: string, day: string }' 🥰
```
[👉 Try it in the TypeScript Playground](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzjAnmApgEwEroOYCiAHmHAL5wBmUEIcA5DAM4C0U+6J9A3AFC8B6AXABCAQybAAxnACuTMXnS8pEAHZN4qDJgAiYmOgAKBw1DVwAvMjRZchEgAp6APUcB+ADwp0YqAD4AHUDMBAAWMgBKFg9PEHUYAAsgkIQAJiiYr0wxFBTQjMiAEnoAGgY8eki+VQ14TnQpXCYrGx19QxMYMzUAOgapZzSABlGWAEZhljSwqoBCXrwaWTAmPiE4TbgXdxV1TTh2MAAbMSl0ZtbtLA7jU3RzXqPT84BJNSHRqcnp2fLHEAGKSJco+PzleJqJLlHIocoQSiUJjoGDlTRQYBqPDlJYQFZMSJWfxwAAGRQQuPxvVhZF65Mpq16kKStPpy0ZYKgZBJkTm62EW0FQuFItFYvFEslUolO34GwAwglODBZGJjnAxAB3PzoNToJhMQQCuC4GBiTEtVRQdhSeAQMAwYDqNXAVBwABGEiwcHUcCYqgwezqcAZLWs1xw+GIYGcbi8AEdVVDXXlgpgANSxWRqV3+ADaYhYAC8ALrpyKRdwlSJMoGJd6fYZgIjzRbsta8UO9bOu-lC2XAShwRxdxNiZOoQkIXiCrs9mDcOAbV5DscTlBwYAtPDAABuuvKYjkOfgIHk8Hd6DgYBou+AmG9EjgmvQx2OvRnWw2gtlZDlxoAQWOJgIGfaAAGsWk1V1Eg1Y4egMJ01CDA5QzSK5bEjBwY1cWJDCIGB80LUtywAH1iNdHVQfJMy8eciOLMsK2rWsYGBBt6BGJsW15Ns8VWPg0O7E8jWFAchxHds0l6fD4EseTjwfShMSwKdP02IT50XZch0xMBZHgLc1EYDVkGVcpXTgM8DkBNjYMolNn0SaRYMxKRjlkB8WiPecP0Fb8f12P9RIAZTESh8FVKBMENAKCH9MQwExPA4AAMjgeVEj8M4zHlU4DTgLK1EwY5kt4CN7GjZxgliNQxBALAUkiKpWPYj56E8OqGswfxmt40M+2lIbhq2WUKqjJx6FiZSoE0fJImCcivGRWoeoLRi+ta+t2rCUixFbAbRJG46TpFMbMMqya82m4BZsIhbAhLWIVvUHrIhLVtbLa5x-AO9tBtOwHJVlI64CMGgMFgDdOC3Qw1HOUSAAFmBYTgMFtVHrWgAAuBgvsSIDjneeg4HTBhnjOdBCeJuBMHUEyYYOSR4avNRQPoSoqFOPBeDzcbsOcMB7nMFr8eptRyn5qr6CF7oHmMmsKfOcWSz4KXJtlnoygqUW63FvgkZRtHGhgTGaCgXH6ExTBpH1Em6f1Yz6iIWG-Tc1n2cwEnKG58qLomnDNfllqBmcVtrdtjt1cD4XjPKegvZrUP6HD4rI4NgKADFubgXcXRt1BDdYY2MYec3caOXxDEwLnFD9nRLpjuWRfjndKmqIvUZIE2zZxhhZBJ8ca-oXdve5y1xzZi8r1UEB3RUzB67sAPBdj7WOdkUeO9EgDMALpC1TgUqzEPzFKGgWykJQ536pOO5m4scN-YF+gQBQLotdb+8qj4Thb+Oe+PReggVkFAc4ANxSyj-uAABH95a9B9ooDsAVIG7Dii7TQupzg+iHIgvAhpoF3zgY8LKTB3g23OB2QhsDY7AMdFIcCKAAa9BYUAA)
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

### Runtime wrapper

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

#### Standard RegExp Methods

All standard `RegExp` methods work exactly as expected, but with equivalent or improved typing:

```typescript
const pattern = typedRegExp('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})', 'gid');

// Standard methods
pattern.exec('1970-01-01')!.groups;  // { year: string; month: string; day: string; }
pattern.test('1970-01-01');  // boolean

// Access RegExp properties
pattern.source;  // "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})"
pattern.flags;   // "dgi"
pattern.global;  // true
pattern.sticky;  // false
//  ...
```

#### Regex-first Methods

Each `RegExp`-related `string.prototype` method is available as `${MethodName}In` with equivalent or improved typing:

```typescript
const pattern = typedRegExp('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})');
const string = '1976-11-21';

// Instead of: string.match(pattern)
const match = pattern.matchIn(string); // typed match

// Instead of: string.replace(pattern, replacement)
const formatted1 = pattern.replaceIn(string, '$<day>/$<month>/$<year>');
const formatted2 = pattern.replaceIn(string, (match, year, month, day, offset, string, groups) => `${groups.day}/${groups.month}/${groups.year}`); // typed arguments

// Other inversed methods
pattern.searchIn(string);    // like string.search(pattern)
pattern.splitIn(string);     // like string.split(pattern)
```

#### Global Flag Methods

When using the global (`g`) flag, additional methods become available:

```typescript
const pattern = typedRegExp('\\d', 'g');

// Only available with 'g' flag
pattern.matchAllIn('1973-12-08');     // like string.matchAll(pattern)
pattern.replaceAllIn('123-456', '#'); // like string.replaceAll(pattern, replacement)
```

#### Fallback

If you need access to the underlying `RegExp` instance:

```typescript
const pattern = typedRegExp('\\d+');
const nativeRegExp = pattern.regExp; // Regular RegExp instance
```

### Types

`ts-regexp` exposes some useful parsing types:

> Parse<T extends string>
```ts
type X = Parse<'(?<a>0)|(?<b>1)'>;
/*
type X = {
    captures: [string, string, undefined];
    namedCaptures: {
        a: string;
        b: undefined;
    };
} | {
    captures: [string, undefined, string];
    namedCaptures: {
        b: string;
        a: undefined;
    };
}
*/
```
> ParseCaptures<T extends string>
```ts
type X = ParseCaptures<'(?<a>0)|(?<b>1)'>;
/*
type X = [string, string, undefined] | [string, undefined, string]
*/
```
> ParseNamedCaptures<T extends string>
```ts
type X = ParseNamedCaptures<'(?<a>0)|(?<b>1)'>;
/*
type X = {
    a: string;
    b: undefined;
} | {
    b: string;
    a: undefined;
}
*/
```

## ✨ Features
- Strictly typed named & unnamed capture groups
- Supports contextual awareness
- Parses:
  - different group types (non-capturing, lookarounds, named captures, etc.)
  - nested groups
  - alternation
  - character classes and escaped characters
- Infers group optionality from quantifiers (`?`, `*`, `{n,m}`)
- Validates flags
- Supports dynamic (non-literal) pattern + flag inputs
## Alternatives
- **[arkregex](https://arktype.io/docs/blog/arkregex)** - A drop-in replacement for `new RegExp` that, in addition to this library, offers strict literal group typings, readable error messages with powerful validation and best practices suggestions. Maintained by [David Blass](https://github.com/ssalbdivad) (creator of ArkType) and actively updated.
- **[magic-regexp](https://regexp.dev)** - A compiled-away, type-safe alternative with a fluent, chainable API that makes regex patterns more readable and maintainable. Instead of cryptic regex syntax, you write `exactly('foo').or('bar')` which compiles to native RegExp at build time with no runtime cost. Part of the [unjs](https://github.com/unjs) ecosystem.
