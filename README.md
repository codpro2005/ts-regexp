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
[▶ Try it in the TypeScript Playground](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzjAnmApgEwEroOYCiAHmHAL5wBmUEIcA5DAM4C0U+6R9A3AFC8B6AXABCAQybAAxnACuTMXnS8pEAHZN4qDJgAiYmOgAKBw1DVwAvMjRZchEgAp6APUcB+ADwp0YqAD4AHUDMBAAWMgBKFg9PEHUYAAsgkIQAJiiYr0wxFBTQjMiAEnoAGgY8eki+VQ14TnQpXCYrGx19QxMYMzUAOgapZzSABlGWAEZhljSwqoBCXrwaWTAmPiE4TbgXdxV1TTh2MAAbMSl0ZtbtLA7jU3RzXqPT84BJNSHRqcnp2fLHEAGKSJco+PzleJqJLlHIocoQSiUJjoGDlTRQYBqPDlJYQFZMSJWfxwAAGRQQuPxvVhZF65Mpq16kKStPpy0ZYKgZBJkTm62EW0FQuFItFYvFEslUolO34GwAwglODBZGJjnAxAB3PzoNToJhMQQCuC4GBiTEtVRQdhSeAQMAwYDqNXAVBwABGEiwcHUcCYqgwezqPodTrUaoAiqqoa6UABxdktazXHD4YhgZxuLwAR2jjtQQUwAGpYrI1K7-ABtMQsABeAF0i5FIu4SpEmUDEu9PsMwFxeYtE3x7Y7ncco2IY6gE3jGWXXfzpSLZcBKHBHCOw5G87GZ1Tc5P8yhCQheILN2OJ1P44nevOYNw4BtXmuD9e4MAWnhgAA3XXlMQ5HLeAQHkeB3XQOAwBoH9gEwb0JDgTV0GOY5ejPLYNiXIVZTIOVjQAQWOJgICQ6AAGsWk1V1Eg1Y4egMMMgwOTEwFkeBk1sVMHAzVxYkMIgYCrGsGybAAfWI3yPQsSy8e9hLrRtmzbDsYGBbt6BGXt+wWBk1l4Vj2LvYCjUFFc10cQyYF6ASOMsawy3gyhMSwE8MM2KzjIXJ9hBfD81DY+BPzURgNWQZVyldOBQIOQE1NoqTYyQxJpFozEpGOWR4JaQD73QwUsM2XD8LgABlMRKHwVUoEwQ1CoIf0xDATE8DgAAyOB5USPwzjMeVTgNOBurUTBjha3gU3sdNnGCWJwxALAUkiKpVPUj56E8ebFuWgc9MXbCDqXWVJrTJx6FiZyoE0QtImCCSvGRWpMAUhsdtWrt1rCMSxHmQdZ30wrDqB4Htl2E6eOcSsLuAK6hNuwJ61iR71GeyJ61+uK1ucfxfr20yQYJmVdnxuAjBoDBYBQOBOE-Qw1HOUyAAFmBYTgMFtVnrWgAAuBhMcSIjjneeg4CLBhnjOdBBeFuBMHUUKaYOSR6cgtRSPoSoqFOPBeErcHpvoMB7nMFb+eltRyn1s6je6B4QvbCXznN+s+Ct3ibZ6MoKlNztzb4JmWbZxoYE5mgoF5+hMUwaR9RFuX9RC+oiFpv10tV9XMBFyhtYmriput437f6IhGmcX6o5j-S3ecD27a9+hM-bAYy4HCvzn0kmADFtbgH8XWj1AA9YIOOYeMPeaOXxDEwLXFFznR8-dwv6+-SpqiH1mSGD0OeYYWQRcnGf6B-LPtctSc1fAyDVBAd0XMwee7FOpfbZN8oNdkE-19MgjMAHrd1RjTMGqfylBoBxSYrUA4nAxDgGOHcV+FhOIL2fs4EAKAuie3ft+RufAYFwIQT0XoJFZBQHOPtImvB8EnEIXbXo2dFAA2NOKWU9Vk6aF1OcH0a4GF4ENNQ+BmC6HdSYO8aO7c8FEFgTQoRjxNDSHIigChvQVFAA)
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

For now, refer to [Examples](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzjAnmApgEwEroOYCiAHmHAL5wBmUEIcA5DAM4C0U+6R9A3AFC8B6AXABCAQybAAxnACuTMXnS8pEAHZN4qDJgAiYmOgAKBw1DVwAvMjRZchEgAp6APUcB+ADwp0YqAD4AHUDMBAAWMgBKFg9PEHUYAAsgkIQAJiiYr0wxFBTQjMiAEnoAGgY8eki+VQ14TnQpXCYrGx19QxMYMzUAOgapZzSABlGWAEZhljSwqoBCXrwaWTAmPiE4TbgXdxV1TTh2MAAbMSl0ZtbtLA7jU3RzXqPT84BJNSHRqcnp2fLHEAGKSJco+PzleJqJLlHIocoQSiUJjoGDlTRQYBqPDlJYQFZMSJWfxwAAGRQQuPxvVhZF65Mpq16kKStPpy0ZYKgZBJkTm62EW0FQuFItFYvFEslUolO34GwAwglODBZGJjnAxAB3PzoNToJhMQQCuC4GBiTEtVRQdhSeAQMAwYDqNXAVBwABGEiwcHUcCYqgwezqPodTrUaoAiqqoa6UABxdktazXHD4YhgZxuLwAR2jjtQQUwAGpYrI1K7-ABtMQsABeAF0i5FIu4SpEmUDEu9PsMwFxeYtE3x7Y7ncco2IY6gE3jGWXXfzpSLZcBKHBHCOw5G87GZ1Tc5P8yhCQheILN2OJ1P44nevOYNw4BtXmuD9e4MAWnhgAA3XXlMQ5HLeAQHkeB3XQOAwBoH9gEwb0JDgTV0GOY5ejPLYNiXIVZTIOVjQAQWOJgICQ6AAGsWk1V1Eg1Y4egMMMgwOTEwFkeBk1sVMHAzVxYkMIgYCrGsGybAAfWI3yPQsSy8e9hLrRtmzbDsYGBbt6BGXt+wWBk1l4Vj2LvYCjUFFc10cQyYF6ASOMsawy3gyhMSwE8MM2KzjIXJ9hBfD81DY+BPzURgNWQZVyldOBQIOQE1NoqTYyQxJpFozEpGOWR4JaQD73QwUsM2XD8LgABlMRKHwVUoEwQ1CoIf0xDATE8DgAAyOB5USPwzjMeVTgNOBurUTBjha3gU3sdNnGCWJwxALAUkiKpVPUj56E8ebFuWgc9MXbCDqXWVJrTJx6FiZyoE0QtImCCSvGRWpMAUhsdtWrt1rCMSxHmQdZ30wrDqB4Htl2E6eOcSsLuAK6hNuwJ61iR71GeyJ61+uK1ucfxfr20yQYJmVdnxuAjBoDBYBQOBOE-Qw1HOUyAAFmBYTgMFtVnrWgAAuBhMcSIjjneeg4CLBhnjOdBBeFuBMHUUKaYOSR6cgtRSPoSoqFOPBeErcHpvoMB7nMFb+eltRyn1s6je6B4QvbCXznN+s+Ct3ibZ6MoKlNztzb4JmWbZxoYE5mgoF5+hMUwaR9RFuX9RC+oiFpv10tV9XMBFyhtYmriput437f6IhGmcX6o5j-S3ecD27a9+hM-bAYy4HCvzn0kmADFtbgH8XWj1AA9YIOOYeMPeaOXxDEwLXFFznR8-dwv6+-SpqiH1mSGD0OeYYWQRcnGf6B-LPtctSc1fAyDVBAd0XMwee7FOpfbZN8oNdkE-19MgjMAHrd1RjTMGqfylBoBxSYrUA4nAxDgGOHcV+FhOIL2fs4EAKAuie3ft+RufAYFwIQT0XoJFZBQHOPtImvB8EnEIXbXo2dFAA2NOKWU9Vk6aF1OcH0a4GF4ENNQ+BmC6HdSYO8aO7c8FEFgTQoRjxNDSHIigChvQVFAA) or [Usage](#-usage)
