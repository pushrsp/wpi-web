import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { RequestUserDto } from "./dto/request.user.dto";
import { UsersService } from "./users.service";
import { UserDto } from "../shared/dto/user.dto";
import { Token } from "../shared/decorators/token.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: RequestUserDto) {
    const user = (await this.usersService.createUser(data.username, data.password)) as UserDto;

    return user._id;
  }

  @UseGuards(AuthMiddleware)
  @Get("/me")
  async getMe(@Token() user) {
    return { username: user.username };
  }

  @Post("login")
  async login(@Body() data: RequestUserDto) {
    return await this.usersService.loginUser(data.username, data.password);
  }
}
