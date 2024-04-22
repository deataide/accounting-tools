import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import jwt from 'jsonwebtoken'
import { JwtAdapterService } from "./jwt.service";

@Module({
	imports: [ConfigModule],
	providers: [
		JwtAdapterService,
		{
			provide: "jwt",
			useValue: jwt,
		},
	],
	exports: [JwtAdapterService, 'jwt'],
})
export class JwtAdapterModule {}