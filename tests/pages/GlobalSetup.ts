import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';


async function globalSetup() {

    dotenv.config();

    const cookiesPath = 'cookies.json';
    // if (fs.existsSync(cookiesPath)) {
    //     fs.unlinkSync(cookiesPath);
    //     console.log('Archivo cookies.json eliminado antes de la ejecución');
    // }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    let username = process.env.LOGIN_USER || "";
    let password = process.env.LOGIN_PASS || "";

    try {
        await page.goto(`${process.env.CONECTA_URL}/bienvenido`)
        // await page.goto('https://conecta-qa.0s.cl/bienvenido');
        
        //Vision
        await page.getByRole('link', { name: 'Iniciar sesión como Usuario' }).click();
        await page.getByRole('button', { name: 'G+ de Google Ingresar con' }).click();

        //Google
        await page.getByRole('textbox', { name: 'Email or phone' }).fill(username);
        await page.getByRole('button', { name: 'Next' }).click();

        // Login OTIC
        await page.getByRole('textbox', { name: 'USUARIO' }).fill(username);
        await page.getByRole('textbox', { name: 'CONTRASEÑA' }).fill(password);
        await page.getByRole('button', { name: 'INICIAR SESIÓN' }).click();

        await page.waitForURL('**/loginOtic', { timeout: 60000 });

        await context.storageState({ path: cookiesPath });

    } catch (error) {
        console.error('Error durante la configuración global:', error);
    } finally {
        await browser.close();
    }
}

export default globalSetup;