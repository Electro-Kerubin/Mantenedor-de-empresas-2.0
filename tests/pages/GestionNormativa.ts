import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import { CrearEmpresa } from './CrearEmpresa';
import { EditarEmpresa } from './EditarEmpresa';

dotenv.config();

export class GestionNormativa extends BasePage {

    crearEmpresa: CrearEmpresa;
    editarEmpresa: EditarEmpresa;
    
    constructor(page: Page) {
        super(page);
        this.crearEmpresa = new CrearEmpresa(page);
        this.editarEmpresa = new EditarEmpresa(page);
    }


    async verificarVisualizacionDatosBancariosClienteProveedor() {
        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-empresa`);
        const rutEmpresa = '7576606-8'
        
        await this.editarEmpresa.buscarEmpresa(rutEmpresa);
        await this.page.getByRole('tab', { name: 'Información Financiera' }).click();
        await expect.soft(this.page.getByRole('tabpanel').locator('select').nth(2)).toBeDisabled();
        await expect.soft(this.page.locator('#banco')).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'Nº Cuenta' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'Nombre' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: '-9' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'email@dominio.cl' })).toBeDisabled();
        await expect.soft(this.page.getByRole('button', { name: ' 1760312899372_PDF_TEST.pdf' })).toBeDisabled();
    }

    async verificarVisualizacionDatosBancariosClienteProveedorReparto() {
        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-empresa`);
        const rutEmpresa = '23606666-5';

        await this.editarEmpresa.buscarEmpresa(rutEmpresa);
        await this.page.getByRole('tab', { name: 'Información Financiera' }).click();
        await expect.soft(this.page.getByRole('tabpanel').locator('select').nth(2)).toBeDisabled();
        await expect.soft(this.page.locator('#banco')).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'Nº Cuenta' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'Nombre' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: '-9' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'email@dominio.cl' })).toBeDisabled();
        await expect.soft(this.page.getByRole('button', { name: ' 1760313873331_PDF_TEST.pdf' })).toBeDisabled();
    }

    async verificarVisualizacionDatosBancariosProveedor() {
        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-empresa`);
        const rutEmpresa = '20984464-8	';

        await this.editarEmpresa.buscarEmpresa(rutEmpresa);
        await this.page.getByRole('tab', { name: 'Información Financiera' }).click();
        await expect.soft(this.page.getByRole('tabpanel').locator('select').nth(2)).toBeDisabled();
        await expect.soft(this.page.locator('#banco')).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'Nº Cuenta' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'Nombre' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: '-9' })).toBeDisabled();
        await expect.soft(this.page.getByRole('textbox', { name: 'email@dominio.cl' })).toBeDisabled();
        await expect.soft(this.page.getByRole('button', { name: ' 1760374308031_PDF_TEST.pdf' })).toBeDisabled();
    }
}