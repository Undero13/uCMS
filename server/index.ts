import { Area, App } from 'https://deno.land/x/alosaur/src/mod.ts';
import { ApiController } from './controllers/ApiController.ts'

@Area({
    controllers: [ApiController],
})
export class ApiArea {}

const app = new App({
    areas: [ApiArea],
});

app.listen(":3000");