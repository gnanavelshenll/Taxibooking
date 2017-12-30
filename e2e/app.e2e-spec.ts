import { TaxibookingPage } from './app.po';

describe('taxibooking App', () => {
  let page: TaxibookingPage;

  beforeEach(() => {
    page = new TaxibookingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
