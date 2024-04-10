import { Module } from '@nestjs/common';
import configs from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    BlogModule,
  ],
  controllers: [BlogController],
  providers: [],
})
export class AppModule {}
