import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";

import { UserDto } from "../dto/user.dto";

export class RoleMiddleware implements CanActivate {
  private readonly roles: number[];

  constructor(...roles: number[]) {
    this.roles = roles;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserDto;
    if (!this.roles.includes(user.role)) throw new ForbiddenException("접근할 수 없는 페이지 입니다.");

    return true;
  }
}
