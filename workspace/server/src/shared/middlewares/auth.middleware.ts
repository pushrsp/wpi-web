import {
  CanActivate,
  ExecutionContext,
  GoneException,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User, UserDocument } from "../../schemas/user.schema";
import { UserDto } from "../dto/user.dto";

const TOKEN_REGEX = /Bearer\s(?<token>.+)/;

export class AuthMiddleware implements CanActivate {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    let token = request.headers.authorization;
    console.log(token);
    if (!token) return false;
    token = TOKEN_REGEX.exec(token).groups.token;
    request.user = await this.validateToken(token);
    return true;
  }

  private async validateToken(token: string) {
    try {
      let user = verify(token, process.env.TOKEN) as UserDto;
      user = await this.userModel.findOne({ _id: user._id });
      return user;
    } catch (e) {
      switch (e.name) {
        case "TokenExpiredError":
          throw new GoneException("토큰이 만료되었습니다.");
        case "JsonWebTokenError":
        case "SyntaxError":
          throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        default:
          throw new InternalServerErrorException("서버 오류입니다.");
      }
    }
  }
}
