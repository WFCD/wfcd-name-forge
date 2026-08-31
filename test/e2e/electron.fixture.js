import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test as base, _electron as electron } from '@playwright/test';

const require = createRequire(import.meta.url);
const electronPath = require('electron');
const appRoot = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));

const launchArgs = [
  appRoot,
  '--disable-gpu',
  '--disable-dev-shm-usage',
];

if (process.env.CI) {
  launchArgs.push('--no-sandbox');
}

const launchEnv = { ...process.env };
delete launchEnv.ELECTRON_RUN_AS_NODE;

export const test = base.extend({
  // Playwright requires object destructuring for the first fixture arg.
  // eslint-disable-next-line no-empty-pattern
  electronApp: async ({}, use) => {
    const electronApp = await electron.launch({
      executablePath: electronPath,
      args: launchArgs,
      cwd: appRoot,
      env: {
        ...launchEnv,
        ELECTRON_DISABLE_SECURITY_WARNINGS: 'true',
      },
      timeout: 30_000,
    });

    try {
      await use(electronApp);
    } finally {
      await electronApp.close();
    }
  },
  window: async ({ electronApp }, use) => {
    const page = await electronApp.firstWindow();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#generate-name-btn').waitFor({ state: 'visible' });
    await use(page);
  },
});

export { expect };
