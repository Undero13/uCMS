import { App } from "https://deno.land/x/alosaur@v0.12.2/src/mod.ts";
import { UserArea } from "./area/UserArea.ts";

const app = new App({
  areas: [UserArea],
});

app.listen(":3000");
