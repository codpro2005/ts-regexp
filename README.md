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
const groups2 = regex('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('9999-12-31')!.groups;
//      ⤴ '{ year: string, month: string, day: string }' 🥰
```
[👉 Try it in the TypeScript Playground](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzlApgcxQDzgXzgMyghDgHIYBnAWlQ0zFIG4AoZgejbgCEBDC4AMZwArhR4ZmAiADsK8GAE8wKACYARHjBQAFTVqjS4AXmTosAClIA9cwH4APApQ8oAPgA67lQgAsOAJRUdvYgMjAAFh5eCABMAUEOKjwKUd5x-gAkpAA0ZGik-ixSsvBYKAIASigUxnCKyuqaOnooBgB0ZQKWMQAMfVQAjD1UMT4FAIRtaETCYBQsHHBLcFa2kjJypmAANjwCKFU1JvWqGlq6MPrSbag7eygAktLdfcNDI2O55iCaAuG5ThcuVC0giuSSClyEHw+AoKBguTkUGA0jQuWmEFmFH8xlccAABhkEBisW0ITg2kSSXM2iCIhSqTMaYCoDh8f5xgtOMseby+fyBYKhcKRaLhatWIsAMJhLAwYQ8bZwHgAdxcKGk1Qo7G5cCqMB4KJqUigqAE8AgYBgwBkiuAijgACM+Ko4DI4BQpMp1iU4NSjqY6JYbA4AI4K0H2lKeFQAamCwmk9tcAG0eFQAF4AXVj-n8tiy-lpv3CTxePTAmAmUyZ82Y-raiftXN5EuA+Dg5gb4Z4kcUOIQzB5DabMEYcEWDw7Pb7CjgwBqaGAADcNbkeCIk-AQKJ4I6UHAwERl8AVK6+HAVShtts2kPloseRKcJLdQBBbYUCCX6AAaxqKr2uEyrbFcmg2tIPqbP6MS1LQFjWMEWiYDAqbptmuYAD7BDO1qKKk8YOKOaGZjmeaFsWMB-GWpC9BWVYcjWmJzCwMGNluOp8m2HZdrWMRtMh8BGMJm5nvgKKqAO95LGxo7jpOHYomAwjwAu0jkMqdRyrk9pwDumw-FRwG4VGl7hIIwEogI2zCGeNQbqOd48o+T5rC+nEAMo8Pg6AKlAKjai5ACino8GAKJoHAABkcBSuELh7PoUq7BQNTxdIKjbBFzDwZglieME0g8CAqhRP4BSUdRzykPYRUlSorjlYx-otmKbWihKuWWME4lQHIqT+J42EOHCxQNWmpFNZVpbVT4mE8NWLWce1K2ra5OVmHlpApj1wB9ahg3uFmwSjTIDX+Fm1aGVVliuIttatWtT0ChKy1wNoRDKLAc5YAuWjSPsnEAAKUFQWDKOaYOmtAABcZDXeEH7bE8pBwLGZC3Ls+xIyjcAqDIGm-Zs-AAwe0jfqQ+QELsaDMCmXWkGALQGBVCM49IuQM0zlytOpRaY-c7NZiwXPM+puSU6zJbsywwOg+D5QwFDRBQHDpAoiogjVKj+PVOppSYH9HpWWTFMqKj+A0xtQaM2LFWdJY1Ya1rdaizzLMS+bRYO6QTsZS7ssuQAYjTcDLnamuKHL1AK5DrQq3DtzOFoKjU+I1sIdzVw5HkwD5IU0dg-QivK7DZDCKjvap6Qy4WzTxq9uTe4HlIICOhJKgZ1tWe8znlPCLXBecW+KiRxBipwFl+gTyi+DQIZEFQQbxU7M07uGCYDMgAoFzZxLS5eywWAr9sa9XG0X7CFA+yPUKErH+Ap+77zbSW+IdYuXfazBYbcgavsboOxvzQNqB+q9n7tHihQJ4mt9h1jAU-MWF9rQCF-AoR6bRMFAA)
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
2. Import `regex`:
```ts
import { regex } from 'ts-regexp';
```
## 🧩 Usage

### Runtime wrapper

Import and use `regex` just like the native `RegExp` constructor:

```typescript
import { regex } from 'ts-regexp';

const datePattern = regex('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})');
const emailPattern = regex('^(?<local>[a-z0-9._%+-]+)@(?<domain>[a-z0-9.-]+\.[a-z]{2,})$', 'i');
```

The function signature is:
```typescript
regex(pattern: string, flags?: string)
```
> Note: `regex` returns a plain object, **not** a `RegExp` instance.

#### Standard RegExp Methods

All standard `RegExp` methods work exactly as expected, but with equivalent or improved typing:

```typescript
const pattern = regex('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})', 'gid');

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
const pattern = regex('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})');
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
const pattern = regex('\\d', 'g');

// Only available with 'g' flag
pattern.matchAllIn('1973-12-08');     // like string.matchAll(pattern)
pattern.replaceAllIn('123-456', '#'); // like string.replaceAll(pattern, replacement)
```

#### Fallback

If you need access to the underlying `RegExp` instance:

```typescript
const pattern = regex('\\d+');
const nativeRegExp = pattern.regExp; // Regular RegExp instance
```

## Type Utilities

`ts-regexp` exposes utility types for parsing regex patterns at the type level:

### `Parse<T extends string>`

Extracts both positional and named capture groups from a regex pattern.
```ts
type Result = Parse<'(?<a>0)|(?<b>1)'>;
/*
type Result = {
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

### `ParseCaptures<T extends string>`

Extracts only the positional capture groups as a tuple.
```ts
type Result = ParseCaptures<'(?<a>0)|(?<b>1)'>;
/*
type Result = [string, string, undefined] | [string, undefined, string]
*/
```

### `ParseSubcaptures<T extends string>`

Extracts only the positional capture groups as a tuple, excluding the full match at 0th index.
```ts
type Result = ParseSubcaptures<'(?<a>0)|(?<b>1)'>;
/*
type Result = [string, undefined] | [undefined, string]
*/
```

### `ParseNamedCaptures<T extends string>`

Extracts only the named capture groups as an object type.
```ts
type Result = ParseNamedCaptures<'(?<a>0)|(?<b>1)'>;
/*
type Result = {
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
