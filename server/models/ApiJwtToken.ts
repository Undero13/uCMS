import { Jose } from "../deno_modules.ts";

export type CustomPayload = {
  iss?: string;
  exp?: number;
  user?: string;
  permission: string[];
};

export type Jwt = {
  header: Jose;
  payload?: CustomPayload;
  signature: string;
};
