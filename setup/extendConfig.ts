import { test as base } from '@playwright/test';

export type TestOptions = {
  environment: string;
};

export const test = base.extend<TestOptions>({
  // Define an option and provide a default value.
  environment: ['LOCAL', { option: true }]
});
