# ts-regex
[![npm version](https://img.shields.io/npm/v/ts-regex.svg)](https://www.npmjs.com/package/ts-regex)
> A minimal, statically typed alternative to JavaScript's RegExp.

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
2. Import it in your project
```ts
import { typedRegExp } from 'ts-regex';

const groups = typedRegExp('^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$', 'g').exec('2000-10-24')!.groups;
//   ?^ { year: string; month: string; day: string;}
```
[▶ Try it in the TypeScript Playground PLACEHOLDER](https://www.typescriptlang.org/play?#code/...)
## ✨ Features
- Statically typed (unnamed & named) capture groups
- Parses different group types (uncaptured, lookaround, unnamed capture, named capture)
- Parses nested groups
- Parses alternation
- Handles escape + character class parsing
- Parses optionality based on different quantifiers (`?`, `*`, `{n,m}`)
- Supporting Contextual awareness
- Supporting Flag validation
- Supporting non-literal string input (pattern + flags)
## 📘 API
This library exports a single function:

```ts
typedRegExp(pattern: string, flags?: string)
```
- `pattern`: A regular expression pattern as a string.
- `flags` _(optional)_: Standard `RegExp` flags such as `'g'`, `'i'`, `'m'`, etc.

Use it just like the native `RegExp` constructor:
```ts
import { typedRegExp } from 'ts-regex';

const datePattern = typedRegExp('(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})');
```
### 🔎 Return Value
The `typedRegExp` result is a `RegExp`-like object, with equivalent or stricter typing of the following:
- All standard `RegExp` instance properties and methods are copied directly to the result, preserving their native behavior.

  ```ts
  const result = typedRegExp('...').exec('abc');
  ```
  > Symbols are filtered out. While their typing is customizable, their main use case is to be a reference point for their respective `string.prototype` method, which has fixed typing that cannot be altered without overriding the prototype methods directly.
- `String.prototype` methods: All string methods that accept a RegExp as the first argument (e.g. `.replace`, `.match`, `.search`, `.split`) are re-exposed as inversed functions with equivalent or improved type safety. These act as a direct alternative to their `symbol` counterparts.

  ```ts
  const result = typedRegExp('\\d', 'g').replaceIn('My phone number is 123-456-7890', '#')
  ```
  > These methods are suffixed with 'In', e.g. `replaceIn`, `matchIn`, `searchIn`, `splitIn`.
- Fallback to native `RegExp`: In case a regular `RegExp` instance is necessarry for any reason, it can be referenced by the `regExp` property.

  ```ts
  const regExp = typedRegExp(source).regExp;
  //   ?^ RegExp
  ```
  > This is the same `RegExp` instance that is used under the hood to handle all `typedRegExp` runtime behaviours.










