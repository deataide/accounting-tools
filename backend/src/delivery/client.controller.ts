
import {
	Body,
	Controller,
	Inject,
    Post,
	UseGuards,
} from "@nestjs/common";

import { ClientService } from "src/usecases/client/client.service";
import { CreateClientDto } from "./dtos/client";
import { JwtAuthGuard } from "./guards/auth.guard";


@UseGuards(JwtAuthGuard)
@Controller("/client")
export class ClientController {
	constructor(
		@Inject(ClientService)
		private readonly clientService: ClientService,
	) {}

    @Post("create")
    create(@Body() userData: CreateClientDto){

        return this.clientService.create(userData)
    }
}