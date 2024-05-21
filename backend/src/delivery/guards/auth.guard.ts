import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAdapterService } from 'src/adapters/implementations/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtAdapterService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const route = request.route.path;

    if (route === '/signup') {
      return true;
    }

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return false;
    }

    const decodedToken = this.jwt.validateAccess(token);
    if (!decodedToken || !decodedToken.sub) {
      return false;
    }

    request.userId = decodedToken.sub;


    return true;
  }
}
