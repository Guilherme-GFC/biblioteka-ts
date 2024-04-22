import { join } from 'path';
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeOrmModuleConfig(): TypeOrmModuleOptions {
  const nodeEnv = process.env.NODE_ENV || 'test';
  const migrationsPath = join(__dirname, './migrations/**.{js, ts}');

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      autoLoadEntities: true,
    };
  }

  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    autoLoadEntities: true,
    migrations: [migrationsPath],
  };
}
