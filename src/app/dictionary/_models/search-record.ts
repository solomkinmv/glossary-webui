export class SearchRecord {
  constructor(public text: string,
              public translations: Array<string>,
              public images: Array<string>,
              public sound: string) {
  }
}
