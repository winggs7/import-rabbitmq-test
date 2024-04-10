import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('blogs')
export class BlogController {
  constructor(private readonly service: BlogService) {}

  @MessagePattern({ cmd: 'import-blog' })
  async importRmb(@Payload() data: any) {
    await this.service.import(data);
  }
}
