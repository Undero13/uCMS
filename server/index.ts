import { App, HttpError, Context, Content } from "./deno_modules.ts";
import { UserArea } from "./area/UserArea.ts";

const app = new App({
  areas: [UserArea],
});

app.error((context: Context<any>, error: Error) => {
  context.response.result = Content(
    "Unknow exception, please contact with administrator",
    (error as HttpError).httpCode || 500,
  );
  context.response.setImmediately();
});

app.listen(":3000");
