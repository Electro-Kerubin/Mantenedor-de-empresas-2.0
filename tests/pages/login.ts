import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.goto('https://vision-qa.0s.cl/bienvenido');
    //Vision
    await this.page.getByRole('link', { name: 'Iniciar sesión como Usuario' }).click();
    await this.page.getByRole('button', { name: 'G+ de Google Ingresar con' }).click();

    //Google
    await this.page.getByRole('textbox', { name: 'Email or phone' }).fill(username);
    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.page.getByRole('textbox', { name: 'USUARIO' }).fill(username);
    await this.page.getByRole('textbox', { name: 'CONTRASEÑA' }).fill(password);
    await this.page.getByRole('button', { name: 'INICIAR SESIÓN' }).click();

    await expect(this.page.getByRole('paragraph').filter({ hasText: 'Bienvenido a Visión OTIC!' })).toHaveText('Bienvenido a Visión OTIC!');
  }
}