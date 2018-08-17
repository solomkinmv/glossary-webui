export class RestUtils {

  public static mapToObj(map: Map<number, boolean>): object {
    let obj = Object.create(null);
    map.forEach((value: boolean, key: number) => {
      obj[key] = value;
    });
    return obj;
  }
}