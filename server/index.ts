import { App } from "./deno_modules.ts";
import { UserArea } from "./area/UserArea.ts";

const app = new App({
  areas: [UserArea],
});

app.listen(":3000");
