declare module "*.vue" {
  import { ComponentOptionsWithObjectProps } from "vue";

  const component: ComponentOptionsWithObjectProps;
  export default component;
}

declare module "querystring";
