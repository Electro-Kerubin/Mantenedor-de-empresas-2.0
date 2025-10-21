import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import { EditarEmpresa } from './EditarEmpresa';

dotenv.config();

export class Comercial extends BasePage {

    editarEmpresa: EditarEmpresa;

    constructor(page: Page) {
        super(page);
        this.editarEmpresa = new EditarEmpresa(page);
    }

    async verificarRestriccionDescargaCertificadoDatosBancarios({zonaAgente}:{zonaAgente?: string}) {
        let rutCliProv = "10597198-2";
        let rutProv = "22378632-4";

        if (zonaAgente == "Norte") {
            rutCliProv = "20891398-0";
            rutProv = "8225281-9";
        } else if (zonaAgente == "Sur") {
            rutCliProv = "21814998-7";
            rutProv = "22841662-2";
        }
        
        let cliProvDisabled = false;
        let provDisabled = false;
        
        const btnVisualizar = this.page.getByRole('button', { name: 'Visualizar' });
        const btnDescargar = this.page.getByRole('button', { name: ' Descargar' });

        await this.editarEmpresa.buscarEmpresa(rutCliProv, true, false);
        await this.page.getByRole('tab', { name: 'Información Financiera' }).click();
        if (await btnVisualizar.isVisible({timeout: 2000}) && await btnDescargar.isVisible({timeout: 2000})) {
            const visualizarDisabled = await btnVisualizar.isDisabled({timeout: 2000});
            const descargarDisabled = await btnDescargar.isDisabled({timeout: 2000});

            if (visualizarDisabled && descargarDisabled) {
                cliProvDisabled = true;
            }
        }
        
        if (zonaAgente) {
            await this.page.goto(`${process.env.BASE_URL}/private/mantenedor-empresa`);
            await this.editarEmpresa.buscarEmpresa(rutProv, true, false);
            await this.page.getByRole('tab', { name: 'Información Financiera' }).click();
            if (await btnVisualizar.isVisible({timeout: 2000}) && await btnDescargar.isVisible({timeout: 2000})) {
                const visualizarDisabled = await btnVisualizar.isDisabled({timeout: 2000});
                const descargarDisabled = await btnDescargar.isDisabled({timeout: 2000});

            if (visualizarDisabled && descargarDisabled) {
                    provDisabled = true;
                }
            }
        }
        

        return { cliProvDisabled, provDisabled };

    }

}