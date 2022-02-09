import { diskStorage } from "multer";
import { BadRequestException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";

export const multerDiskOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(json)$/)) {
      callback(null, true);
    } else {
      callback(new BadRequestException("지원하지 않은 파일형식 입니다."), false);
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = "uploads";
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 1, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};
