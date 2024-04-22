import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleConfig()), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
