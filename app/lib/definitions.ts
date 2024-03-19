import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UserTable;
  lists: ListTable;
  items: ItemTable;
  item_suggestions: ItemSuggestionTable;
  tag: TagTable;
  list_tag: ListTagTable;
}

export interface UserTable {
  id: ColumnType<number, null | undefined, never>;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface ListTable {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: "TODO" | "IN PROGRESS" | "DONE";
  is_public: boolean;
  updated_at: string;
}

export type List = Selectable<ListTable>;
export type NewList = Insertable<ListTable>;
export type ListUpdate = Updateable<ListTable>;

export interface ItemTable {
  id: number;
  list_id: number;
  created_by: number;
  description: string;
  item_order: number;
  is_done: boolean;
}

export type Item = Selectable<ItemTable>;
export type NewItem = Insertable<ItemTable>;
export type ItemUpdate = Updateable<ItemTable>;

export interface ItemSuggestionTable {
  item_id: number;
  list_id: number;
  suggested_by_id: number;
  accepted: boolean;
}

export type ItemSuggestion = Selectable<ItemSuggestionTable>;
export type NewItemSuggestion = Insertable<ItemSuggestionTable>;
export type ItemSuggestionUpdate = Updateable<ItemSuggestionTable>;

export interface TagTable {
  id: number;
  created_by_id: number;
  title: string;
}

export type Tag = Selectable<TagTable>;
export type NewTag = Insertable<TagTable>;
export type TagUpdate = Updateable<TagTable>;

export interface ListTagTable {
  list_id: number;
  tag_id: number;
}

export type ListTag = Selectable<ListTagTable>;
export type NewListTag = Insertable<ListTagTable>;
export type ListTagUpdate = Updateable<ListTagTable>;