import { expect, test } from "@playwright/test";
import * as dotenv from 'dotenv';
import { Util } from "../pages/util";
import { generarRUT } from "../utils/GeneradorRuts";
import { APIs } from "../pages/APIs";
import { Comercial } from "../pages/ComercialPage";

dotenv.config();

test.describe('Comercial', () => {

    let rutEmpresa: string;
    let apis: APIs;
    let comercial: Comercial;

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
        await page.pause();
        }
    });

    test.describe('Rol: Sub Gerente', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '60' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });

        test('Sub Gerente | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });

    test.describe('Rol: Jefe de Oficina', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '59' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });

        test('Jefe de Oficina | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });

    test.describe('Rol: Asistente Comercial', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '58' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });
        
        test('Asistente Comercial | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });

    test.describe('Rol: Ejecutivo Consultor', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '57' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });
        
        test('Ejecutivo Consultor | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });

    test.describe('Rol: Agente Zonal Norte', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '56' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });
        
        test('Agente Zonal Norte | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({zonaAgente: "Norte"});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });

    test.describe('Rol: Agente Zonal Metro', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '55' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });
        
        test('Agente Zonal Metro | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });

    test.describe('Rol: Agente Zonal Sur', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '54' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
        });
        
        test('Agente Zonal Sur | Perfil no debe poder descargar el certificado de Datos bancarios', async ({ page }) => {
            const comercial = new Comercial(page);
            const {cliProvDisabled, provDisabled} = await comercial.verificarRestriccionDescargaCertificadoDatosBancarios({zonaAgente: "Sur"});
            
            expect.soft(cliProvDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
            expect.soft(provDisabled, 'El cliente-proveedor posee los botones de visualizar o descargar disponibles').not.toBeTruthy();
        });
    });
});