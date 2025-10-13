import { expect, test } from "@playwright/test";
import { CrearEmpresa } from "../pages/CrearEmpresa";
import { EditarEmpresa } from "../pages/EditarEmpresa";
import { generarRUT } from "../utils/GeneradorRuts";
import { Util } from "../pages/util";
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Editar Empresas', () => {

  

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
    // await page.setViewportSize({ width: 1680, height: 1050 });
    await page.goto(`${process.env.BASE_URL}/auth`);
    const util = new Util(page);
    await util.segundoLogin();
    await expect(page).toHaveURL(/private\/mantenedor-empresa/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      await page.pause();
    }
  });

  test('Editar empresa - Cliente', async ({ page }) => {
    const crearEmpresa = new CrearEmpresa(page);
    const editarEmpresa = new EditarEmpresa(page);
    const rutEmpresa = generarRUT();
    let a = true;
    if (a) { // prueba con todo
      await page.goto(`${process.env.BASE_URL}/private/crear-empresa`); // cambiar cuando se complete la edicion
      await expect(page).toHaveURL(/private\/crear-empresa/); // cambiar cuando se complete la edicion
      await crearEmpresa.crearEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'}); // cambiar cuando se complete la edicion
      await editarEmpresa.editarEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: "CLIENTE"}); // cambiar cuando se complete la edicion
    
    } else { // prueba con una empresa ya existente
      await editarEmpresa.editarEmpresa({rutEmpresa: '16737530-8', tipoEmpresa: "CLIENTE"});
    }
    
  });

  test('Agregar empresa | Cliente-proveedor', async ({ page }) => {
    const crearEmpresa = new CrearEmpresa(page);
    const editarEmpresa = new EditarEmpresa(page);
    const rutEmpresa = generarRUT();
    let a = true;
    if (a) { // prueba con todo
      await page.goto(`${process.env.BASE_URL}/private/crear-empresa`); // cambiar cuando se complete la edicion
      await expect(page).toHaveURL(/private\/crear-empresa/); // cambiar cuando se complete la edicion
      await crearEmpresa.crearEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE-PROVEEDOR', tipoClasificacion: 'CLIENTE OTIC'}); // cambiar cuando se complete la edicion
      await editarEmpresa.editarEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: "CLIENTE-PROVEEDOR"}); // cambiar cuando se complete la edicion
    
    } else { // prueba con una empresa ya existente
      await editarEmpresa.editarEmpresa({rutEmpresa: '16737530-8', tipoEmpresa: "CLIENTE-PROVEEDOR"});
    }
  });

  test('Agregar empresa | Proveedor', async ({ page }) => {
    const crearEmpresa = new CrearEmpresa(page);
    const editarEmpresa = new EditarEmpresa(page);
    const rutEmpresa = generarRUT();
    let a = true;
    if (a) { // prueba con todo
      await page.goto(`${process.env.BASE_URL}/private/crear-empresa`); // cambiar cuando se complete la edicion
      await expect(page).toHaveURL(/private\/crear-empresa/); // cambiar cuando se complete la edicion
      await crearEmpresa.crearEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: 'PROVEEDOR'}); // cambiar cuando se complete la edicion
      await editarEmpresa.editarEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: "PROVEEDOR"}); // cambiar cuando se complete la edicion
    
    } else { // prueba con una empresa ya existente
      await editarEmpresa.editarEmpresa({rutEmpresa: '16737530-8', tipoEmpresa: "PROVEEDOR"});
    }
  });
});
