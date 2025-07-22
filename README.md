# ts-regex
[![npm version](https://img.shields.io/npm/v/ts-regex.svg)](https://www.npmjs.com/package/ts-regex)
[![npm monthly downloads](https://img.shields.io/npm/dm/ts-regex.svg)](https://www.npmjs.com/package/ts-regex)

A minimal, statically typed alternative to JavaScript's RegExp.

```ts
const groups1 = new RegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('2000-10-24')!.groups;
//      ⤴ '{ [key: string]: string; } | undefined' 🤮
const groups2 = typedRegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('2000-10-24')!.groups;
//      ⤴ '{ year: string, month: string, day: string }' 🥰
```
[▶ Try it in the TypeScript Playground PLACEHOLDER](https://www.typescriptlang.org/play?#code/...)
## 🚀 Setup
1. Install `ts-regex`
```shell
# Using npm
npm install ts-regex

# Using yarn
yarn add ts-regex

# Using pnpm
pnpm add ts-regex
```
2. Then import `typedRegExp`:
```ts
import { typedRegExp } from 'ts-regex';
```
## 🧩 Usage

### Basic Usage

Import and use `typedRegExp` just like the native `RegExp` constructor:

```typescript
import { typedRegExp } from 'ts-regex';

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
const text = '2000-10-24';

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
digitPattern.matchAllIn('2000-10-24');     // like text.matchAll(pattern)
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

For now, refer to [Examples PLACEHOLDER](https://www.typescriptlang.org/play?#code/...) or [Usage](#-usage)
