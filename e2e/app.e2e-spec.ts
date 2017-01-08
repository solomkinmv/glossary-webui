import { GlossaryWebuiPage } from './app.po';

describe('glossary-webui App', function() {
  let page: GlossaryWebuiPage;

  beforeEach(() => {
    page = new GlossaryWebuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
