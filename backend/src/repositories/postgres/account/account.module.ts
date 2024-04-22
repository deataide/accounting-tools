import { Module } from "@nestjs/common";

import { PostgresModule } from "../..";

import { AccountRepositoryService } from "./account.service";

@Module({
	imports: [PostgresModule.forFeature(["user"])],
	providers: [AccountRepositoryService],
	exports: [AccountRepositoryService],
})
export class AccountRepositoryModule {}