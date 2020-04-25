import { NoticesModule } from './notices.module';

describe('NoticesModule', () => {
  let noticesModule: NoticesModule;

  beforeEach(() => {
    noticesModule = new NoticesModule();
  });

  it('should create an instance', () => {
    expect(noticesModule).toBeTruthy();
  });
});
