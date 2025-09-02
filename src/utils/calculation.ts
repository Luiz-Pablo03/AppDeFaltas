export function calcularMaximoFaltas(
  totalDeAulas: number,
  percentualMinimoPresenca: number
): number {
  if (totalDeAulas <= 0) {
    return 0;
  }
  
  const percentualFaltasPermitido = 100 - percentualMinimoPresenca;
  const maxFaltas = (percentualFaltasPermitido / 100) * totalDeAulas;

  // Arredonda para baixo, pois não se pode ter uma fração de falta.
  return Math.floor(maxFaltas);
}