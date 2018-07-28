import { DictionaryModule } from './dictionary.module';

describe('DictionaryModule', () => {
  let dictionaryModule: DictionaryModule;

  beforeEach(() => {
    dictionaryModule = new DictionaryModule();
  });

  it('should create an instance', () => {
    expect(dictionaryModule).toBeTruthy();
  });
});
