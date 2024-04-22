import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/repositories/postgres/account/account.module";
import { AccountService } from "./account.service";
import { AccountController } from "src/delivery/account.controller";

import { BcryptAdapterService } from "src/adapters/implementations/bcrypt/bcrypt.service";
import { BcryptAdapterModule } from "src/adapters/implementations/bcrypt/bcrypt.module";

@Module({
	controllers: [AccountController],
	imports: [AccountRepositoryModule, BcryptAdapterModule],
	providers: [AccountService, BcryptAdapterService],
	exports: [AccountService],
})
export class AccountModule {}
