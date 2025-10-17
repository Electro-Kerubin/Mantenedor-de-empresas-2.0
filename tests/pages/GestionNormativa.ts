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

    async verficiarAccesosUI() {
        await this.page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect.soft(this.page.getByRole('link', { name: ' Mantenedor de Empresas' }), {message: 'Opción de Mantenedor de empresas no es visible'}).toBeVisible();
        await this.page.getByRole('link', { name: ' Mantenedor de Empresas' }).click();
        await expect.soft(this.page, {message: 'No se encuentra en la url de Mantenedor de empresas'}).toHaveURL(`${process.env.BASE_URL}/private/mantenedor-empresa`, {timeout: 1500});

        await this.page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect.soft(this.page.getByRole('link', { name: ' Mantenedor de Usuarios' }), {message: 'Opción de Mantenedor de Usuarios es visible'}).not.toBeVisible({timeout: 1000});

        await this.page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect.soft(this.page.getByRole('link', { name: ' Mantenedor de Holdings' }), {message: 'Opción de Mantenedor de Holdings no es visible'}).toBeVisible();
        await this.page.getByRole('link', { name: ' Mantenedor de Holdings' }).click();
        await expect.soft(this.page, {message: 'No se encuentra en la URL de mantenedor de holdings'}).toHaveURL(`${process.env.BASE_URL}/private/mantenedor-holdings`, {timeout: 1500});
    }

    async verificarAccesosPorURL() {
        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-empresa`);
        await expect.soft(this.page, {message: 'No se puede ingresar a Mantenedor de empresas mediante URL'}).toHaveURL(`${process.env.BASE_URL}/private/mantenedor-empresa`);

        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-usuario`);
        await expect.soft(this.page, {message: 'No se puede ingresar a Mantenedor de Usuarios mediante URL'}).toHaveURL(`${process.env.BASE_URL}/private/mantenedor-usuario`);

        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-holdings`);
        await expect.soft(this.page, {message: 'No se puede ingresar a Mantenedor de Holdings mediante URL'}).toHaveURL(`${process.env.BASE_URL}/private/mantenedor-holdings`);
    }
}