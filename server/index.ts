import { App, HttpError, Context, Content } from "./deno_modules.ts";
import { UserArea } from "./area/UserArea.ts";
import { ProductArea } from "./area/ProductArea.ts";
import { environment } from "./environment.ts";

const app = new App({
  areas: [UserArea, ProductArea],
});

app.error((context: Context<any>, error: Error) => {
  const content = environment.prod
    ? "Unknow exception, please contact with administrator"
    : error.message;

  context.response.result = Content(
    content,
    (error as HttpError).httpCode || 500,
  );
  context.response.setImmediately();
});

app.listen(":3000");
