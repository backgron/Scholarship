import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export function isAuth(...userType: Array<string>) {
  return applyDecorators(
    SetMetadata('userType', userType),
    UseGuards(AuthGuardGuard),
  );
}

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request = context.switchToHttp().getRequest();
    let userType = this.reflector.get('userType', context.getHandler());
    return userType?.indexOf(request.session.userType) !== -1;
  }
}
