import { expect, test } from "@playwright/test";
import { CrearEmpresa } from "../pages/CrearEmpresa";
import * as dotenv from 'dotenv';
import { dot } from "node:test/reporters";
import { Util } from "../pages/util";
import { EditarEmpresa } from "../pages/EditarEmpresa";
import { generarRUT } from "../utils/GeneradorRuts";
import { APIs } from "../pages/APIs";
import { Finanzas } from "../pages/Finanzas";
import { GestionNormativa } from "../pages/GestionNormativa";

dotenv.config();

test.describe('Gestion Normativa', () => {

    let rutEmpresa: string;
    let gestionNormativa: GestionNormativa;
    let apis: APIs;

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
        await page.pause();
        }
    });

    test.describe('Rol: Jefe de área', () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            gestionNormativa = new GestionNormativa(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '9' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
            });

        test('Jefe de área | Solo puede visualizar los Datos Bancarios en Información Financiera para Cliente OTIC-Proveedor y Proveedor', async ({page}) => {
            
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedor();
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedorReparto();
            await gestionNormativa.verificarVisualizacionDatosBancariosProveedor();
        });

        test('Jefe de área | Perfil solo debe poder ingrasar a mantenedor de empresas y mantenedor de holding', async ({page}) => {
            await gestionNormativa.verficiarAccesosUI();
            await gestionNormativa.verificarAccesosPorURL();
        });
        
    });

    test.describe('Rol: Coordinador', () => {

        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            apis = new APIs(page);
            gestionNormativa = new GestionNormativa(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '10' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            // await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
            });

        test('Coordinador | Solo puede visualizar los Datos Bancarios en Información Financiera para Cliente OTIC-Proveedor y Proveedor', async ({page}) => {
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedor();
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedorReparto();
            await gestionNormativa.verificarVisualizacionDatosBancariosProveedor();
        });

        test('Coordinador | Perfil solo debe poder ingrasar a mantenedor de empresas y mantenedor de holding', async ({page}) => {
            await gestionNormativa.verficiarAccesosUI();
            await gestionNormativa.verificarAccesosPorURL();
        });
    });

    test.describe('Rol: Funcionario', () => {

        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1680, height: 1050 });
            gestionNormativa = new GestionNormativa(page);
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '11' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            // await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
            });

        test('Funcionario | Solo puede visualizar los Datos Bancarios en Información Financiera para Cliente OTIC-Proveedor y Proveedor', async ({page}) => {
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedor();
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedorReparto();
            await gestionNormativa.verificarVisualizacionDatosBancariosProveedor();
        });

        test('Funcionario | Perfil solo debe poder ingrasar a mantenedor de empresas y mantenedor de holding', async ({page}) => {
            await gestionNormativa.verficiarAccesosUI();
            await gestionNormativa.verificarAccesosPorURL();
        });

    });

    test.describe('Rol: Sub Gerente', () => {

        test.beforeEach(async ({ page }) => {
            //await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
            await page.setViewportSize({ width: 1680, height: 1050 });
            gestionNormativa = new GestionNormativa(page);
            apis = new APIs(page);
            rutEmpresa = generarRUT();
            await apis.guardarUsuario({ cargoId: '53' });
            await page.goto(`${process.env.BASE_URL}/auth`);
            const util = new Util(page);
            // await util.segundoLogin();
            await expect(page).toHaveURL(/private\/mantenedor-empresa/);
            });

        test('Sub Gerente | Solo puede visualizar los Datos Bancarios en Información Financiera para Cliente OTIC-Proveedor y Proveedor', async ({page}) => {
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedor();
            await gestionNormativa.verificarVisualizacionDatosBancariosClienteProveedorReparto();
            await gestionNormativa.verificarVisualizacionDatosBancariosProveedor();
        });

        test('Sub Gerente | Perfil solo debe poder ingrasar a mantenedor de empresas y mantenedor de holding', async ({page}) => {
            await gestionNormativa.verficiarAccesosUI();
            await gestionNormativa.verificarAccesosPorURL();
        });

    });

});