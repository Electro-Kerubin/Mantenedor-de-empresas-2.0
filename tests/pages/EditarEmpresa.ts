import { Page, expect } from '@playwright/test';
import { generarRUT } from '../utils/GeneradorRuts';
import { generarNombre } from '../utils/GeneradorNombres';
import { BasePage } from './BasePage';

export class EditarEmpresa extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async buscarEmpresa(rutEmpresa: string) {

        for (let i = 0; i <= 10; i++) {
            await this.page.getByRole('textbox', { name: 'Ingrese RUT' }).fill(rutEmpresa);
            await this.page.waitForTimeout(4000);
            await this.page.getByRole('button', { name: 'Buscar' }).click();
            try {
                await this.page.waitForTimeout(1000);
                if (await this.page.getByRole('cell', { name: 'Creado' }).isVisible()) {
                    await this.page.getByRole('button', { name: 'Icono SVG' }).click({ timeout: 0 });
                    break;
                }
            }
            catch {
                console.log('Empresa no encontrada, reintentando...');
            }
        }

    }

    async editarClasificacionEmpresa(tipoEmpresa: string) {
        if (tipoEmpresa === 'CLIENTE' || tipoEmpresa === 'CLIENTE-PROVEEDOR') {
            await this.page.getByRole('checkbox', { name: 'Cuenta no Franquiciable' }).check();
            await this.page.getByRole('checkbox', { name: 'Servicios Consultoría' }).check();
        }

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async editarDatosEmpresa(tipoEmpresa: string) {
        await this.esperarSpinnerDesaparecer(this.page);

        if (tipoEmpresa === 'CLIENTE' || tipoEmpresa === 'CLIENTE-PROVEEDOR') {

            await this.page.getByRole('tabpanel').locator('select').first().selectOption('1000');
            await this.page.getByRole('tabpanel').locator('select').nth(1).selectOption('CUENTA NORMAL');
            await this.page.getByRole('tabpanel').locator('select').nth(2).selectOption('5000');
            await this.page.getByRole('textbox', { name: 'Fecha Creación' }).fill('25-09-2025');
            await this.page.getByRole('textbox', { name: 'Fecha de Afiliación Fecha' }).fill('21-09-2025');
            if (tipoEmpresa === 'CLIENTE') {
                await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('Cliente Editado'));
            } else if (tipoEmpresa === 'CLIENTE-PROVEEDOR') {
                await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('Cliente-proveedor Editado'));
            }
            // } else if (tipoEmpresa === 'PROVEEDOR') {
            //     await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('Proveedor Editado'));
            // }

            await this.editDropdownValue({optionValue: 'CAROZZI', name: 'AGUAS ANDINAS'});

            await this.page.getByRole('textbox', { name: 'Ingrese Nombre de Cliente' }).fill('Cliente interno prueba editado');
            await this.page.getByRole('textbox', { name: 'Ingrese a qué se dedica' }).fill('Pruebas test Editado');
            await this.page.getByRole('textbox', { name: 'Ciudad' }).fill('Santiago Editado');

            await this.editDropdownValue({optionValue: 'V VALPARAISO', name: 'REGION METROPOLITANA'})

            await this.editDropdownValue({optionValue: 'VALPARAISO', name: 'Selecciona...'})

            await this.page.getByRole('textbox', { name: 'Dirección' }).fill('Avenida Siempre Viva 123 Editado');
            await this.page.getByRole('tabpanel').locator('select').nth(3).selectOption('Zona Sur');
            await this.page.getByRole('tabpanel').locator('select').nth(4).selectOption('Oficina Temuco');
            await this.page.getByRole('textbox', { name: 'Ingresar Email' }).fill('correopruebaeditado@gmail.com');
            await this.page.getByRole('textbox', { name: '+569' }).fill('56911112222');
            await this.page.getByRole('textbox', { name: 'Inserte Página Web' }).fill('www.paginawebeditada.com');
            await this.page.getByText('CULTIVO DE TRIGO, CULTIVO DE').click();
            await this.page.getByRole('option', { name: 'CULTIVO DE TRIGO' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE CEBADA' }).locator('div').nth(1).click();
            await this.page.getByText('CULTIVO DE AVENA, CULTIVO DE').click();
            await this.page.getByRole('option', { name: 'CULTIVO DE AVENA' }).locator('div').nth(1).click();
            await this.page.getByRole('textbox', { name: 'Giro Comercial' }).fill('Giro comercial editado');
            await this.page.keyboard.press('Escape');
            
        } else if (tipoEmpresa === 'PROVEEDOR') {
            await this.page.getByRole('tabpanel').locator('select').selectOption('1000');
            await this.page.getByRole('textbox', { name: 'Fecha Creación' }).fill('09-10-2025');
            await this.page.getByRole('textbox', { name: 'Nombre / Razón Social' }).fill(generarNombre('Proveedor Editado'));
            await this.page.getByRole('textbox', { name: 'Ciudad' }).fill('Santiago Editado');
            await this.editDropdownValue({optionValue: 'V VALPARAISO', name: 'REGION METROPOLITANA'})
            await this.editDropdownValue({optionValue: 'VALPARAISO', name: 'Selecciona...'})
            await this.page.getByRole('textbox', { name: 'Dirección' }).fill('Avenida Siempre Viva 123 Editado'); 
            await this.page.getByRole('textbox', { name: 'Ingresar Email' }).fill('correopruebaeditado@gmail.com');
            await this.page.getByRole('textbox', { name: '+569' }).fill('56911112222');
            await this.page.getByRole('textbox', { name: 'Inserte Página Web' }).fill('www.paginawebeditada.com'); 
            await this.page.getByText('CULTIVO DE TRIGO, CULTIVO DE').click();
            await this.page.getByRole('option', { name: 'CULTIVO DE TRIGO' }).locator('div').nth(1).click();
            await this.page.getByRole('option', { name: 'CULTIVO DE CEBADA' }).locator('div').nth(1).click();
            await this.page.getByText('CULTIVO DE AVENA, CULTIVO DE').click();
            await this.page.getByRole('option', { name: 'CULTIVO DE AVENA' }).locator('div').nth(1).click();
            await this.page.getByRole('textbox', { name: 'Giro Comercial' }).fill('Giro comercial editado');
            await this.page.getByRole('textbox', { name: 'Ingrese a qué se dedica' }).fill('A que se dedica test editado');
            await this.page.keyboard.press('Escape');
        }

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click({ timeout: 200_000 });
    }

    async editarInterlocutores() {
        await this.esperarSpinner();

        //Desactivar interlocutores
        await this.desactivarInterlocutor({nombreInterlocutor: 'Test 15246619-6 Destinatario' });
        await this.desactivarInterlocutor({nombreInterlocutor: 'rodrigo baeza 13620667-2 Jefe' });
        await this.desactivarInterlocutor({nombreInterlocutor: 'Harold Destinatario OC' });

        //Editar interlocutor
        await this.page.getByRole('row', { name: 'Natalia 15323920-7 Encargado' }).locator('a').click();
        await this.page.getByRole('combobox').selectOption('Gerente RRHH');
        await this.page.getByRole('textbox', { name: 'Nombre y Apellidos *' }).fill('Natalia Editada');
        await this.page.getByRole('textbox', { name: 'RUT' }).fill('23526972-4');
        await this.page.getByRole('textbox', { name: 'Cargo' }).fill('Gerente de RRHH Editado');
        await this.page.getByRole('textbox', { name: 'Teléfono' }).fill('56999998888');
        await this.page.getByRole('textbox', { name: 'Celular' }).fill('56977776666');
        await this.page.getByRole('textbox', { name: 'email@contacto.cl' }).fill('correoEDITADO@gmail.com');
        await this.page.getByRole('textbox', { name: 'Ingrese observaciones' }).fill('Interlocutor editado');
        await this.page.getByRole('button', { name: 'Guardar' }).click();

        //agregar nuevo interlocutor
        await this.page.getByRole('button', { name: ' Agregar Contactos' }).click();
        await this.page.getByRole('combobox').selectOption('Personal Dedicado');
        await this.page.getByRole('textbox', { name: 'Nombre y Apellidos *' }).fill('Interlocutor Nuevo EDICION');
        await this.page.getByRole('textbox', { name: 'RUT' }).fill('19272485-6');
        await this.page.getByRole('textbox', { name: 'Cargo' }).fill('Cargo Nuevo EDICION');
        await this.page.getByRole('textbox', { name: 'Teléfono' }).fill('56911111111');
        await this.page.getByRole('textbox', { name: 'Celular' }).fill('56922222222');
        await this.page.getByRole('textbox', { name: 'email@contacto.cl' }).fill('nuevointerlocutorcorreo@gmail.com');
        await this.page.getByRole('textbox', { name: 'Ingrese observaciones' }).fill('Interlocutor nuevo agregado comentario EDICION');
        await this.page.getByRole('button', { name: 'Guardar' }).click();

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async editarDatosFinancieros({tipoEmpresa}:{tipoEmpresa: string}) {
        
        if (tipoEmpresa === "CLIENTE" ||tipoEmpresa === "CLIENTE-PROVEEDOR") {

            await this.page.getByRole('combobox').first().selectOption('100.001 y más UF', { timeout: 200_000 });
            await this.page.getByRole('textbox', { name: '% RAI' }).fill('11');
            await this.page.getByRole('textbox', { name: '% proyectado en transcurso' }).fill('22');
            await this.page.getByRole('textbox', { name: '% del año anterior' }).fill('33');
            await this.page.getByRole('textbox', { name: 'Remuneración año anterior' }).fill('44');
            await this.page.getByRole('textbox', { name: 'Dotación proyectada' }).fill('55');
            await this.page.getByRole('textbox', { name: 'Dotación anual promedio' }).fill('66');
            await this.page.locator('div').filter({ hasText: /^Cuenta No Franquiciable, Consumo VyT Cuenta Normal$/ }).nth(1).click();

            await this.clickOption(this.page.getByRole('option', { name: 'Cuenta No Franquiciable' }).locator('div').nth(1));
            await this.clickOption(this.page.getByRole('option', { name: 'Consumo VyT Cuenta Normal' }).locator('div').nth(1));
            await this.clickOption(this.page.getByRole('option', { name: 'Excedentes' }).locator('div').nth(1));
            await this.page.keyboard.press('Escape');
            
            await this.page.getByRole('textbox', { name: 'Becas mandato' }).fill('77');
            await this.page.getByRole('textbox', { name: 'Gasto Mensual Devengado' }).fill('88');
            await this.page.locator('#fechaInicioComision').first().fill('01-04-2025');
            await this.page.getByRole('textbox', { name: 'Periodicidad del aporte' }).fill('999');
            await this.page.getByRole('textbox', { name: 'Aporte comprometido del año' }).fill('1010');
            await this.page.getByRole('textbox', { name: 'Aporte proyectado' }).fill('1111');
            await this.page.getByRole('textbox', { name: 'Aporte efectivo año anterior' }).fill('1212');
            await this.setTasaAdministracion('1,42');
            await this.setTasaRealPresupuestada('2,57');

            // Beneficios adicionales
            await this.page.locator('.row > .row > div > .input-group > .form-control').first().fill('01-01-2025');
            await this.page.locator('div:nth-child(2) > div:nth-child(2) > .input-group > .form-control').first().fill('02-01-2025');
            await this.page.locator('.row > div:nth-child(2) > div > .row > div > .input-group > .form-control').first().fill('03-01-2025');
            await this.page.locator('div:nth-child(2) > div:nth-child(2) > .input-group > .form-control').nth(1).fill('04-01-2025');
            await this.page.locator('div:nth-child(12) > div > div > .row > div > .input-group > .form-control').first().fill('05-01-2025');
            await this.page.locator('div:nth-child(2) > div:nth-child(2) > .input-group > .form-control').nth(2).fill('06-01-2025');
            await this.page.locator('div:nth-child(12) > div:nth-child(2) > div > .row > div > .input-group > .form-control').first().fill('10-09-2026')
            await this.page.locator('div:nth-child(12) > div:nth-child(2) > div > .row > div > .input-group > .form-control').last().fill('13-09-2026')
        }

        if (tipoEmpresa === 'CLIENTE-PROVEEDOR' || tipoEmpresa === 'PROVEEDOR') {
            // DATOS BANCARIOS
            if (tipoEmpresa === 'CLIENTE-PROVEEDOR') {
                await this.page.getByRole('combobox').nth(3).selectOption('DEPÓSITO DIRECTO');
            } else {
                await this.page.getByRole('combobox').first().selectOption('DEPÓSITO DIRECTO');
            }
            await this.page.getByRole('textbox', { name: 'Banco' }).fill('TEMPO');
            if (tipoEmpresa === 'CLIENTE-PROVEEDOR') {
                await this.page.getByRole('combobox').nth(4).last().selectOption('VISTA');
            } else {
                await this.page.getByRole('combobox').nth(1).last().selectOption('CUENTA CORRIENTE');
            }
            await this.page.getByRole('textbox', { name: 'Nº Cuenta' }).fill('7777-7777-8888-8888');
            await this.page.getByRole('textbox', { name: 'Nombre' }).fill('Cuenta Bancaria Prueba EDITADA');
            await this.page.getByRole('textbox', { name: '-9' }).fill('24095504-0');
            await this.page.getByRole('textbox', { name: 'email@dominio.cl' }).fill('cuentabancariaEDIT@email.com');

            await this.page.locator('input[type="file"][accept=".pdf,.jpg,.jpeg,.png"]').setInputFiles('tests/utils/documentosPrueba/certificado_bancario.pdf');
        }

        if (tipoEmpresa === 'CLIENTE' || tipoEmpresa === 'CLIENTE-PROVEEDOR') {
            await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
        } 
    }

    async editarSucursales() {
        this.esperarSpinnerDesaparecer(this.page);
        // Por hacer
        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async editarContactoOTIC() {
        await this.esperarSpinner();

        // // Ejecutivo consultor - Empresa
        await this.editDropdownValue({optionValue: 'Valentina Ettori Sandoval', name: 'Marlene Urtubia Maldonado'});

        // // // Asistente comercial - Empresa
        await this.editDropdownValue({optionValue: 'Valeria Adriazola Barredo', name: 'Kay Camus Caro'});
        await this.page.locator('app-empresa-principal select').nth(3).selectOption('Oficina Viña del Mar');

        this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
        await this.esperarSpinner();

        // Ejecutivo consultor - Sucursal principal
        await this.editDropdownValue({optionValue: 'Rodrigo Lampre Emparan', name: 'Seleccione un ejecutivo'});
        await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente zonal sucursal principal editado');

        // Asistente comercial - Sucursal principal
        await this.editDropdownValue({optionValue: 'Susana Belmar Jaime', name: 'Seleccione un ejecutivo'});

        // Ejecutivo consultor - Sucursal 1
        await this.selectSucursalOTIC('Carga Masiva Sucursal 01');
        await this.editDropdownValue({optionValue: 'Patricia Almonacid Báez', name: 'Ana Andaur Adriazola'})
        await this.page.locator('app-contactos-otic-sucursal select').nth(2).selectOption('Oficina Puerto Montt');
        await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente zonal sucursal 1 editado');

        // Asistente comercial - Sucursal 1
        await this.editDropdownValue({optionValue: 'Patricia Contreras Espinaza', name: 'Lorena Reyes Gonzales'});
        await this.page.locator('app-contactos-otic-sucursal select').nth(4).selectOption('Oficina Puerto Montt');

        // Ejecutivo consultor - Sucursal 2
        await this.selectSucursalOTIC('Carga Masiva Reparto sucursal 01');
        await this.editDropdownValue({optionValue: 'Marlene Urtubia Maldonado', name: 'Rodrigo Lampre Emparan'})
        await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente zonal sucursal 2 editado');

        // Asistente comercial - Sucursal 2
        await this.editDropdownValue({optionValue: 'Natalia Valdes J.', name: 'Susana Belmar Jaime'});
        await this.page.locator('app-contactos-otic-sucursal select').nth(4).selectOption('Oficina Concepción');

        // Ejecutivo consultor - Sucursal 3
        await this.selectSucursalOTIC('Sucursal agregada manualmente test');
        await this.editDropdownValue({optionValue: 'Camila Sepulveda Olivares', name: 'Enrique Quiroz'});
        await this.page.locator('app-contactos-otic-sucursal select').nth(2).selectOption('Oficina Talca');
        await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('Agente zonal sucursal 3 editado');

        // Asistente comercial - Sucursal 3
        await this.editDropdownValue({optionValue: 'Daniela Gutierrez Troncoso', name: 'Francisca Yañez Escobar'});

        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async editarAfiliacionYContrato() {
        await this.esperarSpinner();
        await this.page.getByRole('tabpanel').locator('select').first().selectOption('Contrato Nuevo RUT Holding', { timeout: 140_000 });


        await this.editDropdownValue({optionValue: 'Enrique Quiroz', name: 'Ana Venegas Sepúlveda'});
        await this.page.getByRole('tabpanel').locator('select').nth(2).selectOption('Oficina Calama');

        await this.editDropdownValue({optionValue: 'Carlos Miranda A.', name: 'Carlos Segovia Zuñiga'});
        await this.page.getByRole('tabpanel').locator('select').nth(4).selectOption('Oficina RM OTIC');

        await this.page.getByRole('textbox', { name: 'Nombre Cazador' }).fill('Cazador editado');
        await this.page.getByRole('textbox', { name: '-9' }).nth(2).fill('20555016-k');
        await this.page.getByRole('textbox', { name: 'Email' }).nth(2).fill('cazadoreditado@email.com');
        await this.page.getByRole('textbox', { name: '12345678' }).nth(2).fill('56988887777');
        await this.page.getByRole('textbox', { name: 'dd/mm/aaaa' }).nth(1).fill('30-09-2025');

    }

    async guardarCambios() {
        await this.page.getByRole('button', { name: 'Editar empresa' }).click();
        await this.page.getByRole('button', { name: 'Aceptar' }).click();
    }

    async esperarSpinnerDesaparecer(page: Page, timeout = 100_000) {

    }

    //borra despues de la creacion de la prueba
    async avanzar() {
        await this.page.getByRole('tab', { name: 'Afiliación y Contrato' }).click();
        // await this.page.getByRole('button', { name: 'Sucursales' }).click();
    }

    async editarEmpresa({rutEmpresa, tipoEmpresa} : {rutEmpresa: string, tipoEmpresa: string}) {
        await this.buscarEmpresa(rutEmpresa);
        await this.editarClasificacionEmpresa(tipoEmpresa);
        await this.editarDatosEmpresa(tipoEmpresa);
        await this.editarInterlocutores();
        await this.editarSucursales(); //por hacer
        await this.editarDatosFinancieros({tipoEmpresa: tipoEmpresa});
        if (tipoEmpresa !== 'PROVEEDOR') {
            await this.editarContactoOTIC();
            await this.editarAfiliacionYContrato();
        }
        // await this.guardarCambios();
    }

    
}