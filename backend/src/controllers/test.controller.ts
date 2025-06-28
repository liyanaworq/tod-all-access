import { Controller, Get } from '@nestjs/common';

@Controller() // No prefix, so routes are at root level
export class TestController {
  @Get('test') // Handles GET /test
  test() {
    return 'Test route working! (NestJS)';
  }
}