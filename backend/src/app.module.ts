import { Module } from '@nestjs/common';
import { validateConfig } from "./config";
import { PostgresModule } from './repositories';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './usecases/account/account.module';
import { AuthModule } from './usecases/auth/auth.module';
import { ClientModule } from './usecases/client/client.module';

@Module({
imports:[ConfigModule.forRoot({
    validate: validateConfig,
    isGlobal: true
}), PostgresModule.forRoot(),
AccountModule,
AuthModule, ClientModule], 

controllers:[],
providers:[]
})
export class AppModule {}