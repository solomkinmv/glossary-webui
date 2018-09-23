export class TranslateResult {
  constructor(public sourceText: string,
              public result: string[],
              public sourceLanguage: string,
              public targetLanguage: string) {
  }
}
