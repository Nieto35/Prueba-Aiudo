import React, { useEffect, useState, useRef } from "react";

export default function InputNumerico(props) {
  const { datainput, setDatainput, disabled, label } = props;
  const [cursor, setCursor] = useState("");
  const refInput = useRef(null);

  useEffect(() => {
    if (cursor !== "") {
      refInput.current.setSelectionRange(cursor, cursor);
      setCursor("");
    }
    // eslint-disable-next-line
  }, [cursor]); // Si se setea verifica si tiene datos

  const inputNumber = (e) => {
    const valueInput = e.target.value;
    // verifica que se haya escrito un numero, si es asi cambia el valor del input
    // si no, no deja escribir
    if (valueInput.match(/^[0-9]*?$/) || valueInput === "") {
      setDatainput(valueInput);
    } else {
      // En caso de que no se setee el valor se mueve al final automaticamente
      // Para evitar esto se mueve la posicion a la actual
      // Menos lo que se escribio en el campo
      // setCursor(selectionStart - 1);
    }
  };

  return (
    <input
      className="form-control"
      type="text"
      placeholder={label ? label : ""}
      value={datainput}
      ref={refInput}
      onChange={inputNumber}
      disabled={disabled}
    />
  );
}
