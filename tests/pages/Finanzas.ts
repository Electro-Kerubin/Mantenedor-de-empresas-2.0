import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';

dotenv.config();

export class Finanzas extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verificarAccesoFinanzasUI() {
        await this.page.getByRole('button', { name: 'MENÚ ' }).click();
        await expect(this.page.getByRole('link', { name: ' Mantenedor de Usuarios' })).toHaveCount(0, {timeout:500});
        await expect(this.page.getByRole('link', { name: ' Mantenedor de Holdings' })).toHaveCount(0), {timeout:500};
    }

    async verificarAccesoFinanzasMantUsuarioURL() {
        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-usuario`, {waitUntil: 'networkidle'});
        await expect(this.page.getByRole('heading', { name: 'Mantenedor de Usuarios' })).toHaveCount(0, {timeout: 500});
    }

    async verificarAccesoFinanzasMantHoldingURL() {
        await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-holdings`, {waitUntil: 'networkidle'});
        await expect(this.page.getByRole('heading', { name: 'Mantenedor de Holdings' })).toHaveCount(0, {timeout: 500});
        // await page.goto('https://mantenedor-empresas.0s.cl/private/mantenedor-holdings');
        
    }

    async verificarFiltros() {
        await expect(this.page.getByRole('textbox', { name: 'Todos' })).toBeVisible({timeout:500}); //Nombre o Razon social
        await expect(this.page.getByRole('textbox', { name: 'Ingrese RUT' })).toBeVisible({timeout:500});
        await expect(this.page.getByLabel('Estado')).toBeVisible({timeout:500});
        await expect(this.page.getByLabel('Sociedad')).toBeVisible({timeout:500});
        await expect(this.page.getByLabel('Sociedad')).toHaveValue('5000')
        await expect(this.page.getByLabel('Banco')).toBeVisible({timeout:500});
        
        await expect(this.page.locator('div').filter({ hasText: /^Tipo EmpresaSeleccione Tipo EmpresaCLIENTECLIENTE-PROVEEDORPROVEEDOR$/ }).getByRole('combobox')).not.toBeVisible({timeout:500});
        await expect(this.page.getByRole('textbox', { name: 'Ingrese Nombre Holding' })).not.toBeVisible({timeout:500});
        await expect(this.page.locator('div').filter({ hasText: /^Cliente ComercialSeleccione Cliente Comercial$/ }).getByRole('combobox')).not.toBeVisible({timeout:500});
        await expect(this.page.getByRole('textbox', { name: 'Ingrese Nombre Ejecutivo' })).not.toBeVisible({timeout:500});
        await expect(this.page.getByLabel('Zona')).not.toBeVisible({timeout:500});
        await expect(this.page.getByLabel('Oficina')).not.toBeVisible({timeout:500});
    }

    async verificarGrilla() {
        await expect(this.page.getByRole('cell', { name: 'Nombre' })).toBeVisible({timeout:500});
        await expect(this.page.getByRole('cell', { name: 'Rut' })).toBeVisible({timeout:500});
        await expect(this.page.getByRole('cell', { name: 'Tipo Empresa' })).toBeVisible({timeout:500});
        await expect(this.page.getByRole('cell', { name: 'Estado' })).toBeVisible({timeout:1000});
        await expect(this.page.getByRole('cell', { name: 'Opciones' })).toBeVisible({timeout:1000});
    }

    async perfilSoloPuedeEditarDatosBancarios({tipoEmpresa} : {tipoEmpresa: string}) {
        
    }
}