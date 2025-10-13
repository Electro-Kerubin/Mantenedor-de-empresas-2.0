import { expect, test } from "@playwright/test";
import { CrearEmpresa } from "../pages/CrearEmpresa";
import * as dotenv from 'dotenv';
import { dot } from "node:test/reporters";
import { Util } from "../pages/util";
import { EditarEmpresa } from "../pages/EditarEmpresa";
import { generarRUT } from "../utils/GeneradorRuts";
import { Prueba } from "../pages/Pruebas";
import { APIs } from "../pages/APIs";

dotenv.config();

test.describe('Pruebas Exploratorias', () => {

  let crearEmpresa: CrearEmpresa;
  let prueba: Prueba;
  let rutEmpresa: string;
  let apis: APIs;

  test.beforeEach(async ({ page }) => {
    //await page.setViewportSize({ width: 1920, height: 1080 }); // Cambiar cuando se termine la creacion de las pruebas
    crearEmpresa = new CrearEmpresa(page);
    prueba = new Prueba(page);
    apis = new APIs(page);
    rutEmpresa = generarRUT();
    await page.setViewportSize({ width: 1680, height: 1050 });
    await apis.guardarUsuario({cargoId: '1'});
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

  
  test('Datos Empresa | Oficina Metropolitana autoselecciona la oficina', async ({ page }) => {
      // const crearEmpresa = new CrearEmpresa(page);
      // const rutEmpresa = generarRUT();
      await page.goto(`${process.env.BASE_URL}/private/crear-empresa`); // cambiar cuando se complete la edicion
      await expect.soft(page).toHaveURL(/private\/crear-empresa/); // cambiar cuando se complete la edicion
      await crearEmpresa.autoseleccionarOficinaRMOTIC({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'}); // cambiar cuando se complete la edicion
      await expect.soft(page.getByRole('tabpanel').locator('select').nth(4).locator('option:checked')).toHaveText('Oficina RM OTIC', {timeout: 100});
    });

    test('Sucursal | Los interlocutores se multiplican en la sucursal principal cuando se edita el "tipo de contacto" o "email" del usuario', async({ page }) => {
      // const crearEmpresa = new CrearEmpresa(page);
      // const rutEmpresa = generarRUT();
      await page.goto(`${process.env.BASE_URL}/private/crear-empresa`); // cambiar cuando se complete la edicion
      await expect(page).toHaveURL(/private\/crear-empresa/); // cambiar cuando se complete la edicion
      await crearEmpresa.verificarMultiplicacionInterlocutores({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});

      const cantidadInterlocutores = await page.getByRole('cell', { name: 'Interlocutor prueba', exact: true }).count();
      expect(cantidadInterlocutores).toBe(1);
    });

    test('Crear | Contacto OTIC | "Replicar a sucursales" solo replica a la primera sucursal, debe replicar a todas', async({ page }) => {
      const ruts = await prueba.replicarContactoOTICASucursales({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});

      for (let i = 0; i <= ruts.length; i++) {
        expect.soft(ruts[i]).not.toBeNull();
        expect.soft(ruts[i]).not.toBe('');
      }

    });

    test('Sucursal | Los cambios realizados en los interlocutores no se ven reflejados en la sucursal principal', async({page}) => {
      await prueba.verificarCambiosInterlocutoresEnSucursalPrincipal({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});
      await expect( page.getByRole('cell', { name: 'Jefe de Finanzas', exact: true })).toHaveText('Jefe de Finanzas');
      await expect( page.getByRole('cell', { name: 'Interlocutor Editado', exact: true })).toHaveText('Interlocutor Editado');
      await expect( page.getByRole('cell', { name: '19689657-0', exact: true })).toHaveText('19689657-0');
      await expect( page.getByRole('cell', { name: 'Cargo Editado', exact: true })).toHaveText('Cargo Editado');
      await expect( page.getByRole('cell', { name: '944445555', exact: true })).toHaveText('944445555');
      await expect( page.getByRole('cell', { name: '988886666', exact: true })).toHaveText('988886666');
      await expect( page.getByRole('cell', { name: 'emaileditado@gmail.com', exact: true })).toHaveText('emaileditado@gmail.com');
    });

    test('Sucursal | Ocultar usuarios tipos "ejecutivo consultor" y "asistente comercial" en los contactos de las sucursales', async ({page}) => {
      await prueba.verificarOcultarEjecutivoConsultorYAsistenteComercial({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});
      await expect.soft( page.getByRole('cell', { name: 'Ejecutivo Consultor', exact: true }) ).toHaveCount(0 , { timeout: 500 });
      await expect.soft( page.getByRole('cell', { name: 'Asistente Comercial', exact: true }) ).toHaveCount(0 , { timeout: 500 });
    });

    test('Crear | Contacto OTIC Sucursal | Sucursales replican los datos de la sucursal principal', async({page}) => {
      const ruts = await prueba.verificarSucursalesReplicanDatosDeSucursalPrincipal({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});
      
      console.log('ruts: ' + ruts);

      for (let i = 0; i <= ruts.length; i++) {
        expect.soft(ruts[i]).not.toBe('17025167-9');
        expect.soft(ruts[i]).not.toBe('16034689-2');
      }

    });

    test('Editar | Contactos OTIC Sucursal | Eliminar un contactos otic sucursal no persiste', async({page}) => {
      const ruts = await prueba.verificarEliminacionContactoOTICSucursalNoPersiste({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion: 'CLIENTE OTIC'});

      console.log('ruts: ' + ruts);

      for (let i = 0; i <= ruts.length; i++) {
        // expect(ruts[i]).toBeNull();
        expect(ruts[i]).toBe('');
      }

    });

    test('Crear | Sucursales | La sucursal principal solo trae el ultimo interlocutor agregado', async ({page}) => {
      
      const cantidadFilas = await prueba.verificarContactosEnSucursalPrincipal({rutEmpresa: rutEmpresa, tipoEmpresa: 'CLIENTE', tipoClasificacion:'CLIENTE OTIC'});
      console.log('Cantidad de filas: ', cantidadFilas);
      expect(cantidadFilas).toBeGreaterThan(1);
      
    });

    test('Crear | Contactos OTIC Sucursal | Datos de contactos otic sucursal desaparecen cuando las sucursales fueron agregadas de forma manual', async({page}) => {
      const {
          ruts,
          agentesZonales,
          rutsPostCreacion,
          agentesZonalesPostCreacion
        } = await prueba.verificarPersistenciaDatosEnSucursalesAgregadasManualContactoOTIC({
          rutEmpresa: rutEmpresa,
          tipoEmpresa: 'CLIENTE',
          tipoClasificacion: 'CLIENTE OTIC'
        });

        console.log('Ruts iniciales:', ruts);
        console.log('Agentes zonales:', agentesZonales);
        console.log('Ruts post creación:', rutsPostCreacion);
        console.log('Agentes zonales post creación:', agentesZonalesPostCreacion);

        await expect.soft(rutsPostCreacion, 'Los RUTs no son iguales después de la creación')
        .toEqual(ruts);

        await expect.soft(agentesZonalesPostCreacion, 'Los agentes zonales no son iguales después de la creación')
        .toEqual(agentesZonales);
      });

            
});