import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';
import { InitialSchema1708113642889 } from 'src/migrations/1708113642889-initial-schema';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [Recipe, Ingredient],
  migrations: [InitialSchema1708113642889],
});
