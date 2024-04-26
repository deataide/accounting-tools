import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@prisma/client';
import { AccountRepositoryService } from 'src/repositories/postgres/account/account.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
		private readonly accountService: AccountRepositoryService,
  )
   {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // Permite o acesso se não houver roles definidas no decorator
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const user = await this.accountService.getById(userId);

    if (!user || !user.role) {
      return false; // Negue o acesso se o usuário não estiver autenticado ou não tiver uma role definida
    }

    // Verifica se o usuário possui pelo menos uma das roles necessárias
    return requiredRoles.some(role => user.role === role);
  }
}
