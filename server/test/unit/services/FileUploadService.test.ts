import FileUploadService from "../../../services/FileUploadService.ts";
import { assertEquals, assertThrows } from "../../../deno_modules.ts";

const base64Image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg";

Deno.test("[service] fus.service.can.create", async () => {
  const base64Image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg";
  const fus = new FileUploadService(base64Image, "test.png");

  assertEquals(typeof fus, "object");
});

Deno.test("[service] fus.service.incorect.type", async () => {
  const base64Image =
    "data:image/txt;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg";
  let exception: any = "";

  try {
    const fus = new FileUploadService(base64Image, "test.png");
  } catch (e) {
    exception = e;
  }

  assertEquals(exception.message, "Incorrect file type!");
  assertEquals(exception.name, "TypeError");
});
