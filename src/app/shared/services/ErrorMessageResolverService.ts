import { HttpErrorResponse } from "@angular/common/http";
import { ApiResponse } from "../../auth/auth";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageResolverService {

  public getErrorMessage(error: HttpErrorResponse): string {
    const errorMessage = this.getErrorMessageOrUndefined(error);
    const finalErrorMessage = this.getFinalErrorMessage(errorMessage);
    return finalErrorMessage;
  }



  private getFinalErrorMessage(errorMessage: string | undefined): string {

    if (errorMessage == undefined || errorMessage.trim() === '') {
      return "no error message provided from the server";
    }
    return errorMessage;

  }
  private getErrorMessageOrUndefined(error: HttpErrorResponse): string | undefined {

     // API returned ApiResponse<T>
    const apiResponse = error.error as Partial<ApiResponse<unknown>>;

    if (apiResponse.success === false) {
      return apiResponse.message;
    }

    return this.getStandardAPIErorr(error);
   


  }



  private getStandardAPIErorr(error: HttpErrorResponse): string | undefined {

    switch (error.status) {
      case 0:
        return 'Unable to connect to the server.';

      case 401:
        return 'Unauthorized.';

      case 403:
        return 'Access denied.';

      case 404:
        return 'Resource not found.';

      case 500:
        return 'Internal server error.';

      default:
        return  undefined;
    }
  }

}