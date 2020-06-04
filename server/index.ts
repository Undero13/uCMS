import { App } from "https://deno.land/x/alosaur@v0.17.0/mod.ts";
import { UserArea } from "./area/UserArea.ts";

const app = new App({
  areas: [UserArea],
});

app.listen(":3000");
