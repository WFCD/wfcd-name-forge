import { expect, test } from './electron.fixture.js';

test.describe('Warframe Name Generator', () => {
  test('launches unpackaged with the main window', async ({ electronApp, window }) => {
    const isPackaged = await electronApp.evaluate(async ({ app }) => app.isPackaged);
    expect(isPackaged).toBe(false);
    expect(electronApp.windows()).toHaveLength(1);
    await expect(window).toHaveTitle('Warframe Name Generator');
    await expect(window.locator('#generate-name-btn')).toBeVisible();
    await expect(window.locator('#name-result')).toBeVisible();
  });

  test('generates a name from the UI defaults', async ({ window }) => {
    await window.locator('#generate-name-btn').click();
    await expect(window.locator('#name-result')).not.toHaveValue('');
  });

  test('generates a name over IPC with explicit options', async ({ window }) => {
    const name = await window.evaluate(async () => {
      const { ipcRenderer } = require('electron');
      return ipcRenderer.invoke('generate-name', {
        adjective: true,
        includeRace: true,
        race: 'tenno',
        type: 'names',
        nouns: 2,
      });
    });

    expect(name).toEqual(expect.any(String));
    expect(name.trim().length).toBeGreaterThan(0);
  });

  test('exposes window controls and project links', async ({ window }) => {
    await expect(window.locator('#min-button')).toBeVisible();
    await expect(window.locator('#close-button')).toBeVisible();
    await expect(window.locator('a[href="https://discord.gg/jGZxH9f"]')).toBeVisible();
    await expect(window.locator('a[href="https://github.com/wfcd/"]')).toBeVisible();
  });
});
