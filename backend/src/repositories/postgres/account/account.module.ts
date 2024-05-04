import { Module } from "@nestjs/common";

import { PostgresModule } from "../..";

import { AccountRepositoryService } from "./account.service";
import { JwtAdapterService } from "src/adapters/implementations/jwt/jwt.service";

@Module({
	imports: [PostgresModule.forFeature(["user"])],
	providers: [AccountRepositoryService, JwtAdapterService],
	exports: [AccountRepositoryService, JwtAdapterService],
})
export class AccountRepositoryModule {}