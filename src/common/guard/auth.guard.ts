import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGNORE_ENDPOINT, JWT_CONTAIN } from '../constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!IGNORE_ENDPOINT.includes(request.originalUrl)) {
      const token = this.extractTokenFromHeader(request.headers.authorization);
      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }
      try {
        request['user'] = await this.jwtService.verifyAsync(token, {
          secret: JWT_CONTAIN.secret,
        });
      } catch {
        throw new UnauthorizedException('Unauthorized');
      }
    }
    return true;
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
