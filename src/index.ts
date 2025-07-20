// Utils
//  Compensation
type As<T, _Infer extends T> = unknown;
type Head<T extends unknown[]> = T[0];
type Tail<T extends unknown[]> = T extends [unknown, ...infer MyTail]
    ? MyTail
    : never
;
type AsLinked<
    T extends unknown[],
    InferFirst extends Head<T>,
    InferRest extends Tail<T>
> = InferRest extends unknown[]
    ? unknown
    : never
;
//  Math
type RangeInternal<T extends number, TArr extends number[]> = TArr['length'] extends T
    ? TArr
    : RangeInternal<T, [...TArr, TArr['length']]>
;
type Range<T extends number> = RangeInternal<T, []>;
type Increment<T extends number> = [...Range<T>, unknown]['length'] & number;
type Decrement<T extends number> = Range<T> extends [unknown, ...infer Rest]
    ? Rest['length']
    : never
;
type Add<T extends number, T2 extends number> = T2 extends 0
    ? T
    : Increment<Add<T, Decrement<T2>>>
;
//  Rest
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // Thanks Matt!
// To Tuple:
type ToTupleInternal<TRecord extends Record<number, unknown>, Index extends number> = keyof TRecord extends never
    ? []
    : [
        ...(Index extends keyof TRecord
            ? [TRecord[Index]]
            : []
        ),
        ...ToTupleInternal<Omit<TRecord, Index>, Increment<Index>>
    ]
;
type ToTuple<TRecord extends Record<number, unknown>> = ToTupleInternal<TRecord, 0>;

type IsSatisfied<T, TMember extends T> = TMember;
type Is<T extends boolean, TIf, TElse> = T extends true
    ? TIf
    : TElse
; // Works with T of `boolean`;
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
    : T extends `-${string}` | `${string}.${string}`
        ? never
        : T extends `${infer N extends number}`
            ? number extends N // whitespace check
                ? never
                : N
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
    Infer extends T extends `\\${string}${infer Skipped}`
        ? Skipped
        : never
> = Exists<Infer>;
type AsSkippedCharacterClass<
    T extends string,
    Infer extends unknown extends AsSkippedEscape<T, infer Skipped>
        ? Skipped
        : T extends `[${infer Rest}`
            ? ResolveCharacterClass<Rest>
            : never
> = Exists<Infer>;
type AsSkippedGroup<
    T extends string,
    Infer extends unknown extends AsSkippedCharacterClass<T, infer Skipped>
        ? Skipped
        : T extends `(${infer Rest}`
            ? ResolveGroup<Rest>
            : never
> = Exists<Infer>;

type ResolveCharacterClass<T extends string> = T extends `${infer First}${infer Rest}`
    ? unknown extends AsSkippedEscape<T, infer Skipped>
        ? ResolveCharacterClass<Skipped>
        : First extends ']'
            ? Rest
            : ResolveCharacterClass<Rest>
    : never
;
type ResolveGroup<T extends string> = T extends `${infer First}${infer Rest}`
    ? unknown extends AsSkippedGroup<T, infer Skipped>
        ? ResolveGroup<Skipped>
        : First extends ')'
            ? Rest
            : ResolveGroup<Rest>
    : never
;
type ResolveAlternation<T extends string> = T extends `${infer First}${infer Rest}`
    ? unknown extends AsSkippedGroup<T, infer Skipped>
        ? ResolveAlternation<Skipped>
        : First extends '|'
            ? Rest
            : ResolveAlternation<Rest>
    : never
;
type InferMin<S extends string> = S extends `${infer Min},${infer Max}`
    ? Max extends ''
        ? ToNattyNumber<Min>
        : ToNattyNumber<Max> extends never
            ? never
            : ToNattyNumber<Min>
    : ToNattyNumber<S>
//  Tree parser
type GroupPatterns<T extends string> = T extends `?<${infer Name}>${infer TheRest}`
    ? {
        value: {
            isCaptured: true,
            isNamed: true,
            name: Name
        },
        rest: TheRest
    }
    : T extends `?${':' | `${'<' | ''}${'=' | '!'}`}${infer TheRest}`
        ? {
            value: {
                isCaptured: false
            },
            rest: TheRest
        }
        : {
            value: {
                isCaptured: true,
                isNamed: false
            },
            rest: T
        }
;
type GroupsTree<T extends string> = T extends `${string}${infer Rest}`
    ? unknown extends AsSkippedCharacterClass<T, infer Skipped>
        ? GroupsTree<Skipped>
        : unknown extends As<ResolveGroup<Rest>, infer Tail>
            ? T extends `(${infer Content})${Tail}`
                ? [
                    GroupPatterns<Content>['value'] & {
                        isOptional: Tail extends `${'?' | '*'}${string}`
                            ? true
                            : Tail extends `{${infer ModRange}}${string}`
                                ? 0 extends InferMin<ModRange>
                                    ? true
                                    : false
                                : false,
                        inner: TokenTree<GroupPatterns<Content>['rest']>
                    },
                    ...GroupsTree<Tail>
                ]
                : GroupsTree<Rest>
            : never
    : []
;
type TokenTree<T extends string> = unknown extends As<ResolveAlternation<T>, infer Right>
    ? T extends `${infer Left}|${Right}`
        ? {
            type: 'alternation',
            left: TokenTree<Left>,
            right: TokenTree<Right>
        }
        : {
            type: 'groups',
            groups: GroupsTree<T>
        }
    : never
;
// Token type
type Token = IsSatisfied<{ type: string },
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
    } & IsSatisfied<{ isCaptured: boolean },
            { isCaptured: false } |
            ({ isCaptured: true, isNamed: boolean } & IsSatisfied<{ isNamed: boolean },
                { isNamed: false } |
                { isNamed: true, name: string }
            >)
        >
    )[]
}>;
type Groups = (Token & {type: 'groups'})['groups'];
// Indexification (DFS)
//  Utils (DFS math)
type FlattenGroupsDeep<TGroups extends Groups> = unknown extends AsLinked<TGroups, infer First, infer Rest>
// @ts-expect-error: TS cannot infer that 'Rest' extends 'Groups'
    ? [First, ...FlattenTokenDeep<First['inner']>, ...FlattenGroupsDeep<Rest>]
    : []
;
type FlattenTokenDeep<TToken extends Token> = TToken extends { type: 'alternation' } ? [
    ...FlattenTokenDeep<TToken['left']>,
    ...FlattenTokenDeep<TToken['right']>
] : TToken extends { type: 'groups' }
    ? FlattenGroupsDeep<TToken['groups']>
    : never
;
//  DFS
type IndexifyGroupsDeep<TGroups extends Groups, TIndex extends number> = unknown extends AsLinked<TGroups, infer First, infer Rest>
    ? [
        {
            index: TIndex,
            value: Omit<First, 'inner'> & { inner: IndexifyTokenDeepInternal<First['inner'], Increment<TIndex>> }
        },
        // @ts-expect-error: TS cannot infer that 'Rest' extends 'Groups'
        ...IndexifyGroupsDeep<Rest, Add<TIndex, FlattenGroupsDeep<[First]>['length'] & number>>
    ]
    : []
;
type IndexifyTokenDeepInternal<TToken extends Token, TIndex extends number> = TToken extends { type: 'alternation' } ? {
    type: 'alternation',
    left: IndexifyTokenDeepInternal<TToken['left'], TIndex>,
    // @ts-expect-error: 'FlattenTokenDeep<TToken['left']>['length']' should terminate
    right: IndexifyTokenDeepInternal<TToken['right'], Add<TIndex, FlattenTokenDeep<TToken['left']>['length'] & number>>
} : TToken extends { type: 'groups' } ? {
        type: 'groups',
        groups: IndexifyGroupsDeep<TToken['groups'], TIndex>
    } : never
;
type IndexifyTokenDeep<TToken extends Token> = IndexifyTokenDeepInternal<TToken, 0>;
//  TokenWithIndex type
type TokenWithIndex = IsSatisfied<{type: string}, 
{
    type: 'alternation',
    left: TokenWithIndex,
    right: TokenWithIndex
} |
{
    type: 'groups',
    groups: {
        index: number,
        value: {
            isOptional: boolean,
            inner: TokenWithIndex
        } & IsSatisfied<{ isCaptured: boolean },
            { isCaptured: false } |
            ({ isCaptured: true } & IsSatisfied<{ isNamed: boolean },
                { isNamed: false } |
                { isNamed: true, name: string }
            >)
        >
    }[]
}>;
type GroupWithIndexes = (TokenWithIndex & {type: 'groups'})['groups'];
type GroupWithIndex = GroupWithIndexes[number];
// Contextualization
type ContextualValue<T extends GroupWithIndex, TValue> = Record<T['index'], {
    value: TValue,
    reference: T['value']
}>;
type DeepUndefinedGroups<TGroups extends GroupWithIndexes> = unknown extends AsLinked<TGroups, infer First, infer Rest>
    // @ts-expect-error: TS cannot infer that 'Rest' extends 'GroupWithIndexes'
    ? ContextualValue<First, undefined> & DeepUndefinedToken<First['value']['inner']> & DeepUndefinedGroups<Rest>
    : {}
;
type DeepUndefinedToken<TToken extends TokenWithIndex> = TToken extends { type: 'alternation' }
    ? DeepUndefinedToken<TToken['left']> & DeepUndefinedToken<TToken['right']>
    : TToken extends { type: 'groups' }
        ? DeepUndefinedGroups<TToken['groups']>
        : never
;
type ContextualizeGroups<TGroups extends GroupWithIndexes> = unknown extends AsLinked<TGroups, infer First, infer Rest>
    ? (
        (First['value']['isOptional'] extends true
            ? DeepUndefinedGroups<[First]>
            : never
        ) | (ContextualValue<First, string> & ContextualizeToken<First['value']['inner']>)
    // @ts-expect-error: TS cannot infer that 'Rest' extends 'GroupWithIndexes'
    ) & ContextualizeGroups<Rest>
    : {}
;
type ContextualizeToken<TToken extends TokenWithIndex> = TToken extends { type: 'alternation' }
    ? (
        (ContextualizeToken<TToken['left']> & DeepUndefinedToken<TToken['right']>) |
        (ContextualizeToken<TToken['right']> & DeepUndefinedToken<TToken['left']>)
    )
    : TToken extends { type: 'groups' }
        ? ContextualizeGroups<TToken['groups']>
        : never
;
// Distribution
type Distribute<T extends Record<keyof T & GroupWithIndex['index'], { value: string | undefined, reference: GroupWithIndex['value'] }>> = T extends unknown
    ? unknown extends As<{
        [K in keyof T as T[K]['reference']['isCaptured'] extends false
            ? never
            : K
        ]: T[K]
    }, infer FilteredRecord>
        ? {
            captures: ToTuple<{ [K in keyof FilteredRecord]: FilteredRecord[K]['value'] }>,
            namedCaptures: {
                [K in keyof FilteredRecord as FilteredRecord[K]['reference'] extends { name: infer Name }
                    ? Name & string
                    : never
                ]: FilteredRecord[K]['value']
            }
        }
        : never
    : never
;

type Parse<T extends string> = string extends T
    ? {
        captures: [string, ...(string | undefined)[]],
        namedCaptures: Record<string, string | undefined>;
    }
    // @ts-expect-error: 'Distribute<ContextualizeToken<IndexifyTokenDeep<TokenTree<`(${T})`>>>>' should terminate
    : Distribute<ContextualizeToken<IndexifyTokenDeep<TokenTree<`(${T})`>>>>
;

type Remove<Ts extends unknown[], TMatch extends Ts[number]> = unknown extends AsLinked<Ts, infer First, infer Rest>
    ? TMatch extends First
        ? Rest
        : [First, ...Remove<Rest, TMatch>]
    : []
;
type Flags = ['d', 'g', 'i', 'm', 's', 'u' | 'v', 'y'];
type Flag = Flags[number];
type GetFlagsInternal<T extends string, TFlags extends Flag[]> = unknown extends AsLinked<TFlags, infer First, infer Rest>
    ? `${FirstMatch<First, T> extends never
        ? ''
        : FirstMatch<First, T>
    // @ts-expect-error: TS cannot infer that 'Rest' extends 'Flag[]'
    }${GetFlagsInternal<T, Rest>}`
    : ''
;
type GetFlags<T extends string> = string extends T
    ? string
    : GetFlagsInternal<T, Flags>
;
type AreFlagsValid<TSource extends string, TFlags extends Flag[]> = TSource extends `${infer First}${infer Rest}`
    ? First extends TFlags[number]
        // @ts-expect-error: TS cannot infer that 'Remove<TFlags, First>' extends 'Flag[]'
        ? AreFlagsValid<Rest, Remove<TFlags, First>>
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
const toPOJO = <T extends object>(instance: T) => Object.fromEntries(
    Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance)
    ).map(name => {
        const value = (instance as Record<keyof never, unknown>)[name];
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
export const typedRegExp = <
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
    type StrictRegExpExecArray<T extends string> = Override<
        Omit<RegExpExecArray, keyof unknown[] | 'indices'>,
        {
            groups: keyof NamedCaptures extends never
                ? undefined
                : NamedCaptures,
            input: T
        }
    > & Omit<Captures, number extends Captures['length']
        ? never
        : number
    > & (RegExpExecArray extends {indices: infer Indices} // Potentially breaks something niche?
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
            ) => source.matchAll(regExp) as any as RegExpStringIterator<StrictRegExpExecArray<T>>,
            replaceAllIn
        },
        {}
    );
    // for some reason GlobalMatches hits recursion limit faster?
    type GlobalMatches = [Head<Captures>, ...Head<Captures>[]]; // can't be empty arr. Either null or one+.
    const ret = {
        regExp,
        ...toPOJO(regExp as Override<typeof regExp, {
            dotAll: HasFlag<'s'>,
            exec: <T extends string>(string: T) => StrictRegExpExecArray<T> | null,
            flags: GetFlags<ResolvedFlags>,
            global: HasFlag<'g'>,
            hasIndices: HasFlag<'d'>,
            ignoreCase: HasFlag<'i'>,
            // lastIndex: number, // the only mutable prop. Can be set manually or under the hood through 'g' and 'y' flag.
            multiLine: HasFlag<'m'>,
            source: TPattern extends ''
                ? '(?:)'
                : TPattern
            ,
            sticky: HasFlag<'y'>,
            // test: () => ,
            unicode: HasFlag<'u'>,
            unicodeSets: HasFlag<'v'>,
            // compile: () => ,
        }>),
        matchIn: <T extends string>(
            source: T
        ) => source.match(regExp) as any as (Is<HasFlag<'g'>,
            GlobalMatches,
            StrictRegExpExecArray<T>
        >) | null,
        replaceIn,
        searchIn: (source: string, ...args: Tail<Parameters<string['search']>>) => source.search(regExp, ...args),
        splitIn: (source: string, ...args: Tail<Parameters<string['split']>>) => source.split(regExp, ...args),
        ...ternaryGlobalMethods(isGlobal)
    };
    // ternaryGlobalMethods + code below specifically to help TS for discriminated unions (global + hasIndices). Potentially remove as it's unscalable and weird.
    type StrictRegExpExecArrayForHasIndices<T extends boolean, TString extends string> = StrictRegExpExecArray<TString> & Is<T, {indices: NonNullable<RegExpExecArray['indices']>}, {}>;
    type GlobalBehavior<T extends boolean> = {
        global: T
    } & ReturnType<typeof ternaryGlobalMethods<T>>;
    type HasIndicesOnExistence<T extends boolean> = 'hasIndices' extends keyof RegExp
        ? {hasIndices: T}
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