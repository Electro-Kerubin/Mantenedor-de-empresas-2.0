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

        await this.crearEmpresa.agregarInterlocutorManual();
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

}