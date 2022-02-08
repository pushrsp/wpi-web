import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "./users/users.module";
import { DocsModule } from "./docs/docs.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}`,
      {
        dbName: process.env.DB_DATABASE,
      },
    ),
    UsersModule,
    DocsModule,
  ],
})
export class AppModule {}
