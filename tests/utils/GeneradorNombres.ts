export function generarNombre(nombre: string): string {
    const ahora = new Date();

    const fecha = ahora.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/-/g, ' ');

    const hora = ahora.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).replace(/:/g, '');

    return `${nombre} ${fecha} ${hora}`;
}
