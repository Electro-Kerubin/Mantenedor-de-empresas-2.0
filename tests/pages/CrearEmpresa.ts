import { Page, expect } from '@playwright/test';
import { generarRUT } from '../utils/GeneradorRuts';
import { generarNombre } from '../utils/GeneradorNombres';
import { guardarDatos } from '../utils/GuardarDatos';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';

dotenv.config();

export class CrearEmpresa extends BasePage {

    constructor(page: Page) {
        super(page);
    }


    async goToCrearEmpresa() {
        await this.page.goto(`${process.env.BASE_URL}/private/crear-empresa`);
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL(/private\/crear-empresa/);
    }

    async clasificacionEmpresa({
        tipoCliente,
        tipoClasificacion,
        tipoClienteOTIC,
        rutEmpresa,
    }: {
        tipoCliente?: string;
        tipoClasificacion?: string;
        tipoClienteOTIC?: string;
        rutEmpresa?: string;
    }) {

        // await this.page.getByRole('combobox', { name: 'Seleccione Tipo de Empresa' }).click();

        if (tipoCliente === 'CLIENTE') {
            await this.setDropdownValue({optionValue: 'CLIENTE', locatorId: '#tipoEmpresa', name: 'Seleccione Tipo de Empresa'});
        } else if (tipoCliente === 'PROVEEDOR') {
            await this.setDropdownValue({optionValue: 'PROVEEDOR', locatorId: '#tipoEmpresa', name: 'Seleccione Tipo de Empresa'});
        } else if (tipoCliente === 'CLIENTE-PROVEEDOR') {
            await this.setDropdownValue({optionValue: 'CLIENTE-PROVEEDOR', locatorId: '#tipoEmpresa', name: 'Seleccione Tipo de Empresa'});
        }

        if (tipoClasificacion === 'CLIENTE OTIC') {
            // Mejorar este proceso
            await this.page.getByRole('checkbox', { name: 'Cliente OTIC' }).check();
            await this.page.getByRole('checkbox', { name: 'Cuenta no Franquiciable' }).check();
        } else if (tipoClasificacion === 'CUENTA REPARTO') {
            await this.page.getByRole('checkbox', { name: 'Cliente Reparto' }).check();
        }

        if (rutEmpresa) {
            await this.page.getByRole('textbox', { name: 'RUT Empresa *' }).fill(rutEmpresa);
        } else {
            await this.page.getByRole('textbox', { name: 'RUT Empresa *' }).fill(generarRUT());
        }

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async datosEmpresa(tipoCliente?: string) {

        if (tipoCliente === 'CLIENTE' || tipoCliente === 'CLIENTE-PROVEEDOR') {
            await this.page.getByRole('tabpanel').locator('select').nth(1).selectOption('CUENTA EXCEDENTES');
            await this.page.getByRole('tabpanel').locator('select').nth(2).selectOption('1000');
            await this.page.getByRole('textbox', { name: 'Fecha de Afiliación Fecha' }).fill('2025-09-09');
            if (tipoCliente === 'CLIENTE-PROVEEDOR') {
                await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('CLIENTE-PROVEEDOR'));
            } else if (tipoCliente === 'CLIENTE') {
                await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('CLIENTE'));
            }
            // await this.page.getByRole('textbox', { name: '-9' }).fill(generarRUT());
            await this.setDropdownValue({optionValue: 'AGUAS ANDINAS', locatorId: '#pn_id_15', name: 'Seleccione Nombre Holding'});
            await this.page.getByRole('textbox', { name: 'Ingrese Nombre de Cliente' }).fill('Cliente interno Prueba');
            await this.page.getByRole('textbox', { name: 'Ingrese a qué se dedica' }).fill('Pruebas test');
            await this.page.getByRole('textbox', { name: 'Ciudad' }).fill('Santiago');
            await this.setDropdownValue({optionValue:'REGION METROPOLITANA', locatorId: '#pn_id_10', name: 'Selecciona...'});
            await this.setDropdownValue({optionValue: 'LA FLORIDA', locatorId: '#pn_id_12', name: 'Selecciona...'})
            await this.page.getByRole('textbox', { name: 'Dirección' }).fill('Av. Vicuña Mackenna 1234');
            await this.page.getByRole('tabpanel').locator('select').nth(3).selectOption('Zona Metropolitana');
            await this.page.getByRole('tabpanel').locator('select').nth(4).selectOption('Oficina RM OTIC');
            await this.page.getByRole('textbox', { name: 'Ingresar Email' }).fill('correoprueba@gmail.com');
            await this.page.getByRole('textbox', { name: '+569' }).fill('56912345678');
            await this.page.getByRole('textbox', { name: 'Inserte Página Web' }).fill('www.clienteprueba.cl');

            await this.page.locator('#pn_id_13 div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE TRIGO' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE MAÍZ' }).locator('div').nth(1).click();

            await this.page.locator('div').filter({ hasText: /^Selecciona actividad\.\.\.$/ }).nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE AVENA' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE CEBADA' }).locator('div').nth(1).click();

            //tecla scape para cerrar el dropdown
            await this.page.keyboard.press('Escape');

            await this.page.getByRole('textbox', { name: 'Giro Comercial' }).fill('Pruebas de giro comercial');
        }

        if (tipoCliente === 'PROVEEDOR') {
            await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('PROVEEDOR'));
            // await this.page.getByRole('textbox', { name: '-9' }).fill(generarRUT());

            await this.page.getByRole('textbox', { name: 'Ciudad' }).fill('Santiago');
            await this.setDropdownValue({optionValue: 'REGION METROPOLITANA', locatorId: '#pn_id_10', name: 'Selecciona...'});
            await this.setDropdownValue({optionValue: 'LA FLORIDA', locatorId: '#pn_id_12', name: 'Selecciona...'})
            await this.page.getByRole('textbox', { name: 'Dirección' }).fill('Av. Vicuña Mackenna 1234');
            await this.page.getByRole('textbox', { name: 'Ingresar Email' }).fill('correoprueba@gmail.com');
            await this.page.getByRole('textbox', { name: '+569' }).fill('56912345678');
            await this.page.getByRole('textbox', { name: 'Inserte Página Web' }).fill('www.clienteprueba.cl');

            await this.page.locator('#pn_id_13 div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE TRIGO' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE MAÍZ' }).locator('div').nth(1).click();

            await this.page.locator('div').filter({ hasText: /^Selecciona actividad\.\.\.$/ }).nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE AVENA' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE CEBADA' }).locator('div').nth(1).click();

            //tecla scape para cerrar el dropdown
            await this.page.keyboard.press('Escape');

            await this.page.getByRole('textbox', { name: 'Giro Comercial' }).fill('Pruebas de giro comercial');

            await this.page.getByRole('textbox', { name: 'Ingrese a qué se dedica' }).fill('a que se dedica test');
        }

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async interlocutores() {
        await this.page.getByRole('button', { name: 'Carga Masiva ' }).click();
        const dialog = this.page.getByRole('dialog', { name: /carga masiva/i });

        // await this.page.locator('app-interlocutor-empresa').getByText('Cargar Plantilla', { exact: true }).setInputFiles('tests/utils/documentosPrueba/contactos.xlsx');

        await this.page.locator('xpath=/html/body/app-root/app-pages/main/app-crear-empresa/app-gestionar-empresa/div[1]/div[1]/app-informacion-general-empresa/div/div[3]/app-interlocutor-empresa/div[1]/div[2]/div/ul/li[2]/input')
            .setInputFiles('tests/utils/documentosPrueba/contactos.xlsx');

        //await dialog.locator('input[type="file"]').setInputFiles('tests/utils/documentosPrueba/contactos.xlsx');

        //await this.page.locator('input[type="file"]').setInputFiles('tests/utils/documentosPrueba/contactos.xlsx');
        //await this.page.locator('app-interlocutor-empresa').getByText('Cargar Plantilla', { exact: true }).setInputFiles('tests/utils/documentosPrueba/contactos.xlsx');
        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async sucursales(tipoCliente?: string) {
        await this.page.getByRole('button', { name: 'Carga Masiva ' }).click();
        if (tipoCliente === 'CLIENTE' || tipoCliente === 'CLIENTE-PROVEEDOR') {
            await this.page.locator(
                'xpath=/html/body/app-root/app-pages/main/app-crear-empresa/app-gestionar-empresa/div[1]/div[1]/app-informacion-general-empresa/div/div[4]/app-sucursales/div[1]/div[2]/div/ul/li[2]/input'
            ).setInputFiles('tests/utils/documentosPrueba/sucursales_cliente_clienteprov.xlsx');
        } else if (tipoCliente === 'PROVEEDOR') {
            await this.page.locator(
                'xpath=/html/body/app-root/app-pages/main/app-crear-empresa/app-gestionar-empresa/div[1]/div[1]/app-informacion-general-empresa/div/div[4]/app-sucursales/div[1]/div[2]/div/ul/li[2]/input'
            ).setInputFiles('tests/utils/documentosPrueba/sucursales_proveedor.xlsx');
        }

        // Agregar sucursal manualmente
        await this.page.getByRole('button', { name: ' Agregar Sucursal' }).click();
        if (tipoCliente === 'CLIENTE' || tipoCliente === 'CLIENTE-PROVEEDOR') {
            await this.page.getByRole('checkbox', { name: 'Cliente OTIC' }).click();
            await this.page.getByRole('checkbox', { name: 'Cuenta no Franquiciable' }).click();
            await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
            await this.page.locator('form select').first().selectOption('CUENTA EXCEDENTES');
            await this.page.locator('form select').nth(1).selectOption('1000');
            await this.page.locator('form select').nth(2).selectOption('Zona Norte');
            await this.page.locator('form select').nth(3).selectOption('Oficina Viña del Mar');
            await this.page.getByRole('textbox', { name: '+569' }).fill('56912345678');
            await this.page.getByRole('textbox', { name: 'Ingresar Email' }).fill('correo@prueba.com');
        }
        await this.page.getByRole('textbox', { name: 'Nombre Sucursal *' }).fill('Sucursal agregada manualmente test');
        await this.page.getByRole('combobox', { name: 'País' }).click();
        await this.page.getByRole('listbox', { name: 'Option List' }).getByRole('option', { name: /^CHILE$/ }).click();
        await this.page.getByRole('textbox', { name: 'Ciudad' }).fill('Santiago');
        // if (tipoCliente === 'CLIENTE' || tipoCliente === 'CLIENTE-PROVEEDOR') {
        //     await this.page.getByRole('combobox', { name: 'Selecciona...' }).first().click();
        // } else if (tipoCliente === 'PROVEEDOR') {
        //     await this.page.getByRole('combobox', { name: 'Selecciona...' }).first().click();
        // }
        await this.page.getByRole('combobox', { name: 'Selecciona...' }).first().click();
        await this.page.getByRole('listbox', { name: 'Option List' }).getByRole('option', { name: /^V VALPARAISO$/ }).click();
        await this.page.getByRole('combobox', { name: 'Selecciona...' }).last().click();
        await this.page.getByRole('listbox', { name: 'Option List' }).getByRole('option', { name: /^QUILPUE$/ }).click();
        await this.page.getByRole('textbox', { name: 'Dirección' }).fill('Av. Prueba 1234');


        await this.page.getByRole('button', { name: 'Agregar sucursal' }).click();
        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async informacionFinanciera(tipoCliente: string) {
        if (tipoCliente === 'CLIENTE' || tipoCliente === 'CLIENTE-PROVEEDOR') {
            await this.page.getByRole('combobox').first().selectOption('2.401 a 25.000 UF');
            await this.page.getByRole('textbox', { name: '% RAI' }).fill('11111111111');
            await this.page.getByRole('textbox', { name: '% proyectado en transcurso' }).fill('22222222222');
            await this.page.getByRole('textbox', { name: '% del año anterior' }).fill('33333333333');
            await this.page.getByRole('textbox', { name: 'Remuneración año anterior' }).fill('44444444444');
            await this.page.getByRole('textbox', { name: 'Dotación proyectada' }).fill('55555555555');
            await this.page.getByRole('textbox', { name: 'Dotación anual promedio' }).fill('66666666666');
            await this.page.getByRole('textbox', { name: 'Becas mandato' }).fill('77777777777');
            await this.page.getByRole('textbox', { name: 'Gasto Mensual Devengado' }).fill('88888888888');
            await this.page.getByRole('textbox', { name: 'Periodicidad del aporte' }).fill('99999999999');
            await this.page.getByRole('textbox', { name: 'Aporte comprometido del año' }).fill('101010101010');
            await this.page.getByRole('textbox', { name: 'Aporte proyectado' }).fill('111111111111');
            await this.page.getByRole('textbox', { name: 'Aporte efectivo año anterior' }).fill('121212121212');
            await this.page.locator('#fechaInicioComision').first().fill('2023-09-09');
            await this.setTasaAdministracion('1,01');
            await this.setTasaRealPresupuestada('2,02');

            await this.page.locator('div').filter({ hasText: /^Tipo de cuenta$/ }).nth(1).click();
            await this.page.getByRole('option', { name: 'Cuenta No Franquiciable' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'Consumo VyT Cuenta Normal' }).locator('div').nth(1).click();
            await this.page.keyboard.press('Escape');

            await this.page.getByRole('checkbox', { name: 'Comité Bipartito' }).click();
            await this.page.getByRole('textbox', { name: 'dd/mm/aaaa' }).nth(2).fill('09/09/2023');
            await this.page.getByRole('textbox', { name: 'dd/mm/aaaa' }).nth(3).fill('09/09/2024');
            await this.page.keyboard.press('Escape');

            await this.page.getByRole('checkbox', { name: 'Detección de Necesidades de' }).click();
            await this.page.locator('.row > div:nth-child(2) > div > .row > div > .input-group > .form-control').first().fill('12/12/2024');
            await this.page.locator('div:nth-child(2) > div > .row > div:nth-child(2) > .input-group > .form-control').first().fill('03/03/2025');
            await this.page.keyboard.press('Escape');

            await this.page.getByRole('checkbox', { name: 'MiPyme' }).click();
            await this.page.locator('div:nth-child(12) > div > div > .row > div > .input-group > .form-control').first().fill('09/09/2025');
            await this.page.locator('div:nth-child(12) > div > div > .row > div:nth-child(2) > .input-group > .form-control').first().fill('12/12/2025');
            await this.page.keyboard.press('Escape');

            await this.page.getByRole('checkbox', { name: 'Competencias Laborales (EyCCL)' }).click();
            await this.page.locator('div:nth-child(12) > div:nth-child(2) > div > .row > div > .input-group > .form-control').first().fill('09/09/2026');
            await this.page.locator('div:nth-child(12) > div:nth-child(2) > div > .row > div:nth-child(2) > .input-group > .form-control').last().fill('12/12/2026');
            await this.page.keyboard.press('Escape');
        }

        if (tipoCliente === 'CLIENTE-PROVEEDOR' || tipoCliente === 'PROVEEDOR') {
            //Datos bancarios
            if (tipoCliente === 'CLIENTE-PROVEEDOR') {
                await this.page.getByRole('combobox').nth(3).selectOption('TRANSFERENCIA BANCARIA');
            } else {
                await this.page.getByRole('combobox').first().selectOption('TRANSFERENCIA BANCARIA');
            }
            await this.page.locator('#banco').selectOption('Mercado Pago');
            if (tipoCliente === 'CLIENTE-PROVEEDOR') {
                await this.page.getByRole('combobox').last().selectOption('DEBITO');
            } else {
                await this.page.getByRole('combobox').last().selectOption('DEBITO');
            }
            await this.page.getByRole('textbox', { name: 'Nº Cuenta' }).fill('1111-2222-3333-4444');
            await this.page.getByRole('textbox', { name: 'Nombre' }).fill('Cuenta Bancaria Prueba');
            await this.page.getByRole('textbox', { name: '-9' }).fill(generarRUT());
            await this.page.getByRole('textbox', { name: 'email@dominio.cl' }).fill('cuentabancaria@email.com');

            await this.page.locator('input[type="file"][accept=".pdf,.jpg,.jpeg,.png"]').setInputFiles('tests/utils/documentosPrueba/PDF_TEST.pdf');

        }

        if (tipoCliente === 'CLIENTE' || tipoCliente === 'CLIENTE-PROVEEDOR') {
            await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
        }
    }

    async contactosOTIC({conEmpresa, conSucursal}: {conEmpresa?: boolean, conSucursal?: boolean}) {
        //Contacto OTIC EMPRESA
        if (conEmpresa) {
            await this.setContacto({nombreContacto: 'Marlene Urtubia Maldonado', tipoContacto: 'ejecutivo consultor'});
            await this.setContacto({nombreContacto: 'Alejandra Retamal Diaz', tipoContacto: 'asistente comercial'});
        }
        
        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();

        //Contacto OTIC SUCURSAL
        if (conSucursal) {
            // Sucursal principal
            await this.setContacto({nombreContacto: 'Daniela Gutierrez Troncoso', tipoContacto: 'ejecutivo consultor'});
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente Zonal Sucursal Principal')
            await this.setContacto({nombreContacto: 'Patricia Almonacid Baez', tipoContacto: 'asistente comercial'});
            // await this.page.locator('app-contactos-otic-sucursal select').nth(4).selectOption('Oficina Viña del Mar');

            // 1ª Sucursal en el listado
            await this.selectSucursalOTIC('Carga Masiva Sucursal 01');
            await this.setContacto({nombreContacto: 'Ana Andaur Adriazola', tipoContacto: 'ejecutivo consultor'});
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente Zonal 1');
            await this.setContacto({nombreContacto: 'Alejandra Retamal Diaz', tipoContacto: 'asistente comercial'});
            // await this.page.locator('app-contactos-otic-sucursal select').nth(4).selectOption('Oficina Talca');

            // 2ª Sucursal en el listado
            await this.selectSucursalOTIC('Carga Masiva Reparto sucursal 01');
            await this.setContacto({nombreContacto: 'Rodrigo Lampre Emparan', tipoContacto: 'ejecutivo consultor'});
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente Zonal 2');
            await this.setContacto({nombreContacto: 'Dannia Morales Munoz', tipoContacto: 'asistente comercial'});

            // 3ª Sucursal en el listado
            await this.selectSucursalOTIC('Sucursal agregada manualmente test');
            await this.setContacto({nombreContacto: 'Enrique Quiroz', tipoContacto: 'ejecutivo consultor'});
            await this.page.locator('app-contactos-otic-sucursal select').nth(2).selectOption('Oficina Antofagasta');
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente Zonal 3');
            await this.setContacto({nombreContacto: 'Michelle Riquelme Alvarez', tipoContacto: 'asistente comercial'});
        }
        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async afiliacionYContrato() {
        await this.page.getByRole('tabpanel').locator('select').first().selectOption('Contrato Reactivación');
        await this.setContacto({nombreContacto: 'Ana Venegas Sepúlveda', comboLocator: '#ejecutivoAfiliacionNombre', tipoContacto: 'ejecutivo consultor'});
        await this.page.getByRole('tabpanel').locator('select').nth(2).first().selectOption('Oficina RM OTIC');
        await this.setContacto({nombreContacto: 'Carlos Segovia Zuñiga', comboLocator: '#ejecutivoMantencionNombre', tipoContacto: 'ejecutivo consultor'});
        await this.page.getByRole('tabpanel').locator('select').nth(2).last().selectOption('Oficina RM OTIC');
        await this.page.getByRole('textbox', { name: 'Nombre Cazador' }).fill('Ejecutivo Cazador Prueba');
        await this.page.getByRole('textbox', { name: '-9' }).nth(2).fill('19339199-0');
        await this.page.getByRole('textbox', { name: 'Email' }).nth(2).fill('cazador@email.com');
        await this.page.getByRole('textbox', { name: '12345678' }).nth(2).fill('912345678');
        await this.page.getByRole('textbox', { name: 'dd/mm/aaaa' }).nth(1).fill('05/11/2025');
    }

    async guardar() {
        await this.page.getByRole('button', { name: 'Crear empresa' }).click();
        await this.page.getByRole('button', { name: 'Aceptar' }).click();
        // await expect(this.page.getByText('La empresa se ha creado con é')).toHaveValue('La empresa se ha creado con éxito.');
        await expect(this.page.getByRole('heading', { name: 'Mantenedor de Empresas' })).toBeVisible();
    }

    async crearEmpresa({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa?: string, tipoEmpresa: string, tipoClasificacion?: string}) {
        await this.goToCrearEmpresa();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL(/private\/crear-empresa/);
        await this.clasificacionEmpresa({
            rutEmpresa: rutEmpresa,
            tipoCliente: tipoEmpresa,
            tipoClasificacion: tipoClasificacion,
        });
        await this.datosEmpresa(tipoEmpresa);
        await this.interlocutores();
        await this.sucursales(tipoEmpresa);
        await this.informacionFinanciera(tipoEmpresa);
        if (tipoEmpresa === 'CLIENTE' || tipoEmpresa === 'CLIENTE-PROVEEDOR') {
            await this.contactosOTIC({conEmpresa: true, conSucursal: true});
            await this.afiliacionYContrato();
        }
        
        // await this.guardar();
    }


    async agregarInterlocutorManual({ 
        tipoContacto,
        nombreContacto,
        rutContacto,
        cargoContacto,
        telefonoContacto,
        celularContacto,
        emailContacto,
        observaciones
    } : 
    {
        tipoContacto?: string,
        nombreContacto?: string,
        rutContacto?: string,
        cargoContacto?:string,
        telefonoContacto?: string,
        celularContacto?: string,
        emailContacto?: string,
        observaciones?: string
    }) {

        await this.page.getByRole('button', { name: ' Agregar Contactos' }).click();
        await this.page.getByRole('combobox').selectOption(tipoContacto ?? 'Contacto Comercial');
        await this.page.getByRole('textbox', { name: 'Nombre y Apellidos *' }).fill(nombreContacto ?? 'Interlocutor prueba');
        await this.page.getByRole('textbox', { name: 'RUT' }).fill(rutContacto ?? '23610642-k');
        await this.page.getByRole('textbox', { name: 'Cargo' }).fill(cargoContacto ?? 'Cargo TEST');
        await this.page.getByRole('textbox', { name: 'Teléfono' }).fill(telefonoContacto ?? '911112222');
        await this.page.getByRole('textbox', { name: 'Celular' }).fill(celularContacto ?? '933334444');
        await this.page.getByRole('textbox', { name: 'email@contacto.cl' }).fill(emailContacto ?? 'correo@prueba.com');
        await this.page.getByRole('textbox', { name: 'Ingrese observaciones' }).fill(observaciones ?? 'Esto es una observacion de prueba');
        await this.page.getByRole('button', { name: 'Guardar' }).click();
    }

    async agregarSucursalManual({
        clasificacionEmpresa,
        bloqueoCredito,
        bloqueoMasivo,
        nombreSucursal,
        ciudad,
    }:{
        clasificacionEmpresa: string,
        bloqueoCredito?: string,
        bloqueoMasivo?: string,
        nombreSucursal?: string,
        ciudad?: string,
    }) { 
        await this.page.getByRole('button', { name: ' Agregar Sucursal' }).click();
        if (clasificacionEmpresa === 'Cuenta no Franquiciable' || clasificacionEmpresa === 'Intermediación Franquicia Tributaria' || clasificacionEmpresa === 'Servicios DO' || clasificacionEmpresa === 'Servicios Consultoría') {
            await this.page.getByRole('checkbox', { name: 'Cliente OTIC' }).click();
            //mejorar a futuro
            await this.page.getByRole('checkbox', { name: 'Cuenta no Franquiciable' }).click();
        } else if(clasificacionEmpresa === 'Cliente Reparto') {
            await this.page.getByRole('checkbox', { name: 'Cliente Reparto' }).click();
        }
        await this.btnSiguiente();
        
        await this.page.locator('form select').first().selectOption(bloqueoCredito ?? 'CUENTA EXCEDENTES');
        await this.page.locator('form select').nth(1).selectOption(bloqueoMasivo ?? '1000');
        await this.page.getByRole('textbox', { name: 'Nombre Sucursal *' }).fill(nombreSucursal ?? 'Sucursal manual test');
        await this.setDropdownValue({optionValue: 'CHILE', name: 'País'});
        await this.page.getByRole('textbox', { name: 'Ciudad' }).fill(ciudad ?? 'Santiago');
        await this.page.getByRole('combobox', { name: 'Selecciona...' }).first().click();
        await this.page.locator('.p-dropdown-panel:visible').getByRole('option', { name: 'REGION METROPOLITANA', exact: true }).click();
        await this.page.getByRole('combobox', { name: 'Selecciona...' }).last().click();
        await this.page.locator('.p-dropdown-panel:visible').getByRole('option', { name: 'LAMPA', exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Dirección' }).fill('Direccion prueba automatica');
        await this.page.locator('form select').nth(2).selectOption('Zona Metropolitana');
        await this.page.getByRole('textbox', { name: '+569' }).fill('912341234');
        await this.page.getByRole('textbox', { name: 'Ingresar Email' }).fill('correoprueba@correo.com');

        await this.page.getByRole('button', { name: 'Agregar sucursal' }).click();

        // await this.page.
    } 

    async persistenciaClasificacionEmpresa(rutEmpresa: string) {
        await expect(this.page.getByRole('textbox', { name: 'RUT Empresa *' })).toHaveValue(rutEmpresa);
        await expect(this.page.getByRole('checkbox', { name: 'Cliente OTIC' })).toBeChecked();
        await expect(this.page.getByRole('checkbox', { name: 'Cuenta no Franquiciable' })).toBeChecked();
        await expect(this.page.getByRole('checkbox', { name: 'Intermediación Franquicia' })).toBeChecked();
    }

    async persistenciaDatosEmpresa() {
        await expect(this.page.getByRole('tabpanel').locator('select').first()).toHaveValue('5000');
        await expect(this.page.getByRole('tabpanel').locator('select').nth(1)).toHaveValue('CUENTA EXCEDENTES');
        await expect(this.page.getByRole('tabpanel').locator('select').nth(2)).toHaveValue('1000');
        await expect(this.page.getByRole('textbox', { name: 'Fecha de Afiliación Fecha' })).toHaveValue('20-09-2009');
        await expect(this.page.getByRole('combobox', { name: 'AGUAS ANDINAS' })).toHaveValue('AGUAS ANDINAS');
        await expect(this.page.getByRole('textbox', { name: 'Ingrese Nombre de Cliente' })).toHaveValue('Cliente interno Prueba');
        await expect(this.page.getByRole('textbox', { name: 'Ingrese a qué se dedica' })).toHaveValue('Pruebas test');
        await expect(this.page.getByRole('combobox', { name: 'CHILE' })).toHaveValue('CHILE');
        await expect(this.page.getByRole('textbox', { name: 'Ciudad' })).toHaveValue('Santiago');
        await expect(this.page.getByRole('combobox', { name: 'REGION METROPOLITANA' })).toHaveValue('REGION METROPOLITANA');
        await expect(this.page.getByRole('combobox', { name: 'LA FLORIDA' })).toHaveValue('LA FLORIDA');
        await expect(this.page.getByRole('textbox', { name: 'Dirección' })).toHaveValue('Av. Vicuña Mackenna 1234');
        await expect(this.page.getByRole('tabpanel').locator('select').nth(3)).toHaveValue('Zona Metropolitana');
        await expect(this.page.getByRole('tabpanel').locator('select').nth(4)).toHaveValue('Oficina RM OTIC');
        await expect(this.page.getByRole('textbox', { name: 'Ingresar Email' })).toHaveValue('correoprueba@gmail.com');
        await expect(this.page.getByRole('textbox', { name: '+569' })).toHaveValue('56912345678');
        await expect(this.page.getByRole('textbox', { name: 'Inserte Página Web' })).toHaveValue('www.clienteprueba.cl');
        await this.page.getByText('CULTIVO DE TRIGO, CULTIVO DE').click();
        await expect(this.page.getByRole('option', { name: 'CULTIVO DE TRIGO' }).locator('div').nth(1)).toBeChecked();
        await expect(this.page.getByRole('option', { name: 'CULTIVO DE MAÍZ' }).locator('div').nth(1)).toBeChecked();
        await this.page.getByText('CULTIVO DE AVENA, CULTIVO DE').click();
        await expect(this.page.getByRole('option', { name: 'CULTIVO DE AVENA' }).locator('div').nth(1)).toBeChecked();
        await expect(this.page.getByRole('option', { name: 'CULTIVO DE CEBADA' }).locator('div').nth(1)).toBeChecked();
        await expect(this.page.getByRole('textbox', { name: 'Giro Comercial' })).toHaveValue('Pruebas de giro comercial');
    }

    async persistenciaInformacionFinanciera() {
        // await expect(this.page.)
    }

    async autoseleccionarOficinaRMOTIC({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa?: string, tipoEmpresa: string, tipoClasificacion?: string}) {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL(/private\/crear-empresa/);
        await this.clasificacionEmpresa({
            rutEmpresa: rutEmpresa,
            tipoCliente: tipoEmpresa,
            tipoClasificacion: tipoClasificacion,
        });

        await this.page.getByRole('tabpanel').locator('select').nth(3).selectOption('Zona Metropolitana');
    }

    async verificarMultiplicacionInterlocutores({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa?: string, tipoEmpresa: string, tipoClasificacion?: string}) {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL(/private\/crear-empresa/);
        await this.clasificacionEmpresa({
            rutEmpresa: rutEmpresa,
            tipoCliente: tipoEmpresa,
            tipoClasificacion: tipoClasificacion,
        });
        await this.datosEmpresa(tipoEmpresa);
        await this.agregarInterlocutorManual({});
        await this.page.getByRole('cell', { name: 'Icono SVG Activado' }).locator('a').click();
        await this.page.getByRole('combobox').selectOption('Contacto Operaciones');
        await this.page.getByRole('button', { name: 'Guardar' }).click();

        await this.page.getByRole('cell', { name: 'Icono SVG Activado' }).locator('a').click();
        await this.page.getByRole('textbox', { name: 'email@contacto.cl' }).fill('editemail@contacto.cl')
        await this.page.getByRole('button', { name: 'Guardar' }).click();

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
        await this.page.getByRole('button', { name: '', exact: true }).click();
    }

    
}