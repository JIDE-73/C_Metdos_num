//Aqui se determina que tipo de valores se aceptan
export type Category = {
  //no cambiar
  //para categorias
  id: number;
  name: string;
};

export interface nr {
  //no cambiar
  //newton rapshon y mejorado
  iteracion: number;
  xi: number;
  error: number;
}
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

//serie de macLauren
export interface McL {
  approx: number;
  relE: number;
  approxE: number;
}

//serie Taylor
export interface serieT {
  iteracion: number;
  AproV: number;
  errorTr: number;
}

//interpolacion
export type interPol = {
  x: number; // Valor de x ingresado para interpolar
  fx: number; // Resultado de la interpolación f(x)
  x0: number; // Punto inferior del rango
  x1: number; // Punto superior del rango
  fx0: number; // Valor de f(x0)
  fx1: number; // Valor de f(x1)
};

declare module "*.jpg";
declare module "*.png";
