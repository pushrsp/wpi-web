import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { RequestUserDto } from "./dto/request.user.dto";
import { UsersService } from "./users.service";
import { UserDto } from "../shared/dto/user.dto";
import { Token } from "../shared/decorators/token.decorator";

/**
 * @wpiDefineKey meUser
 * @wpiDefineValue {string} username 유저네임
 */

/**
 * @wpiDefineKey loginUser
 * @wpiDefineValue {string} token jwt 토큰
 * @wpiDefineValue {string} username 유저네임
 */
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @wpiRoute /users [post]
   * @wpiDescription 회원가입
   * @wpiBody {string} username 아이디
   * @wpiBody {string} password 비밀번호
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {string} data 유저 UID
   * @wpiFail {string} message 에러 메세지
   * @wpiFail {string} error 에러 메세지
   * @wpiFail {int} statusCode 에러코드
   * @wpiFail {string} data 'null'
   */
  @Post()
  async createUser(@Body() data: RequestUserDto) {
    const user = (await this.usersService.createUser(data.username, data.password)) as UserDto;

    return user._id;
  }

  /**
   * @wpiRoute /users/me [get]
   * @wpiDescription 내 정보 불러오기
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {meUser} data 유저정보
   */
  @UseGuards(AuthMiddleware)
  @Get("/me")
  async getMe(@Token() user) {
    return { username: user.username };
  }

  /**
   * @wpiRoute /users/login [post]
   * @wpiDescription 로그인
   * @wpiBody {string} username 아이디
   * @wpiBody {string} password 비밀번호
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {loginUser} data 유저정보
   * @wpiFail {string} message 에러 메세지
   * @wpiFail {string} error 에러 메세지
   * @wpiFail {int} statusCode 에러코드
   * @wpiFail {string} data 'null'
   */
  @Post("login")
  async login(@Body() data: RequestUserDto) {
    return await this.usersService.loginUser(data.username, data.password);
  }
}
