import { RecipeV4Page } from './app.po';

describe('recipe-v4 App', () => {
  let page: RecipeV4Page;

  beforeEach(() => {
    page = new RecipeV4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
