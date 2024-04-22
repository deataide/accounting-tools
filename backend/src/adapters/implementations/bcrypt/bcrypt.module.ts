import bcrypt from "bcrypt"
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BcryptAdapterService } from "./bcrypt.service";

@Module({
	imports: [ConfigModule],
	providers: [
		BcryptAdapterService,
		{
			provide: "bcrypt",
			useValue: bcrypt,
		},
	],
	exports: [BcryptAdapterService, 'bcrypt'],
})
export class BcryptAdapterModule {}
