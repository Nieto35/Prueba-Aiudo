// EN EL MIDDLEWARE EN CASO DE SER NECESARIO SE PUEDEN MODIFICAR LOS OBJETOS
// ESTAS MODIFICACIONES SE HACEN EN EL TRANSCURSO DE LA CONSULTA Y EL FRONT
// ES DECIR, SE RECIBEN TODOS LOS DATOS DESDE EL BACK Y ANTES DE LLEGAR AL FRONT
// SE HACEN LOS CAMBIOS A TRAVES DE ESTE MIDDLEWARE

// EN ESTE CASO NO CONSIDERE NECESARIO ENTONCES SOLO DOY NEXT PARA CONTINUAR.
export const logger = (store) => (next) => (action) => {
  next(action);
};
