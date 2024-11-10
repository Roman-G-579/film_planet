import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    const chunkFailedMsg = /Loading chunk [\d] + failed/;

    if (chunkFailedMsg.test(error.message)) {
      window.location.reload();
    }

    console.error("GLOBAL ERROR HANDLER: ", error);
  }
}
