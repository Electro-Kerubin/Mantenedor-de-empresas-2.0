import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login';
import fs from 'fs';

test.describe.skip("Sidebar", () => {
    // let loginPage: LoginPage;
    let page: Page;

    // test.describe.configure({ mode: 'serial' });

    // test.beforeAll(async ({ browser }) => {
    //     page = await browser.newPage();

    //     loginPage = new LoginPage(page);
    //     await loginPage.login("testti@oticsofofa.cl", "sofofa1720");
    //     await page.goto("https://mantenedor-empresas.0s.cl/auth");
    //     await page.waitForLoadState("domcontentloaded");
    //     await page.waitForURL(/private\/home/);
    // });

    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();

        await page.goto("https://mantenedor-empresas.0s.cl/auth");
        await page.waitForLoadState("domcontentloaded");
        await page.waitForURL(/private\/home/);
    });
    
    test.afterAll(async () => {
        await page.close();
    });

    test("Boton Solicitudes", async ({ }) => {
        await page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect(page.getByRole('link', { name: 'Solicitudes' })).toBeEnabled();
        await page.getByRole('link', { name: 'Solicitudes' }).click();
        await expect(page).toHaveURL("https://mantenedor-empresas.0s.cl/private/solicitudes");
    });

    test("Boton Home", async ({ }) => {
        await page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect(page.getByRole('link', { name: ' Home' })).toBeEnabled();
        await page.getByRole('link', { name: 'Home' }).click();
        await expect(page).toHaveURL("https://mantenedor-empresas.0s.cl/private/home");
    });

    test("Boton Mantenedor de Empresas", async ({ }) => {
        await page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect(page.getByRole('link', { name: 'Mantenedor de Empresas' })).toBeEnabled();
        await page.getByRole('link', { name: 'Mantenedor de Empresas' }).click();
        await expect(page).toHaveURL("https://mantenedor-empresas.0s.cl/private/mantenedor-empresa");
    });

    test("Boton Mantenedor de Usuarios", async ({ }) => {
        await page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect(page.getByRole('link', { name: 'Mantenedor de Usuarios' })).toBeEnabled();
        await page.getByRole('link', { name: 'Mantenedor de Usuarios' }).click();
        await expect(page).toHaveURL("https://mantenedor-empresas.0s.cl/private/mantenedor-usuario");
    });
});