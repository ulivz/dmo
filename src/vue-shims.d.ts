/// <reference path="../node_modules/@types/codemirror/codemirror-runmode.d.ts" />

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "nprogress" {
  export function start(): void;

  export function done(): void;
}

declare module "vue-inline" {
  export function makeComponent(options: any): any;
}

declare module "vue-codemirror-component" {
  export const themes: string[]
}
