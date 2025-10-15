import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class Util {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async segundoLogin() {
        try {
            await this.page.waitForURL('https://conecta-qa.0s.cl/bienvenido', { timeout: 300 });
            const loginText = this.page.getByText('Bienvenido a OTIC SOFOFA');
            if (await loginText.isVisible({timeout: 30000})) {
                await this.page.getByRole('link', { name: 'Iniciar sesión como Usuario' }).click();
                await this.page.getByRole('button', { name: 'G+ de Google Ingresar con' }).click();
                this.page.waitForTimeout(2000);
                await this.page.goto('https://mantenedor-empresas.0s.cl/auth');
            }
        } catch (error) {
            // console.error('Error during segundoLogin:', error);
        }
    }
}