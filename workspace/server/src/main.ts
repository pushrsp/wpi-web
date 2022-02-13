import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

import { HttpExceptionFilter } from "./shared/filters/httpException.filter";
import { SuccessInterceptor } from "./shared/interceptors/success.interceptor";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3099;
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new SuccessInterceptor());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port);

  console.log(`Listening on port ${port}`);
}

bootstrap();
