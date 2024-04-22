import { Module } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import { ClientService } from "./client.service";
import { AccountRepositoryModule } from "src/repositories/postgres/account/account.module";
import { ClientController } from "src/delivery/client.controller";
import { ClientRepositoryModule } from "src/repositories/postgres/client/client.module";
import { BcryptAdapterModule } from "src/adapters/implementations/bcrypt/bcrypt.module";
import { BcryptAdapterService } from "src/adapters/implementations/bcrypt/bcrypt.service";
import { JwtAdapterService } from "src/adapters/implementations/jwt/jwt.service";
import { JwtAdapterModule } from "src/adapters/implementations/jwt/jwt.module";

@Module({
	controllers: [ClientController],
	imports: [AccountRepositoryModule, ClientRepositoryModule, BcryptAdapterModule, JwtAdapterModule],
	providers: [ClientService, AccountService, BcryptAdapterService, JwtAdapterService],
	exports: [ClientService, AccountService],
})
export class ClientModule {}
