import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccountService } from 'src/usecases/account/account.service';
import { AccountUseCase } from 'src/models/account';
import { SignUpDto, UpdateAccountDto } from './dtos/account';
import { RolesGuard } from './guards/role.guard';
import { JwtAuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { UserId } from './decorators/token.decorator';
import { RoleEnum } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AccountController {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountUseCase,
  ) {}

  @Post('signup')
  signup(@Body() userData: SignUpDto) {
    return this.accountService.create(userData);
  }

  @Get('accounts')
  @Roles(RoleEnum.ADMIN)
  getAll() {
    return this.accountService.getAll();
  }

  @Get('accounts/:id')
  @Roles( RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.MODERATOR)
  getById(@Param('id') userId: string) {
    return this.accountService.getById(userId);
  }

  @Patch('accounts/approve/:id')
  @Roles(RoleEnum.ADMIN, RoleEnum.MODERATOR)
  approveUser(@Param('id') userId: string) {
    return this.accountService.approveUser(userId);
  }

  @Patch('accounts/disapprove/:id')
  @Roles( RoleEnum.ADMIN, RoleEnum.MODERATOR)
  disapproveUser(@Param('id') userId: string) {
    return this.accountService.disapproveUser(userId);
  }

  @Get('guests')
  @Roles( RoleEnum.ADMIN, RoleEnum.MODERATOR)
  getAllNotApproved() {
    return this.accountService.getAllNotAproved();
  }

  @Delete('accounts/:id')
  @Roles( RoleEnum.ADMIN, RoleEnum.USER)
  delete(@Param('id') userId: string) {
    return this.accountService.delete(userId);
  }

  @Patch('accounts/update')
  @Roles( RoleEnum.ADMIN,  RoleEnum.MODERATOR)
  update(@UserId() userId: string, @Body() userData: UpdateAccountDto) {
    const userDataWithId = {
      ...userData,
      id: userId,
    };
    return this.accountService.update(userDataWithId);
  }
}
