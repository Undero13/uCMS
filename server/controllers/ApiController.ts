import { Controller, Get, } from 'https://deno.land/x/alosaur/src/mod.ts';

@Controller('/api')
export class ApiController {
    @Get('/text')
    text() {
        return 'Hello world';
    }
    @Get('/json')
    json() {
        return { text: 'test' };
    }
}