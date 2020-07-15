import { App, HttpError, Context, Content } from "./deno_modules.ts";
import { ProductArea } from "./area/ProductArea.ts";
import { environment } from "./environment.ts";
import { OperatorArea } from "./area/OperatorController.ts";

const app = new App({
  areas: [OperatorArea, ProductArea]
});

app.error((context: Context<any>, error: Error) => {
  const content = environment.prod ? "Unknow exception, please contact with administrator" : error.message;

  context.response.result = Content(content, (error as HttpError).httpCode || 500);
  context.response.setImmediately();
});

app.listen(":3000");
