import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/common/database/schema/base.schema';
import { defaultSchemaOptions } from 'src/common/utils/object.util';
import { EStatus } from 'src/constant/enum';

export type BlogDocument = HydratedDocument<Blog>;

@Schema(defaultSchemaOptions)
export class Blog extends Base {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  banner: string;

  @Prop()
  status: EStatus;

  @Prop()
  category: Types.ObjectId;

  @Prop()
  author: Types.ObjectId;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

export { BlogSchema };
