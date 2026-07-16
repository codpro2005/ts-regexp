// Utils
//  Constraints
type As<T, _Infer extends T> = unknown;
type Head<T extends unknown[]> = T[0];
type Tail<T extends unknown[]> = T extends [infer _, ...infer Rest]
    ? Rest
    : never
;
type AsLinked<
    T extends unknown[],
    _InferFirst extends Head<T>,
    InferRest extends Tail<T>
> = InferRest extends unknown[]
    ? unknown
    : never
;
//  Rest
type Infer<T, _Infer extends T> = T;
type Prettify<T> = T extends (...args: never[]) => unknown
    ? (...args: Parameters<T>) => ReturnType<T>
    : {
        [K in keyof T]: T[K];
    } & unknown
; // Thanks Matt!

type SatisfiedBy<TConstraint, T extends TConstraint> = T;
type Is<T extends boolean, TIf, TElse> = T extends true
    ? TIf
    : TElse
; // Works with T of `boolean`
type CharOfInternal<T extends string> = T extends `${infer First}${infer Rest}`
    ? First | CharOfInternal<Rest>
    : never
;
type CharOf<T extends string> = string extends T
    ? string
    : CharOfInternal<T>
;
type FirstMatch<T extends string, TSource extends string> = TSource extends `${infer First}${infer Rest}`
    ? First extends T
        ? First
        : FirstMatch<T, Rest>
    : never
;
type ToNattyNumber<T extends string> = T extends `0${infer Rest extends `${number}`}`
    ? ToNattyNumber<Rest>
    : T extends `-${string}`
        ? never
        : T extends `${bigint}` & `${infer N extends number}`
            ? N
            : never
;
type Override<TOriginal, TNew> = Omit<
        TOriginal,
        keyof TNew
    > & Pick<
        TNew,
        Extract<keyof TOriginal, keyof TNew>
    >
;
type Fallback<T, TFall> = [T] extends [never]
    ? TFall
    : T
;

type Numeric<T extends string> = T extends `${infer N extends number}`
    ? N
    : never
;
type IndexOf<T> = Numeric<keyof T & `${number}`>;
type ValueOf<T> = T[keyof T];

// Implementation
// Tree
//  Utils
type Exists<T> = T extends never
    ? never
    : unknown
;
type AsSkippedEscape<
    T extends string,
    Infer extends T extends `\\${string}${infer Remainder}`
        ? Remainder
        : never
> = Exists<Infer>;
type AsSkippedCharacterClass<
    T extends string,
    Infer extends unknown extends AsSkippedEscape<T, infer Remainder>
        ? Remainder
        : T extends `[${infer Rest}`
            ? ResolveCharacterClass<Rest>
            : never
> = Exists<Infer>;
type AsSkippedGroup<
    T extends string,
    Infer extends unknown extends AsSkippedCharacterClass<T, infer Remainder>
        ? Remainder
        : T extends `(${infer Rest}`
            ? ResolveGroup<Rest>
            : never
> = Exists<Infer>;

type ResolveCharacterClass<T extends string> = T extends `${infer First}${infer Rest}`
    ? unknown extends AsSkippedEscape<T, infer Remainder>
        ? ResolveCharacterClass<Remainder>
        : First extends ']'
            ? Rest
            : ResolveCharacterClass<Rest>
    : never
;
type ResolveGroup<T extends string> = T extends `${infer First}${infer Rest}`
    ? unknown extends AsSkippedGroup<T, infer Remainder>
        ? ResolveGroup<Remainder>
        : First extends ')'
            ? Rest
            : ResolveGroup<Rest>
    : never
;
type ResolveAlternation<T extends string> = T extends `${infer First}${infer Rest}`
    ? unknown extends AsSkippedGroup<T, infer Remainder>
        ? ResolveAlternation<Remainder>
        : First extends '|'
            ? Rest
            : ResolveAlternation<Rest>
    : never
;
//  Tree parser
type ParseGroupBody<T extends string> = T extends `?<${infer Name}>${infer Pattern}`
    ? {
        meta: {
            isCaptured: true,
            isNamed: true,
            name: Name
        },
        pattern: Pattern
    }
    : T extends `?${':' | `${'<' | ''}${'=' | '!'}`}${infer Pattern}`
        ? {
            meta: {
                isCaptured: false
            },
            pattern: Pattern
        }
        : {
            meta: {
                isCaptured: true,
                isNamed: false
            },
            pattern: T
        }
;
type ParseIntervalQuantifierMin<T extends string> = T extends `${infer Min},${infer Max}`
    ? Max extends ''
        ? ToNattyNumber<Min>
        : ToNattyNumber<Max> extends never
            ? never
            : ToNattyNumber<Min>
    : ToNattyNumber<T>
;
type GroupsTree<T extends string> = T extends `${string}${infer Rest}`
    ? unknown extends AsSkippedCharacterClass<T, infer Remainder>
        ? GroupsTree<Remainder>
        : T extends `(${infer GroupBody})${Infer<ResolveGroup<Rest>, infer Tail>}`
            ? [
                unknown extends As<ParseGroupBody<GroupBody>, infer GroupInfo>
                    ? GroupInfo['meta'] & {
                        isOptional: Tail extends `${'?' | '*'}${string}`
                            ? true
                            : Tail extends `{${infer Bounds}}${string}`
                                ? 0 extends ParseIntervalQuantifierMin<Bounds>
                                    ? true
                                    : false
                                : false,
                        inner: TokenTree<GroupInfo['pattern']>
                    }
                    : never
                ,
                ...GroupsTree<Tail>
            ]
            : GroupsTree<Rest>
    : []
;
type TokenTree<T extends string> = T extends `${infer Left}|${Infer<ResolveAlternation<T>, infer Right>}`
    ? {
        type: 'alternation',
        left: TokenTree<Left>,
        right: TokenTree<Right>
    }
    : {
        type: 'groups',
        groups: GroupsTree<T>
    }
;
// Token type
type Token = SatisfiedBy<{ type: string },
{
    type: 'alternation',
    left: Token,
    right: Token
} |
{
    type: 'groups',
    groups: ({
        isOptional: boolean,
        inner: Token
    } & SatisfiedBy<{ isCaptured: boolean },
            { isCaptured: false } |
            ({ isCaptured: true } & SatisfiedBy<{ isNamed: boolean },
                { isNamed: false } |
                { isNamed: true, name: string }
            >)
        >
    )[]
}>;
type Groups = (Token & {type: 'groups'})['groups'];
// Contextualization
type ContextualValue = {
    reference: Groups[number],
    value: unknown
};
type SatisfiesContextualValue<T extends ContextualValue> = T;
type UnsetGroups<TGroups extends Groups> = unknown extends AsLinked<TGroups, infer First, infer Rest>
    ? [SatisfiesContextualValue<{ reference: First, value: never }>, ...UnsetToken<First['inner']>, ...UnsetGroups<Rest>]
    : []
;
type UnsetToken<TToken extends Token> = TToken extends { type: 'alternation' }
    ? [...UnsetToken<TToken['left']>, ...UnsetToken<TToken['right']>]
    : TToken extends { type: 'groups' }
        ? UnsetGroups<TToken['groups']>
        : never
;
type ContextualizeGroups<TGroups extends Groups> = unknown extends AsLinked<TGroups, infer First, infer Rest>
    ? [...(
        (First['isOptional'] extends true
            ? UnsetGroups<[First]>
            : never
        ) | [SatisfiesContextualValue<{ reference: First, value: string }>, ...ContextualizeToken<First['inner']>]
    ), ...ContextualizeGroups<Rest>]
    : []
;
type ContextualizeToken<TToken extends Token> = TToken extends { type: 'alternation' }
    ? (
        [...ContextualizeToken<TToken['left']>, ...UnsetToken<TToken['right']>] |
        [...UnsetToken<TToken['left']>, ...ContextualizeToken<TToken['right']>]
    )
    : TToken extends { type: 'groups' }
        ? ContextualizeGroups<TToken['groups']>
        : never
;
type ContextualValues = ContextualValue[];
type FilterCaptures<T extends ContextualValues> = unknown extends AsLinked<T, infer Head, infer Tail>
    ? [
        ...(Head['reference']['isCaptured'] extends false
            ? []
            : [Head]
        ),
        ...FilterCaptures<Tail>
    ]
    : []
;
type MapFallbackUndefined<T extends object> = {
    [K in keyof T]: Fallback<T[K], undefined>
};

/**
 * Parse the capture groups from a regex-like string literal type.
 * 
 * @example
 * ```ts
 * type Result = Parse<'(?<a>0)|(?<b>1)'>;
 * // type Result = {
 * //     captures: [string, string, undefined];
 * //     namedCaptures: {
 * //         a: string;
 * //         b: undefined;
 * //     };
 * // } | {
 * //     captures: [string, undefined, string];
 * //     namedCaptures: {
 * //         a: undefined;
 * //         b: string;
 * //     };
 * // }
 * ```
 */
export type Parse<T extends string> = string extends T
    ? {
        captures: [string, ...(string | undefined)[]],
        namedCaptures: Record<string, string | undefined>;
    }
    : unknown extends As<ContextualizeToken<{
        type: 'groups',
        groups: [{
            isCaptured: true,
            isNamed: false,
            isOptional: false,
            inner: TokenTree<T>
        }]
    }>, infer RawCaptures>
        ? RawCaptures extends unknown
            ? FilterCaptures<RawCaptures> extends infer Captures extends ContextualValues
                ? {
                    captures: MapFallbackUndefined<{[I in keyof Captures]: Captures[I]['value']}>,
                    namedCaptures: Prettify<MapFallbackUndefined<{
                        [I in IndexOf<Captures> as unknown extends As<Captures[I]['reference'], infer Capture>
                            ? Capture extends {
                                isCaptured: true,
                                isNamed: true
                            }
                                ? Capture['name']
                                : never
                            : never
                        ]: Captures[I]['value']
                    }>>
                }
                : never
            : never
        : never
;

/**
 * Get the list of indexed capture groups from a regex-like string literal type. This includes the full match at index 0.
 *
 * @example
 * ```ts
 * type Result = ParseCaptures<'(?<a>0)|(?<b>1)'>;
 * //   ^? type Result = [string, string, undefined] | [string, undefined, string]
 * ```
 */
export type ParseCaptures<T extends string> = Parse<T>['captures'];

/**
 * Get the list of indexed capture subgroups from a regex-like string literal type. This excludes the full match at index 0.
 * 
 * @example
 * ```ts
 * type Result = ParseSubcaptures<'(?<a>0)|(?<b>1)'>;
 * //   ^? type Result = [string, undefined] | [undefined, string]
 * ```
 */
export type ParseSubcaptures<T extends string> = Tail<Parse<T>['captures']>;

/**
 * Get the record of named capture groups from a regex-like string literal type.
 *
 * @example
 * ```ts
 * type Result = ParseNamedCaptures<'(?<a>0)|(?<b>1)'>;
 * //   ^? type Result = {
 * //     a: string;
 * //     b: undefined;
 * // } | {
 * //     a: undefined;
 * //     b: string;
 * // }
 * ```
 */
export type ParseNamedCaptures<T extends string> = Parse<T>['namedCaptures'];

type Remove<Ts extends unknown[], TMatch extends Ts[number]> = unknown extends AsLinked<Ts, infer First, infer Rest>
    ? TMatch extends First
        ? Rest
        : [First, ...Remove<Rest, TMatch>]
    : []
;
type Flags = ['d', 'g', 'i', 'm', 's', 'u' | 'v', 'y'];
type Flag = Flags[number];
type GetFlagsInternal<T extends string, TFlags extends Flag[]> = unknown extends AsLinked<TFlags, infer First, infer Rest>
    ? `${Fallback<FirstMatch<First, T>, ''>}${GetFlagsInternal<T, Rest>}`
    : ''
;
type GetFlags<T extends string> = string extends T
    ? string
    : GetFlagsInternal<T, Flags>
;
type AreFlagsValid<TSource extends string, TFlags extends Flag[]> = TSource extends `${infer First}${infer Rest}`
    ? First extends TFlags[number]
        ? AreFlagsValid<
            Rest,
            // @ts-expect-error: Excessive stack depth
            Remove<TFlags, First>
        >
        : false
    : true
;
type ValidatedFlags<T extends string> = AreFlagsValid<T, Flags> extends true
    ? T
    : never
;
const ternary = <TBoolean extends boolean>(condition: TBoolean) => <TIf, TElse>(a: TIf, b: TElse) => (condition
    ? a
    : b
) as TBoolean extends true
    ? TIf
    : TElse
;
const getPrototypeOf = <T extends object>(instance: T) => Object.getPrototypeOf(instance) as T;
const getOwnPropertyNames = <T extends object>(prototype: T) => Object.getOwnPropertyNames(prototype) as (keyof T & string)[];
const toPOJO = <T extends object>(instance: T) => Object.fromEntries(
    getOwnPropertyNames(getPrototypeOf(instance)).map(name => {
        const value = instance[name];
        return [
            name,
            typeof value === 'function'
                ? value.bind(instance)
                : value
        ];
    })
) as Omit<T, symbol>;
const strIncludes = <TResult extends string, TSearch extends string>(result: TResult, search: TSearch) => result.includes(search) as string extends TResult | TSearch
    ? boolean
    : TSearch extends CharOf<TResult>
        ? true
        : false
;
export const regex = <
    TPattern extends string,
    TFlags extends string = never
>(
    pattern: TPattern,
    flags?: ValidatedFlags<TFlags>
) => {
    const regExp = new RegExp(pattern, flags);
    const resolvedFlags = (flags ?? '') as [TFlags] extends [never]
        ? ''
        : TFlags
    ;
    type ResolvedFlags = typeof resolvedFlags;
    const isGlobal = strIncludes(resolvedFlags, 'g');
    type Parsed = Parse<TPattern>;
    type Captures = Parsed['captures'];
    type NamedCaptures = Parsed['namedCaptures'];

    type HasFlag<TFlag extends Flag> = string extends ResolvedFlags
        ? boolean
        : TFlag extends CharOf<ResolvedFlags>
            ? true
            : false
    ;
    // isn't inline (avoids distribution clutter) and must be mapped for distributive reasons or smth idk
    type OmitTupleNumberKey<TCaptures extends Captures> = {
        [K in keyof TCaptures as K extends number
            ? number extends TCaptures['length']
                ? K
                : never
            : K
        ]: TCaptures[K]
    };
    type StrictRegExpExecArray<T extends string> = Override<
        Omit<RegExpExecArray, keyof unknown[] | 'indices'>,
        {
            groups: keyof NamedCaptures extends never
                ? undefined
                : NamedCaptures,
            input: T
        }
    > & OmitTupleNumberKey<
        Captures
    > & (RegExpExecArray extends { indices: infer Indices }
        ? Is<HasFlag<'d'>,
            {indices: NonNullable<Indices>},
            {}
        >
        : {}
    );
    type TrailingReplaceArgs<T extends string> = [
        [replacer: (...p: [ // keep for type-hinting purposes
            match: Head<Captures>,
            ...p: Tail<Captures>,
            offset: number,
            string: T,
            ...keyof NamedCaptures extends never
                ? []
                : [groups: NamedCaptures]
        ]) => string],
        [replaceValue: string]
    ];
    type ReplaceArgs<T extends string, TOverloadIndex extends IndexOf<TrailingReplaceArgs<T>>> = [
        string: T,
        ...TrailingReplaceArgs<T>[TOverloadIndex]
    ];
    const replaceIn: {
        <T extends string>(...args: ReplaceArgs<T, 0>): string;
        <T extends string>(...args: ReplaceArgs<T, 1>): string;
    } = <T extends string>(...args: ReplaceArgs<T, IndexOf<TrailingReplaceArgs<T>>>) => {
        const [source, ...rest] = args;
        return source.replace(regExp, ...(rest as Tail<Parameters<typeof source.replace>>))
    };
    const replaceAllIn: {
        <T extends string>(...args: ReplaceArgs<T, 0>): string;
        <T extends string>(...args: ReplaceArgs<T, 1>): string;
    } = <T extends string>(...args: ReplaceArgs<T, IndexOf<TrailingReplaceArgs<T>>>) => {
        const [source, ...rest] = args;
        return source.replaceAll(regExp, ...(rest as Tail<Parameters<typeof source.replaceAll>>))
    };
    const ternaryGlobalMethods = <TBoolean extends boolean>(condition: TBoolean) => ternary(condition)(
        {
            matchAllIn: <T extends string>(
                source: T
            ) => source.matchAll(regExp) as unknown as RegExpStringIterator<StrictRegExpExecArray<T>>,
            replaceAllIn
        },
        {}
    );
    type GlobalMatches = [Head<Captures>, ...Head<Captures>[]];
    type RegExpSatisfies<T extends keyof T extends keyof typeof regExp
        ? unknown
        : never
    > = T;
    const ret = {
        regExp,
        ...toPOJO(regExp as Override<typeof regExp, RegExpSatisfies<{
            dotAll: HasFlag<'s'>,
            exec: <T extends string>(string: T) => StrictRegExpExecArray<T> | null,
            flags: GetFlags<ResolvedFlags>,
            global: HasFlag<'g'>,
            hasIndices: HasFlag<'d'>,
            ignoreCase: HasFlag<'i'>,
            multiline: HasFlag<'m'>,
            source: TPattern extends ''
                ? '(?:)'
                : TPattern
            ,
            sticky: HasFlag<'y'>,
            unicode: HasFlag<'u'>,
            unicodeSets: HasFlag<'v'>,
        }>>),
        matchIn: <T extends string>(
            source: T
        ) => source.match(regExp) as (Is<HasFlag<'g'>,
            GlobalMatches,
            StrictRegExpExecArray<T>
        >) | null,
        replaceIn,
        searchIn: (source: string, ...args: Tail<Parameters<string['search']>>) => source.search(regExp, ...args),
        splitIn: (source: string, ...args: Tail<Parameters<string['split']>>) => source.split(regExp, ...args),
        ...ternaryGlobalMethods(isGlobal)
    };
    // code below specifically to help TS for discriminated unions (global + hasIndices).
    type StrictRegExpExecArrayForHasIndices<T extends boolean, TString extends string> = StrictRegExpExecArray<TString> & Is<T, {indices: NonNullable<RegExpExecArray['indices']>}, {}>;
    type GlobalBehavior<T extends boolean> = {
        global: T
    } & ReturnType<typeof ternaryGlobalMethods<T>>;
    type HasIndicesOnExistence<T extends boolean> = 'hasIndices' extends keyof RegExp
        ? { hasIndices: T }
        : {}
    ;
    type GlobalTrueIndicesBehavior<T extends boolean> = HasIndicesOnExistence<T> & {
        matchAllIn: <TString extends string>(string: TString) => RegExpStringIterator<StrictRegExpExecArrayForHasIndices<T, TString>>
    };
    type GlobalFalseIndicesBehavior<T extends boolean> = HasIndicesOnExistence<T> & {
        matchIn: <TString extends string>(string: TString) => StrictRegExpExecArrayForHasIndices<T, TString> | null
    };
    type IndicesBehavior<T extends boolean> = HasIndicesOnExistence<T> & {
        exec: <TString extends string>(string: TString) => StrictRegExpExecArrayForHasIndices<T, TString> | null
    };
    return ret as Prettify<Omit<typeof ret, 'exec' | 'matchIn' | 'matchAllIn'> & (
        (
            Omit<GlobalBehavior<true>, 'matchAllIn'>
            & { matchIn: (string: string) => GlobalMatches | null }
            & (GlobalTrueIndicesBehavior<false> | GlobalTrueIndicesBehavior<true>)
        ) | (
            GlobalBehavior<false>
            & (GlobalFalseIndicesBehavior<false> | GlobalFalseIndicesBehavior<true>)
        )
    ) & (IndicesBehavior<false> | IndicesBehavior<true>)>;
};
/**
 * @deprecated renamed to `regex`. Will be removed on next release.
 */
export const typedRegExp = regex;
