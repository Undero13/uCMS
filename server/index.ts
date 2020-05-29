import { App } from "https://deno.land/x/alosaur@v0.14.0/src/mod.ts";
import { UserArea } from "./area/UserArea.ts";

const app = new App({
  areas: [UserArea],
});

app.listen(":3000");
