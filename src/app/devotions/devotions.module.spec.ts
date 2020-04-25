import { DevotionsModule } from './devotions.module';

describe('DevotionsModule', () => {
  let devotionsModule: DevotionsModule;

  beforeEach(() => {
    devotionsModule = new DevotionsModule();
  });

  it('should create an instance', () => {
    expect(devotionsModule).toBeTruthy();
  });
});
