import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@prisma/client';
import { AccountService } from 'src/usecases/account/account.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly accountService: AccountService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<RoleEnum[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const route = request.route.path;

    if (route === '/signup') {
      return true;
    }

    if (!request.userId) {
      return false;
    }

    const user = await this.accountService.getById(request.userId);

    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
