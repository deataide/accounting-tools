
import {
	Body,
	Controller,
	Inject,
    Post,
} from "@nestjs/common";

import { AuthService } from "src/usecases/auth/auth.service";
import { SignInDto } from "./dtos/auth";

@Controller()
export class AuthController {
	constructor(
		@Inject(AuthService)
		private readonly authService: AuthService,
	) {}

    @Post("/signin")
    signin(@Body() userData: SignInDto){

        return this.authService.login(userData)
    }
}