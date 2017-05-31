import { BenjandersonPage } from './app.po';

describe('benjanderson App', () => {
  let page: BenjandersonPage;

  beforeEach(() => {
    page = new BenjandersonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
