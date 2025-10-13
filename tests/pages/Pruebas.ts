import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CrearEmpresa } from './CrearEmpresa';
import { EditarEmpresa } from './EditarEmpresa';
import * as dotenv from 'dotenv';
import { generarRUT } from '../utils/GeneradorRuts';

dotenv.config();

export class Prueba extends BasePage{

    crearEmpresa: CrearEmpresa;
    editarEmpresa: EditarEmpresa;

    constructor(page: Page) {
        super(page);
        this.crearEmpresa = new CrearEmpresa(page);
        this.editarEmpresa = new EditarEmpresa(page);
    }

    

    async replicarContactoOTICASucursales({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa: string, tipoEmpresa: string, tipoClasificacion?: string,}) {
        
        const ruts = [];

        await this.crearEmpresa.goToCrearEmpresa();
        await this.crearEmpresa.clasificacionEmpresa({
            rutEmpresa: rutEmpresa,
            tipoCliente: tipoEmpresa,
            tipoClasificacion: tipoClasificacion,
        });
        await this.crearEmpresa.datosEmpresa(tipoEmpresa);
        await this.crearEmpresa.interlocutores();
        await this.crearEmpresa.sucursales(tipoEmpresa);
        await this.crearEmpresa.informacionFinanciera(tipoEmpresa);
        if (tipoEmpresa === 'CLIENTE' || tipoEmpresa === 'CLIENTE-PROVEEDOR') {
            //Contacto OTIC EMPRESA
            await this.setContacto('Marlene Urtubia Maldonado', '#pn_id_22');
            await this.setContacto('Kay Camus Caro', '#pn_id_24');
            await this.page.getByRole('button', { name: 'Replicar a Sucursales' }).click();
            await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
            await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
            await this.crearEmpresa.guardar();
        }

        await this.editarEmpresa.buscarEmpresa(rutEmpresa);
        await this.page.getByRole('tab', { name: 'Contactos OTIC' }).click();
        await this.page.getByRole('button', { name: 'Sucursales', exact: true }).click();

        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        await this.selectSucursalOTIC('Carga Masiva Sucursal 01');
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        await this.selectSucursalOTIC('Carga Masiva Reparto sucursal 01');
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        await this.selectSucursalOTIC('Sucursal agregada manualmente test');
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        return ruts;

    }

    async verificarCambiosInterlocutoresEnSucursalPrincipal({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa: string, tipoEmpresa: string, tipoClasificacion?: string,}) {
        await this.crearEmpresa.goToCrearEmpresa();
        await this.crearEmpresa.goToCrearEmpresa();
        await this.crearEmpresa.clasificacionEmpresa({
            rutEmpresa: rutEmpresa,
            tipoCliente: tipoEmpresa,
            tipoClasificacion: tipoClasificacion,
        });
        await this.crearEmpresa.datosEmpresa(tipoEmpresa);

        await this.crearEmpresa.agregarInterlocutorManual({});
        await this.btnSiguiente();
        await this.btnAtras();

        await this.page.getByRole('cell', { name: 'Icono SVG Activado' }).locator('a').click();
        await this.editarInterlocutor({
            tipoContacto: 'Jefe de Finanzas', 
            nombreInterlocutor: 'Interlocutor Editado',
            rutInterlocutor: '19689657-0',
            cargoInterlocutor: 'Cargo Editado',
            telefonoInterlocutor:'944445555',
            celularInterlocutor: '988886666',
            emailInterlocutor: 'emaileditado@gmail.com'
        });
        
        await this.btnSiguiente();
        await this.page.getByRole('button', { name: '', exact: true }).click();
    }

    async verificarOcultarEjecutivoConsultorYAsistenteComercial({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa: string, tipoEmpresa: string, tipoClasificacion?: string,}) {
        await this.crearEmpresa.goToCrearEmpresa();
        await this.crearEmpresa.clasificacionEmpresa({
            rutEmpresa: rutEmpresa,
            tipoCliente: tipoEmpresa,
            tipoClasificacion: tipoClasificacion,
        });
        await this.crearEmpresa.datosEmpresa(tipoEmpresa);
        await this.btnSiguiente();
        await this.crearEmpresa.sucursales(tipoEmpresa);
        await this.crearEmpresa.informacionFinanciera(tipoEmpresa);
        await this.crearEmpresa.contactosOTIC({conEmpresa: true, conSucursal: true});
        await this.page.getByRole('tab', { name: 'Información General' }).click();
        await this.page.getByRole('button', { name: 'Sucursales' }).click();
        await this.page.getByRole('row', { name: ' Carga Masiva Sucursal 01' }).getByRole('button').click();
    }
    
    async verificarSucursalesReplicanDatosDeSucursalPrincipal({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa: string, tipoEmpresa: string, tipoClasificacion?: string,}) {
        const ruts = [];

        await this.crearEmpresa.goToCrearEmpresa();
        await this.crearEmpresa.crearEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: tipoEmpresa, tipoClasificacion: tipoClasificacion});
        await this.crearEmpresa.guardar();
        
        await this.editarEmpresa.buscarEmpresa(rutEmpresa);
        await this.page.getByRole('tab', { name: 'Contactos OTIC' }).click();
        await this.page.getByRole('button', { name: 'Sucursales', exact: true }).click();



        await this.selectSucursalOTIC('Carga Masiva Sucursal 01');
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        await this.selectSucursalOTIC('Carga Masiva Reparto sucursal 01');
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        await this.selectSucursalOTIC('Sucursal agregada manualmente test');
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
        await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

        return ruts;
    }

        async verificarEliminacionContactoOTICSucursalNoPersiste({rutEmpresa, tipoEmpresa, tipoClasificacion} : {rutEmpresa: string, tipoEmpresa: string, tipoClasificacion?: string,}) {
            const ruts = [];

            await this.crearEmpresa.goToCrearEmpresa();
            //await this.crearEmpresa.crearEmpresa({rutEmpresa: rutEmpresa, tipoEmpresa: tipoEmpresa, tipoClasificacion: tipoClasificacion});
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForURL(/private\/crear-empresa/);
            await this.crearEmpresa.clasificacionEmpresa({
                rutEmpresa: rutEmpresa,
                tipoCliente: tipoEmpresa,
                tipoClasificacion: tipoClasificacion,
            });
            await this.crearEmpresa.datosEmpresa(tipoEmpresa);
            await this.crearEmpresa.interlocutores();
            await this.crearEmpresa.sucursales(tipoEmpresa);
            await this.crearEmpresa.informacionFinanciera(tipoEmpresa);
            await this.crearEmpresa.contactosOTIC({conEmpresa: false, conSucursal: true})
            await this.crearEmpresa.afiliacionYContrato();
            await this.crearEmpresa.guardar();
            await this.editarEmpresa.buscarEmpresa(rutEmpresa);
            await this.page.getByRole('tab', { name: 'Contactos OTIC' }).click();
            await this.btnReplicarASucursales();
            await this.btnSiguiente();
            await this.btnGuardarySalir();

            await this.editarEmpresa.buscarEmpresa(rutEmpresa);
            await this.page.getByRole('tab', { name: 'Contactos OTIC' }).click();
            await this.btnSiguiente();
            
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

            await this.selectSucursalOTIC('Carga Masiva Sucursal 01');
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

            await this.selectSucursalOTIC('Carga Masiva Reparto sucursal 01');
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );

            await this.selectSucursalOTIC('Sucursal agregada manualmente test');
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() ); 

            return ruts;

        }

        async verificarContactosEnSucursalPrincipal({rutEmpresa, tipoEmpresa, tipoClasificacion}: {rutEmpresa: string, tipoEmpresa: string, tipoClasificacion:string}) {
            await this.crearEmpresa.goToCrearEmpresa();
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForURL(/private\/crear-empresa/);
            await this.crearEmpresa.clasificacionEmpresa({
                rutEmpresa: rutEmpresa,
                tipoCliente: tipoEmpresa,
                tipoClasificacion: tipoClasificacion,
            });
            await this.crearEmpresa.datosEmpresa(tipoEmpresa);
            await this.crearEmpresa.agregarInterlocutorManual({});
            await this.crearEmpresa.agregarInterlocutorManual({
                tipoContacto: 'Retiro del Cheque',
                nombreContacto: 'Persona 02',
                rutContacto: '22175707-6',
                cargoContacto: 'Cargo 02',
                telefonoContacto: '123456789',
                celularContacto: '987654321',
                emailContacto: 'correo02@correo.com',
                observaciones: 'obs 01'
            });
            await this.btnSiguiente();
            await this.page.getByRole('button', { name: '', exact: true }).click();
            
            const filas = this.page.getByRole('cell', { name: 'Contacto Sucursal Descargar' });
            const cantidadFilas = await filas.count();
            return cantidadFilas;

        }

        async verificarPersistenciaDatosEnSucursalesAgregadasManualContactoOTIC({rutEmpresa, tipoEmpresa, tipoClasificacion}:{rutEmpresa: string, tipoEmpresa: string, tipoClasificacion:string}) {
            const ruts = [];
            const agentesZonales = [];
            const rutsPostCreacion = [];
            const agentesZonalesPostCreacion = [];
            
            await this.crearEmpresa.goToCrearEmpresa();
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForURL(/private\/crear-empresa/);
            await this.crearEmpresa.clasificacionEmpresa({
                rutEmpresa: rutEmpresa,
                tipoCliente: tipoEmpresa,
                tipoClasificacion: tipoClasificacion,
            });
            await this.crearEmpresa.datosEmpresa(tipoEmpresa);
            await this.btnSiguiente();
            await this.crearEmpresa.agregarSucursalManual({clasificacionEmpresa: 'Cuenta no Franquiciable'});
            await this.crearEmpresa.agregarSucursalManual({clasificacionEmpresa: 'Cuenta no Franquiciable', bloqueoCredito: 'CUENTA NORMAL', bloqueoMasivo: '1000', ciudad: 'Peñalolen', nombreSucursal: 'Sucursal manual 02'});
            await this.btnSiguiente();
            await this.crearEmpresa.informacionFinanciera(tipoEmpresa);
            await this.crearEmpresa.contactosOTIC({conEmpresa: true, conSucursal: false});
            await this.btnAtras();
            await this.page.getByRole('button', { name: 'Sucursales', exact: true }).click();
            
            await this.setContacto('Marlene Urtubia Maldonado', '#pn_id_25');
            await this.setContacto('Carlos Segovia Zuñiga', '#pn_id_27');
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('agente zonal sucursal principal');
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );
            await agentesZonales.push(await this.page.getByRole('textbox', { name: 'Agente Zonal' }).inputValue());
            
            await this.selectSucursalOTIC('Sucursal manual test');
            await this.setContacto('Ana Andaur Adriazola', '#pn_id_25');
            await this.setContacto('Carlos Miranda A.', '#pn_id_27');
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('agente zonal primera sucursal');
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );
            await agentesZonales.push(await this.page.getByRole('textbox', { name: 'Agente Zonal' }).inputValue());

            await this.selectSucursalOTIC('Sucursal manual 02');
            await this.setContacto('Daniela Gutierrez Troncoso', '#pn_id_25');
            await this.setContacto('Francisca Yañez Escobar', '#pn_id_27');
            await this.page.getByRole('textbox', { name: 'Agente Zonal' }).fill('agente zonal segunda sucursal');
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await ruts.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );
            await agentesZonales.push(await this.page.getByRole('textbox', { name: 'Agente Zonal' }).inputValue());

            await this.btnSiguiente();
            await this.crearEmpresa.guardar();
            
            await this.editarEmpresa.buscarEmpresa(rutEmpresa);
            await this.page.getByRole('tab', { name: 'Contactos OTIC' }).click();
            await this.page.getByRole('button', { name: 'Sucursales', exact: true }).click();

            await rutsPostCreacion.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await rutsPostCreacion.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );
            await agentesZonalesPostCreacion.push(await this.page.getByRole('textbox', { name: 'Agente Zonal' }).inputValue());

            await this.selectSucursalOTIC('Sucursal manual test');
            await rutsPostCreacion.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await rutsPostCreacion.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );
            await agentesZonalesPostCreacion.push(await this.page.getByRole('textbox', { name: 'Agente Zonal' }).inputValue());

            await this.selectSucursalOTIC('Sucursal manual 02');
            await rutsPostCreacion.push( await this.page.getByRole('textbox', { name: '-9' }).first().inputValue() );
            await rutsPostCreacion.push( await this.page.getByRole('textbox', { name: '-9' }).last().inputValue() );
            await agentesZonalesPostCreacion.push(await this.page.getByRole('textbox', { name: 'Agente Zonal' }).inputValue());

            return { ruts, agentesZonales, rutsPostCreacion, agentesZonalesPostCreacion };

        }

}