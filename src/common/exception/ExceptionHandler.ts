import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomException } from './custom.exception';
import { Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Catch(CustomException)
export class ExceptionHandler implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      message: this.i18nService.t(exception.message, {
        lang: I18nContext.current().lang,
      }),
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
