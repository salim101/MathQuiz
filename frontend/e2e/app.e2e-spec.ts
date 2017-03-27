import { MathQuizPage } from './app.po';

describe('math-quiz App', function() {
  let page: MathQuizPage;

  beforeEach(() => {
    page = new MathQuizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
