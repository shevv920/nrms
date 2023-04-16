import mongoose, { Schema, SchemaDefinition } from 'mongoose';
import { z, ZodObject, ZodOptional, ZodTypeAny, ZodUnion } from 'zod';

type MongooseProperty = {
  type: any;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
  enum?: any[];
  validate?: {
    validator: (value: any) => boolean;
    message: string;
  };
  [key: string]: any;
};

function zodToMongoose(zodSchema: ZodObject<any>): Schema {
  const mongooseSchema: SchemaDefinition = {};

  for (const key in zodSchema.shape) {
    if (Object.hasOwnProperty.call(zodSchema.shape, key)) {
      const property = zodSchema.shape[key];

      mongooseSchema[key] = zodPropertyToMongooseProperty(property);
    }
  }

  return new mongoose.Schema(mongooseSchema);
}

function zodPropertyToMongooseProperty(property: ZodTypeAny): MongooseProperty {
  let mongooseProperty: MongooseProperty = {
    type: Object,
  };

  if (property instanceof z.ZodString) {
    mongooseProperty.type = String;
    mongooseProperty.minlength = property.minLength ?? undefined;
    mongooseProperty.maxlength = property.maxLength ?? undefined;
    mongooseProperty.validate = {
      validator: (value: any) => property.safeParse(value).success,
      message: 'Invalid format',
    };
  } else if (property instanceof z.ZodNumber) {
    mongooseProperty.type = Number;
    mongooseProperty.min = property.minValue ?? undefined;
    mongooseProperty.max = property.maxValue ?? undefined;
  } else if (property instanceof z.ZodBoolean) {
    mongooseProperty.type = Boolean;
  } else if (property instanceof z.ZodDate) {
    mongooseProperty.type = Date;
  } else if (property instanceof z.ZodArray) {
    mongooseProperty.type = [zodPropertyToMongooseProperty(property._def.type)];
  } else if (property instanceof z.ZodRecord) {
    mongooseProperty.type = Map;
    mongooseProperty.of = zodPropertyToMongooseProperty(property._def.valueType);
  } else if (property instanceof z.ZodUnion) {
    mongooseProperty.type = zodUnionToMongooseType(property);
  } else if (property instanceof z.ZodObject) {
    mongooseProperty.type = zodToMongoose(property);
  }

  if (property.isNullable()) {
    mongooseProperty = {
      ...mongooseProperty,
      type: mongooseProperty.type || null,
    };
  }


  if (property.isOptional() && property instanceof ZodOptional) {
    mongooseProperty = {
      ...zodPropertyToMongooseProperty(property.unwrap()),
      required: false,
    };
  }

  if (property instanceof z.ZodEnum) {
    mongooseProperty = {
      ...mongooseProperty,
      enum: property.options,
    };
  }

  return mongooseProperty;
}

function zodUnionToMongooseType(union: ZodUnion<any>): any {
  const types = union.options.map((option: any) => zodPropertyToMongooseProperty(option));

  if (types.some((type: any) => type.type === Object)) {
    return Schema.Types.Mixed;
  }

  return types.map((type: any) => type.type);
}

export default Object.assign({}, {
  zodToMongoose,
});
