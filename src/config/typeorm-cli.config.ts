import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';
import { User } from 'src/auth/entity/user';
import { addUser1666430321163 } from 'src/migrations/1666430321163-add-user';
import { InitialSchema1708117401312 } from 'src/migrations/1708117401312-initial-schema';

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
  entities: [Recipe, Ingredient, User],
  migrations: [InitialSchema1708117401312, addUser1666430321163],
});
