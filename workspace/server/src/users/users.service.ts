import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { hash } from "bcrypt";

import { User, UserDocument } from "../schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string): Promise<User> {
    if (!username || !password) throw new BadRequestException("빈 칸이 있는지 확인해주세요");

    if (await this.userModel.exists({ username })) throw new ConflictException("이미 존재하는 유저입니다.");

    return await this.userModel.create({ username: username, password: await hash(password, 8), role: 4 });
  }
}
