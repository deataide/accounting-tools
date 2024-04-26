import {
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClientService } from 'src/usecases/client/client.service';
import { CreateClientDto, UpdateClientDto } from './dtos/client';
import { JwtAuthGuard } from './guards/auth.guard';
import { UserId } from './decorators/token.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/create')
  create(@Body() userData: CreateClientDto, @UserId() userId: string) {
    const userDataWithId = {
      ...userData,
      userId,
    };
    return this.clientService.create(userDataWithId);
  }

  @Get()
  getAll(@UserId() userId: string) {
    return this.clientService.getAll({ userId });
  }
}
