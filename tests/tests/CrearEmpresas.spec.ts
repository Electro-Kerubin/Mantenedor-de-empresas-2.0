import { expect, test } from "@playwright/test";
import { CrearEmpresa } from "../pages/CrearEmpresa";
import * as dotenv from 'dotenv';
import { dot } from "node:test/reporters";
import { Util } from "../pages/util";
import { APIs } from "../pages/APIs";

dotenv.config();

test.describe('Crear Empresas', () => {

  // test.use({
  //   storageState: undefined,
  // });

  let apis: APIs;

  test.beforeEach(async ({ page }) => {
    //await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
    const util = new Util(page);
    apis = new APIs(page);
    await page.setViewportSize({ width: 1680, height: 1050 });
    await apis.guardarUsuario({cargoId: '1'})
    await page.goto(`${process.env.BASE_URL}/auth`);
    // await util.segundoLogin();
    await expect(page).toHaveURL(/private\/mantenedor-empresa/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      await page.pause();
    }
  });

  test('Agregar empresa - Cliente', async ({ page }) => {
    const crearEmpresa = new CrearEmpresa(page);
    await page.goto(`${process.env.BASE_URL}/private/crear-empresa`);
    await expect(page).toHaveURL(/private\/crear-empresa/);
    await crearEmpresa.crearEmpresa({tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});
  });

  test('Agregar empresa - Cliente-proveedor', async ({ page }) => {
    const crearEmpresa = new CrearEmpresa(page);
    await page.goto(`${process.env.BASE_URL}/private/crear-empresa`);
    await expect(page).toHaveURL(/private\/crear-empresa/);
    await crearEmpresa.crearEmpresa({tipoEmpresa: 'CLIENTE-PROVEEDOR', tipoClasificacion: 'CLIENTE OTIC'});
  });

  test('Agregar empresa - Proveedor', async ({ page }) => {
    const crearEmpresa = new CrearEmpresa(page);
    await page.goto(`${process.env.BASE_URL}/private/crear-empresa`);
    await expect(page).toHaveURL(/private\/crear-empresa/);
    await crearEmpresa.crearEmpresa({tipoEmpresa: 'PROVEEDOR'});
  });
});
