import { DevPage } from './app.po';

describe('dev App', () => {
  let page: DevPage;

  beforeEach(() => {
    page = new DevPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
