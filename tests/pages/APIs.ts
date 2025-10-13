import { request, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';

dotenv.config();

export class APIs extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async guardarUsuario({cargoId} : {cargoId: string}) {

        const token = process.env.TOKEN ?? '';
        const apiURL = process.env.API_URL;

        const apiContext = await request.newContext({
            baseURL: apiURL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const response = await apiContext.post(`${process.env.API_GUARDAR_USUARIO}` , {
            data: {
                "id": 1,
                "rut": process.env.RUT,
                "dv": process.env.DV,
                "nombres": process.env.NOMBRES,
                "email": process.env.EMAIL,
                "telefono": process.env.TELEFONO,
                "cargoId": cargoId,
                "estado": 1
            },
        });

        expect(response.ok()).toBeTruthy();
        const json = await response.json();
        // console.log('Respuesta:', json);

        await apiContext.dispose();
        
    }

}