import { expect, Locator, Page } from '@playwright/test';


export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectSucursalOTIC(sucursalSelection: string) {
        await this.page
            .locator('app-contactos-otic-sucursal div')
            .filter({ hasText: 'Contactos OTIC Sucursal Sucursal' })
            .getByRole('combobox')
            .selectOption(`${sucursalSelection}`);
    }

    async setContacto({nombreContacto, comboLocator, tipoContacto} : {nombreContacto: string, comboLocator?: string, tipoContacto: string}) {

        let combo: string | any;
        if (tipoContacto === 'ejecutivo consultor') {
            if (comboLocator) {
                combo = this.page.locator(`${comboLocator}`).getByRole('combobox', { name: 'Seleccione un ejecutivo' });
            } else {
                combo = this.page.getByRole('combobox', { name: 'Seleccione un ejecutivo' });
            }
        } else if (tipoContacto === 'asistente comercial') {
            if (comboLocator) {
                combo = this.page.locator(`${comboLocator}`).getByRole('combobox', { name: 'Seleccione un asistente' });
            } else {
                combo = this.page.getByRole('combobox', { name: 'Seleccione un asistente' });
            }
        }
        
        await combo.click();

        const listboxId = await combo.getAttribute('aria-controls');
        const listbox = this.page.locator(`#${listboxId}`);
        await listbox.waitFor({ state: 'visible', timeout: 100000 });

        const option = listbox.getByRole('option', { name: `${nombreContacto}`, exact: true });
        await option.waitFor({ state: 'visible', timeout: 100000 });
        await option.click({ timeout: 100000 });
    }

    async setTasaAdministracion(valor: string) {
        const input = this.page.locator('.ng-star-inserted > div:nth-child(9) > div > .form-control').first();
        await input.fill(valor);
    }

    async setTasaRealPresupuestada(valor: string) {
        const input = this.page.locator('.ng-star-inserted > div:nth-child(9) > div:nth-child(2) > .form-control');
        await input.fill(valor);
    }

    async setDropdownValue({optionValue, locatorId, name, nthValue}:{optionValue: string, locatorId?: string, name?: string, nthValue?: number}) {
        
        if (locatorId) {
            const combo = this.page.locator(`${locatorId}`).getByRole('combobox', { name: `${name}` });
            await combo.click();
        } else if(!locatorId && nthValue !== undefined) {
            const combo = this.page.getByRole('combobox', { name: `${name}` }).nth(nthValue);
            await expect(combo).toBeVisible();
            await expect(combo).toBeEnabled({ timeout: 10000 });
            await combo.click();
        } else {
            const combo = this.page.getByRole('combobox', { name: `${name}` });
            await combo.click();
        }
        
        

        await this.page.locator('.p-dropdown-panel:visible').getByRole('option', { name: `${optionValue}`, exact: true }).click();
    }

    async editDropdownValue({
        optionValue,
        locatorId,
        name
    }: {
        optionValue: string;
        locatorId?: string;
        name?: string;
    }) {

        await this.esperarSpinner();

        if (locatorId) {
            const combo = this.page.locator(`${locatorId}`).getByRole('combobox', { name: `${name}` });
            await combo.click();
            await this.page.locator('.p-dropdown-header').getByRole('option', { name: `${optionValue}`, exact: true }).click({ timeout: 10000 });
        } else {
            const combo = this.page.getByRole('combobox', { name: `${name}` }).first();
            await combo.waitFor({ state: 'visible', timeout: 120000 });
            await combo.click({ timeout: 200000 });

            let listBoxId = await combo.getAttribute('aria-controls');

            if (listBoxId?.includes('_list')) {
                listBoxId = listBoxId.replace('_list', '');
            }

            const listBox = this.page.locator(`#${listBoxId}`).first();
            await listBox.waitFor({ state: 'visible', timeout: 10000 });

            const option = listBox.getByRole('option', { name: `${optionValue}`, exact: true });
            await option.waitFor({ state: 'visible', timeout: 10000 });
            await option.scrollIntoViewIfNeeded();
            // await this.page.waitForTimeout(500);
            await option.click({ timeout: 10000 });
        }
    }

    async desactivarInterlocutor({ nombreInterlocutor }: { nombreInterlocutor: string }) {
        await this.page.getByRole('row', { name: `${nombreInterlocutor}` }).locator('#switchCheckChecked').click({ timeout: 120000 });
        await this.page.getByRole('button', { name: 'Confirmar' }).click();
    }

    async esperarSpinner(timeout = 30000) {
        await this.page.waitForTimeout(1500);
        const spinner = this.page.locator('.ngx-spinner-overlay');
        try {
            // Espera que desaparezca o esté oculto
            await spinner.waitFor({ state: 'hidden', timeout });
        } catch (error) {
            console.warn('Spinner no desapareció dentro del tiempo esperado');
        }
    }

    async clickOption(locator: Locator, timeout = 10000) {
        await locator.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(150);
        try {
            await locator.click({ timeout });
        } catch (err) {
            console.warn('Click bloqueado, intentando con force...');
            await locator.click({ force: true, timeout });
        }
    }

    async editarInterlocutor({ tipoContacto, nombreInterlocutor, rutInterlocutor, cargoInterlocutor, telefonoInterlocutor, celularInterlocutor, emailInterlocutor, comentario }:
        {
            tipoContacto?: string,
            nombreInterlocutor?: string,
            rutInterlocutor?: string,
            cargoInterlocutor?: string,
            telefonoInterlocutor?: string,
            celularInterlocutor?: string,
            emailInterlocutor?: string,
            comentario?: string
        }
    ) {
        await this.page.getByRole('combobox').selectOption(`${tipoContacto}`);
        await this.page.getByRole('textbox', { name: 'Nombre y Apellidos *' }).fill(`${nombreInterlocutor}`);
        await this.page.getByRole('textbox', { name: 'RUT' }).fill(`${rutInterlocutor}`);
        await this.page.getByRole('textbox', { name: 'Cargo' }).fill(`${cargoInterlocutor}`);
        await this.page.getByRole('textbox', { name: 'Teléfono' }).fill(`${telefonoInterlocutor}`);
        await this.page.getByRole('textbox', { name: 'Celular' }).fill(`${celularInterlocutor}`);
        await this.page.getByRole('textbox', { name: 'email@contacto.cl' }).fill(`${emailInterlocutor}`);
        await this.page.getByRole('textbox', { name: 'Ingrese observaciones' }).fill(`${comentario}`);
        await this.page.getByRole('button', { name: 'Guardar' }).click();
    }

    async btnSiguiente() {
        await this.page.getByRole('button', { name: 'Guardar y continuar' }).click();
    }

    async btnAtras() {
        await this.page.getByRole('button', { name: 'Atrás' }).click();
    }

    async btnReplicarASucursales() {
        await this.page.getByRole('button', { name: 'Replicar a Sucursales' }).waitFor({state: 'visible', timeout: 120000});
        await this.page.getByRole('button', { name: 'Replicar a Sucursales' }).click({timeout: 120000});
    }

    async btnGuardarySalir() {
        await this.page.getByRole('button', { name: 'Guardar y salir' }).click();
    }

    
}