import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['list'], ['html']],
  timeout: 120000,
  retries: 1,
  workers: 6,
  globalSetup: require.resolve('./setup/global.setup'),
  use: {
    baseURL: '#',
    trace: 'retain-on-failure',
    storageState: './session-data/standard-user-session.json',
    headless: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
};

export default config;
