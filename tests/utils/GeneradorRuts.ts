export function generarRUT(): string {
    const numero = Math.floor(Math.random() * (25000000 - 5000000) + 5000000);
    const dv = calcularDV(numero);
    return `${numero}-${dv}`;
}

function calcularDV(rut: number): string {
    let suma = 0;
    let multiplicador = 2;

    for (let i = rut.toString().length - 1; i >= 0; i--) {
        suma += parseInt(rut.toString()[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const resto = suma % 11;
    const dv = 11 - resto;
    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
}