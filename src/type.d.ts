export type configObject = {
  url: string | undefined
}

export type separateFunc = (s: string) => string[]

export interface Info {
  title: string;
  version: string;
}

export interface Schema {
  $ref: string;
}

export interface TextPlain {
  schema: Schema;
}

export interface Schema2 {
  $ref: string;
}

export interface ApplicationJson {
  schema: Schema2;
}

export interface Schema3 {
  $ref: string;
}

export interface TextJson {
  schema: Schema3;
}

export interface Content {
  "text/plain": TextPlain;
  "application/json": ApplicationJson;
  "text/json": TextJson;
}

export interface t {
  description: string;
  content: Content;
}

export interface Responses {
  [k in number]: t;
}

export interface Post {
  tags: string[];
  summary: string;
  responses: Responses;
}

export interface PostItem {
  [k in string]: Post;
}

export interface Paths {
  [k in string]: PostItem;
}

export interface StatusCode {
  type: string;
  format: string;
  nullable: boolean;
}

export interface Items {
  $ref: string;
}

export interface Data {
  type: string;
  items: Items;
  nullable: boolean;
}

export interface Succeeded {
  type: string;
}

export interface Errors {
  nullable: boolean;
}

export interface Extras {
  nullable: boolean;
}

export interface Timestamp {
  type: string;
  format: string;
}

export interface Properties {
  statusCode: StatusCode;
  data: Data;
  succeeded: Succeeded;
  errors: Errors;
  extras: Extras;
  timestamp: Timestamp;
}

export interface schemasItem {
  type: string;
  properties: Properties;
  additionalProperties: boolean;
}

export interface Id {
  type: string;
  format: string;
}

export interface OptionId {
  type: string;
  description: string;
  format: string;
}

export interface OptionChar {
  type: string;
  description: string;
  nullable: boolean;
}

export interface OptionName {
  type: string;
  description: string;
  nullable: boolean;
}

export interface OptionTags {
  type: string;
  description: string;
  nullable: boolean;
}

export interface OptionSort {
  type: string;
  description: string;
  format: string;
}

export interface OptionState {
  type: string;
  description: string;
  format: string;
}

export interface IsDelete {
  type: string;
  description: string;
  format: string;
}

export interface Other {
  type: string;
  nullable: boolean;
}

export interface Properties2 {
  id: Id;
  optionId: OptionId;
  optionChar: OptionChar;
  optionName: OptionName;
  optionTags: OptionTags;
  optionSort: OptionSort;
  optionState: OptionState;
  isDelete: IsDelete;
  other: Other;
}

export interface SelectOption {
  type: string;
  properties: Properties2;
  additionalProperties: boolean;
}

export interface Schemas {
  [k in string]: schemasItem;
  [k in string]: SelectOption;
}

export interface Bearer {
  type: string;
  description: string;
  scheme: string;
  bearerFormat: string;
}

export interface SecuritySchemes {
  Bearer: Bearer;
}

export interface Components {
  schemas: Schemas;
  securitySchemes: SecuritySchemes;
}

export interface Security {
  Bearer: any[];
}

export interface Tag {
  name: string;
  description: string;
}

export interface swagger {
  openapi: string;
  info: Info;
  paths: Paths;
  components: Components;
  security: Security[];
  tags: Tag[];
}
