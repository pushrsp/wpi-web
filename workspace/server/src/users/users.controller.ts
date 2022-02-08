import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { RoleMiddleware } from "../shared/middlewares/role.middleware";
import { Roles } from "../shared/enum/roles.enum";
import { RequestUserDto } from "./dto/request.user.dto";
import { UsersService } from "./users.service";
import { UserDto } from "../shared/dto/user.dto";
import { Token } from "../shared/decorators/token.decorator";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: RequestUserDto) {
    const user = (await this.usersService.createUser(data.username, data.password)) as UserDto;

    return user._id;
  }

  @UseGuards(AuthMiddleware)
  @Get("me")
  async getMe(@Token() user) {
    console.log("HIHIHIHI");
    return { username: user.username, role: user.role, isAccepted: user.isAccepted };
  }

  @Post("login")
  async login(@Body() data: RequestUserDto) {
    console.log("HIHIHIHI");
    return await this.usersService.loginUser(data.username, data.password);
  }

  @UseGuards(AuthMiddleware, new RoleMiddleware(Roles.ADMIN))
  @Get()
  async getAllUsersExceptAdmin() {
    return await this.usersService.findAllUsersExceptAdmin();
  }
}
