import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,

} from "@nestjs/common";
import { BcryptAdapterService } from "src/adapters/implementations/bcrypt/bcrypt.service";

import { AccountUseCase, AdminUser, CreateAccount, CreateAccountOutput, FindAllOutput, UsersToAproveOutput } from "src/models/account";
import { AccountRepositoryService } from 'src/repositories/postgres/account/account.service';

@Injectable()
export class AccountService extends AccountUseCase {

	constructor(
		@Inject(AccountRepositoryService)
		private readonly accountRepository: AccountRepositoryService,
		@Inject(BcryptAdapterService)
		private readonly bcrypt: BcryptAdapterService,
	) {
		super()
	}

	async create(i: CreateAccount): Promise<CreateAccountOutput> {

		const hashedPassword = await this.bcrypt.encrypt({ password: i.password })

		const userAlreadyExists = await this.accountRepository.getByEmail({ email: i.email })

		if (userAlreadyExists) {
			throw new HttpException("O e-mail já está sendo utilizado", HttpStatus.BAD_REQUEST)
		}

		const userData = {
			name: i.name,
			email: i.email,
			password: hashedPassword,
			cnpj: i.cnpj || null,
			cpf: i.cpf || null,
			admin: false
		}

		const newUser = await this.accountRepository.createAccount(userData)

		return {
			id: newUser.id,
			name: newUser.id,
		}
	}


	//Just to Admin
	async findAllToAprove(i: AdminUser): Promise<UsersToAproveOutput[]> {

		const adminUser = await this.accountRepository.getById({ id: i.id })

		if (adminUser.approved == true) {
			const usersToAprove = await this.accountRepository.getToApprove()

			return usersToAprove

		} else {
			return null
		}

	}
	
	//Just to Admin
	async findAll(i: AdminUser): Promise<FindAllOutput[]> {
		const adminUser = await this.accountRepository.getById({ id: i.id })
		
		if (adminUser.approved == true) {
			const users = await this.accountRepository.getAll()
			return users
		}else{
			return null
		}
		
	}

}