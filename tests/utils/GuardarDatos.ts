import { promises as fs } from 'fs';

const FILE_PATH = 'empresa.json';

export async function guardarDatos(nombreEmpresa: string, rutEmpresa: string) {
    let data = { nombreEmpresa, rutEmpresa };

    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
    console.log('Datos guardados correctamente (async)');
}

export async function leerDatos() {
    try {
        let data = await fs.readFile(FILE_PATH, 'utf8');
        let jsonData = JSON.parse(data);
        console.log(`Datos recuperados: Nombre = ${jsonData.nombreEmpresa}, RUT = ${jsonData.rutEmpresa}`);
        return jsonData;
    } catch (error) {
        console.log('No hay datos guardados aún.');
        return null;
    }
}