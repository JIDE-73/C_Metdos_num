import { Terrores } from "../types";

export function Terroress(vReal: number, vAprox: number): Terrores[] {
  let errores: Terrores[] = [];
  let absol = vReal - vAprox;
  let rela = absol / vReal;
  let porc = rela * 100;

  errores.push({
    eAbsoluto: absol,
    eRelativo: rela,
    ePorcentual: porc,
  });
  return errores;
}
