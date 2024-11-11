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
//para retorno de funciones
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

export type inter = {
  //interpolacion
  fx: string;
  xn: number;
  x: number;
};

export type sec = {
  //secante
  fx: string;
  xi: number;
  ximen1: number; //xi - 1
  error: number;
};
