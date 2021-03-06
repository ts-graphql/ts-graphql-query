import { branchField, branchFieldWithArgs, leafField, leafFieldWithArgs } from '../fields';
import { Maybe, TypeWrapper } from '../types';
import { operation } from '../operation';
import { GQLIDArg, GQLIntArg, GQLStringArg } from '../scalars';
import { InputType } from '../variables';
import { MaybeArg } from '../args';

export class Foo {
  maybeStr?: Maybe<string>
  bar!: Bar;
  maybeBar?: Maybe<Bar>;
  barArr!: Bar[];
  maybeBarArr?: Maybe<Bar[]>;
  maybeBarMaybeArr?: Maybe<Array<Maybe<Bar>>>;
}

export const maybeStr = leafField<Foo, 'maybeStr'>('maybeStr');
export const bar = branchField<Foo, 'bar', Bar>('bar');
export const maybeBar = branchField<Foo, 'maybeBar', Bar>('maybeBar');
export const barArr = branchField<Foo, 'barArr', Bar>('barArr');
export const maybeBarArr = branchField<Foo, 'maybeBarArr', Bar>('maybeBarArr');
export const maybeBarMaybeArr = branchField<Foo, 'maybeBarMaybeArr', Bar>('maybeBarMaybeArr');

export class Bar {
  str!: string;
  int!: number;
  float!: number;
  bool!: boolean;
}

export const str = leafField<Bar, 'str'>('str');
export const int = leafField<Bar, 'int'>('int');
export const float = leafField<Bar, 'float'>('float');
export const bool = leafFieldWithArgs<Bar, 'bool', { test?: MaybeArg<GQLStringArg> }>('bool');

// Union
type FooBar = Partial<Foo & Bar>;

// Interface
interface NodeFields {
  id: string;
}

export class NodeClass implements NodeFields {
  id!: string;
}

export const id = leafField<NodeClass, 'id'>('id');

export class User implements NodeFields {
  id!: string;
  name!: string;
}

export const name = leafField<User, 'name'>('name');

export class Event implements NodeFields {
  id!: string;
  date!: string;
}

export const date = leafField<Event, 'date'>('date');

export type Node = NodeClass & Partial<User & Event>;

export class Query {
  foo!: Foo;
  fooBar!: FooBar;
  maybeFooArr?: Maybe<Array<Foo>>;
  fooRequiredArg!: Foo;
  node?: Maybe<Node>;
}

export type FooArgFields = {
  str: GQLStringArg,
  num: GQLIntArg,
}

export class FooInputFields {
  str!: string
  num!: number
}

export class FooInput extends InputType<FooArgFields, FooInputFields> {
  argType!: FooArgFields
  value!: FooInputFields
}

export type FooInputArg = TypeWrapper<FooArgFields, FooInputFields>

export const foo = branchFieldWithArgs<Query, 'foo', Foo, { nested?: MaybeArg<FooInputArg>, num?: MaybeArg<GQLIntArg> }>('foo');
export const fooBar = branchField<Query, 'fooBar', FooBar>('fooBar');
export const maybeFooArr = branchFieldWithArgs<Query, 'foo', Foo, { nested?: MaybeArg<TypeWrapper<FooInputArg, FooInputFields>>, num?: MaybeArg<GQLIntArg> }>('foo');
export const fooRequiredArg = branchFieldWithArgs<Query, 'fooRequiredArg', Foo, { str: GQLStringArg }>('fooRequiredArg');
export const node = branchFieldWithArgs<Query, 'node', Node, { id: GQLIDArg }>('node');

export const query = operation<Query>('query', Query);
