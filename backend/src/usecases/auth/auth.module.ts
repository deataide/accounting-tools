import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/repositories/postgres/account/account.module";


import { AuthController } from "src/delivery/auth.controller";
import { AuthService } from "./auth.service";
import { JwtAdapterService } from "src/adapters/implementations/jwt/jwt.service";
import { JwtAdapterModule } from "src/adapters/implementations/jwt/jwt.module";
import { BcryptAdapterModule } from "src/adapters/implementations/bcrypt/bcrypt.module";
import { BcryptAdapterService } from "src/adapters/implementations/bcrypt/bcrypt.service";


@Module({
	controllers: [AuthController],
	imports: [AccountRepositoryModule, JwtAdapterModule, BcryptAdapterModule],
	providers: [AuthService, JwtAdapterService, BcryptAdapterService,],
	exports: [AuthService, JwtAdapterService, BcryptAdapterService],
})
export class AuthModule {}
