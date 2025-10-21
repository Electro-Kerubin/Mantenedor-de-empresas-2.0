import { expect, test } from "@playwright/test";
import * as dotenv from 'dotenv';
import { Util } from "../pages/util";
import { generarRUT } from "../utils/GeneradorRuts";
import { APIs } from "../pages/APIs";

dotenv.config();




test.describe('Comercial', () => {

    let rutEmpresa: string;
    let apis: APIs;

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
    });
});