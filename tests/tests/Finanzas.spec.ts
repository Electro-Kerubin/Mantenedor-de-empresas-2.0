import { expect, test } from "@playwright/test";
import * as dotenv from 'dotenv';
import { Util } from "../pages/util";
import { generarRUT } from "../utils/GeneradorRuts";
import { APIs } from "../pages/APIs";
import { Finanzas } from "../pages/Finanzas";

dotenv.config();

test.describe('Finanzas', () => {

  let rutEmpresa: string;
  let finanzas: Finanzas;
  let apis: APIs;

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      await page.pause();
    }
  });

  test.describe('Rol: Gerente', () => {

    test.beforeEach(async ({ page }) => {
      //await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
      await page.setViewportSize({ width: 1680, height: 1050 });
      finanzas = new Finanzas(page);
      apis = new APIs(page);
      rutEmpresa = generarRUT();
      await apis.guardarUsuario({ cargoId: '2' });
      await page.goto(`${process.env.BASE_URL}/auth`);
      const util = new Util(page);
      await util.segundoLogin();
      await expect(page).toHaveURL(/private\/mantenedor-empresa/);
    });

    test('Gerente | El área de Finanzas tendrá acceso solo al Mantenedor de Empresas', async ({ page }) => {
      await finanzas.verificarAccesoFinanzasUI();
      await finanzas.verificarAccesoFinanzasMantUsuarioURL();
      await finanzas.verificarAccesoFinanzasMantHoldingURL();
    });

    test('Gerente | Al ingresar se visualizan correctamente los filtros y la grilla de empresas', async ({page}) => {
      await finanzas.verificarFiltros();
      await finanzas.verificarGrilla();
    });

    test('Gerente | Al ingresar con perfil de Finanzas , no te lleva directamente a la Información Financiera', async ({page}) => {
      await finanzas.verficarAlEditarEmpresaDebeIrDirectoAInformacionFinanciera();
    });

  });

  test.describe('Rol: Analista', () => {
    test.beforeEach(async ({ page }) => {
      //await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
      await page.setViewportSize({ width: 1680, height: 1050 });
      finanzas = new Finanzas(page);
      apis = new APIs(page);
      rutEmpresa = generarRUT();
      await apis.guardarUsuario({ cargoId: '3' });
      await page.goto(`${process.env.BASE_URL}/auth`);
      const util = new Util(page);
      // await util.segundoLogin();
      await expect(page).toHaveURL(/private\/mantenedor-empresa/);
    });

    test('Jefe de área | El área de Finanzas tendrá acceso solo al Mantenedor de Empresas', async ({ page }) => {
      await finanzas.verificarAccesoFinanzasUI();
      await finanzas.verificarAccesoFinanzasMantUsuarioURL();
      await finanzas.verificarAccesoFinanzasMantHoldingURL();
    });

    test('Jefe de área | Al ingresar se visualizan correctamente los filtros y la grilla de empresas', async ({page}) => {
      await finanzas.verificarFiltros();
      await finanzas.verificarGrilla();
    });

    test('Analista | Al ingresar con perfil de Finanzas , no te lleva directamente a la Información Financiera', async ({page}) => {
      await finanzas.verficarAlEditarEmpresaDebeIrDirectoAInformacionFinanciera();
    });

  });

  test.describe('Rol: Supervisor', () => {

    test.beforeEach(async ({ page }) => {
      //await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
      await page.setViewportSize({ width: 1680, height: 1050 });
      finanzas = new Finanzas(page);
      apis = new APIs(page);
      rutEmpresa = generarRUT();
      await apis.guardarUsuario({ cargoId: '4' });
      await page.goto(`${process.env.BASE_URL}/auth`);
      const util = new Util(page);
      // await util.segundoLogin();
      await expect(page).toHaveURL(/private\/mantenedor-empresa/);
    });

    test('Supervisor | El área de Finanzas tendrá acceso solo al Mantenedor de Empresas', async ({ page }) => {
      await finanzas.verificarAccesoFinanzasUI();
      await finanzas.verificarAccesoFinanzasMantUsuarioURL();
      await finanzas.verificarAccesoFinanzasMantHoldingURL();
    });

    test('Supervisor | Al ingresar se visualizan correctamente los filtros y la grilla de empresas', async ({page}) => {
      await finanzas.verificarFiltros();
      await finanzas.verificarGrilla();
    });

    test('Supervisor | Al ingresar con perfil de Finanzas , no te lleva directamente a la Información Financiera', async ({page}) => {
      await finanzas.verficarAlEditarEmpresaDebeIrDirectoAInformacionFinanciera();
    });

    test('(POR HACER) Supervisor | Perfil solo puede editar Datos Bancarios', async ({page}) => {
      
    });

  });


});