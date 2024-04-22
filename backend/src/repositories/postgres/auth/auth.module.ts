import { Module } from "@nestjs/common";

import { PostgresModule } from "../..";

import { AuthRepositoryService } from "./auth.service";

@Module({
	imports: [PostgresModule.forFeature(["user"])],
	providers: [AuthRepositoryService],
	exports: [AuthRepositoryService],
})
export class AccountRepositoryModule {}