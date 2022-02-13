import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

import { User, UserDocument } from "../schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string): Promise<User> {
    if (!username || !password) throw new BadRequestException("빈 칸이 있는지 확인해주세요");

    if (await this.userModel.exists({ username })) throw new ConflictException("이미 존재하는 유저입니다.");

    return await this.userModel.create({ username: username, password: await hash(password, 8), role: 3 });
  }

  async loginUser(username: string, password: string) {
    if (!username || !password) throw new BadRequestException("빈 칸이 있는지 확인해주세요");

    const user = await this.userModel.findOne({ username });
    if (!user) throw new BadRequestException("아이디 또는 비밀번호가 일치하지 않습니다.");

    const check = await compare(password, user.password);
    if (!check) throw new BadRequestException("아이디 또는 비밀번호가 일치하지 않습니다.");

    return {
      token: sign(
        {
          _id: user._id,
          username: user.username,
        },
        process.env.TOKEN,
        { expiresIn: "7d" },
      ),
      username: user.username,
    };
  }
}
