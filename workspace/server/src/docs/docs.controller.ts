import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocsService } from "./docs.service";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { Token } from "../shared/decorators/token.decorator";
import { multerDiskOptions } from "./multer/multer.option";
import { RequestDocDto } from "./dto/request.doc.dto";

/**
 * @wpiDefineKey doc
 * @wpiDefineValue {string} _id UID
 * @wpiDefineValue {string} title 제목
 * @wpiDefineValue {string} version 버젼
 * @wpiDefineValue {string} fileName 파일 이르
 * @wpiDefineValue {date} createdAt 생성 날짜
 * @wpiDefineValue {date} updatedAt 수정 날짜
 */
@Controller("docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  /**
   * @wpiRoute /docs [get]
   * @wpiDescription 다큐먼트 가져오기
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {doc} data 다큐먼트 정보
   * @wpiFail {string} message 에러 메세지
   * @wpiFail {string} error 에러 메세지
   * @wpiFail {int} statusCode 에러코드
   * @wpiFail {string} data 'null'
   */
  @Get()
  @UseGuards(AuthMiddleware)
  async getDocs() {
    return await this.docsService.getDocs();
  }

  /**
   * @wpiRoute /docs/:_id [get]
   * @wpiDescription 특정 다큐먼트 가져오기
   * @wpiParam {string} _id 다큐먼크 UID
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {doc} data 다큐먼트 정보
   * @wpiFail {string} message 에러 메세지
   * @wpiFail {string} error 에러 메세지
   * @wpiFail {int} statusCode 에러코드
   * @wpiFail {string} data 'null'
   */
  @Get(":_id")
  @UseGuards(AuthMiddleware)
  async getTheDoc(@Param() params) {
    return await this.docsService.getTheDoc(params._id);
  }

  /**
   * @wpiRoute /docs [post]
   * @wpiDescription 다큐먼트 생성
   * @wpiParam {string} _id 다큐먼크 UID
   * @wpiBody {string} title 제목
   * @wpiBody {string} version 버젼
   * @wpiBody {formData} file 파일
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {string} data 다큐먼트 UID
   * @wpiFail {string} message 에러 메세지
   * @wpiFail {string} error 에러 메세지
   * @wpiFail {int} statusCode 에러코드
   * @wpiFail {string} data 'null'
   */
  @Post()
  @UseGuards(AuthMiddleware)
  @UseInterceptors(FileInterceptor("file", multerDiskOptions))
  async createDoc(@Token() user, @UploadedFile() file: Express.Multer.File, @Body() data: RequestDocDto) {
    return await this.docsService.createDoc(file.filename, data.title, data.version);
  }

  /**
   * @wpiRoute /docs/:_id [post]
   * @wpiDescription 특정 다큐먼트 수정
   * @wpiParam {string} _id 다큐먼크 UID
   * @wpiBody {string} title 제목
   * @wpiBody {string} version 버젼
   * @wpiBody {formData} file 파일
   * @wpiSuccess {string} message 'success'
   * @wpiSuccess {int} statusCode 성공 코드
   * @wpiSuccess {string} error 'null'
   * @wpiSuccess {string} data 'ok'
   * @wpiFail {string} message 에러 메세지
   * @wpiFail {string} error 에러 메세지
   * @wpiFail {int} statusCode 에러코드
   * @wpiFail {string} data 'null'
   */
  @Post(":_id")
  @UseGuards(AuthMiddleware)
  @UseInterceptors(FileInterceptor("file", multerDiskOptions))
  async updateTheDoc(@UploadedFile() file: Express.Multer.File, @Body() data: RequestDocDto, @Param() params) {
    return await this.docsService.updateTheDoc(params._id, data.title, data.version, file.filename);
  }
}
