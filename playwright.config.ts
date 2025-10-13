import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./tests/pages/GlobalSetup.ts'),
  testDir: './tests',

  fullyParallel: false,

  /* Previene que alguien suba un `test.only` al CI */
  forbidOnly: !!process.env.CI,

  /* Número de reintentos si una prueba falla */
  retries: process.env.CI ? 2 : 0, // ✅ En CI reintenta 2 veces, en local 0

  /* Configuración de workers (cantidad de procesos en paralelo) */
  workers: process.env.CI ? 1 : undefined, // ✅ En CI usa 1 worker, en local usa todos disponibles

  /* Define cuánto tiempo puede durar una prueba antes de fallar */
  timeout: 80000,
  /* Configuración de aserciones `expect()` */
  expect: {
    timeout: 80000, 
  },

  /* Configuración global para todas las pruebas */
  use: {
    headless: false,
    storageState: 'cookies.json', 
    trace: 'on-first-retry', 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', 
    navigationTimeout: 90000,
    viewport: null,
  },

  /* Configuración de los navegadores en los que correrán las pruebas */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Configuración opcional para correr un servidor antes de las pruebas */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
