import {
	Body,
	Controller,
	Inject,
    Post,
} from "@nestjs/common";

import { AccountService } from "src/usecases/account/account.service";
import { AccountUseCase } from "src/models/account";
import { SignUpDto } from "./dtos/account";

@Controller()
export class AccountController {
	constructor(
		@Inject(AccountService)
		private readonly accountService: AccountUseCase,
	) {}

    @Post("/signup")
    signup(@Body() userData: SignUpDto){
        return this.accountService.create(userData)
    }

}