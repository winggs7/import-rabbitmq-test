import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schema/blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async import(data: { verifyData: CreateBlogDto[] }) {
    await this.blogModel.insertMany(data.verifyData);
  }
}
