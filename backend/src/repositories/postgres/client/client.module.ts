import { Module } from "@nestjs/common";

import { PostgresModule } from "../..";

import { ClientRepositoryService } from "./client.service";

@Module({
	imports: [PostgresModule.forFeature(["client"])],
	providers: [ClientRepositoryService],
	exports: [ClientRepositoryService],
})
export class ClientRepositoryModule {}