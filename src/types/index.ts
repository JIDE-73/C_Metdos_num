//Aqui se determina que tipo de valores se aceptan
export type Category = {
  //no cambiar
  //para categorias
  id: number;
  name: string;
};

export type nr = {
  //no cambiar
  //newton rapshon y mejorado
  fx: string;
  xi: number;
  error: number;
};
//editables --->
//datos de resultado secante
export interface iterSec {
  iteraciones: number; // Cambié el nombre de "interaciones" a "iteraciones" (acentuación)
  xiPrev: number; // Renombrado de xi_1 a xiPrev
  xiCurr: number; // Renombrado de xi a xiCurr
  xiNext: number; // Renombrado de xim1 a xiNext
  fXiPrev: number; // Renombrado de fxi_1 a fXiPrev
  fXiCurr: number; // Renombrado de fxi a fXiCurr
  fXiNext: number; // Renombrado de fxm1 a fXiNext
  error: number;
}

export interface IteracionSecante {
  iteraciones: number;
  xi: number;
  fxi: number;
  error: number;
}

//Biseccion
export interface IteracionBiseccion {
  iteracion: number;
  xi: number;
  xs: number;
  xr: number;
  fxi: number; // Evaluación de la función en xi
  fxr: number; // Evaluación de la función en xr
  camb: number; // Producto de fxi y fxr
  er: number; // Error
}

//3 errores
export interface Terrores {
  eAbsoluto: number;
  eRelativo: number;
  ePorcentual: number;
}
