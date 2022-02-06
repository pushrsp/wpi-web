import { Body, Controller, Post } from "@nestjs/common";

import { RequestUserDto } from "./dto/request.user.dto";
import { UsersService } from "./users.service";
import { UserDto } from "../shared/dto/user.dto";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: RequestUserDto) {
    const user = (await this.usersService.createUser(data.username, data.password)) as UserDto;

    return user._id;
  }

  @Post("login")
  async login(@Body() data: RequestUserDto) {
    console.log(data.username, data.password);
    return "HI";
  }
}
