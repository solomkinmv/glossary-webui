import {Response} from "@angular/http";

export class RestUtils {

  public static getIdFromLocationHeader(response: Response): number {
    return +response.headers.get('Location').split('/').pop();
  }
}
