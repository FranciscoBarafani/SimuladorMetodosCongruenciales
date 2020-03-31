import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./CongruencialMultiplicativo.scss";
import Tabla from "../Tabla";

export default function CongruencialMultiplicativo() {
  const [cargando, setCargando] = useState(true);
  const [resultado, setResultado] = useState([]);
  const [multiplicador, setMultiplicador] = useState(0);
  const [semilla, setSemilla] = useState(0);
  const [modulo, setModulo] = useState(0);
  const [xnf, setxnf] = useState(0);

  //Esto se ejecuta una vez que hacemos click en ejecutar y los inputs del form son correctos
  const onFinish = values => {
    var { semilla, modulo, multiplicador } = values;
    //Ejecuto la funcion para generar numeros
    setResultado(
      generarNumerosAleatorios(
        parseInt(semilla),
        parseInt(multiplicador),
        parseInt(modulo)
      )
    );
    setParametros(semilla, multiplicador, modulo);
    setCargando(false);
    //Asigno los valores que fueron pasados al estado del componente
    //Por si queremos ejecutar secuencialmente despues
  };
  const setParametros = (xo, a, m) => {
    setMultiplicador(parseInt(a));
    setSemilla(parseInt(xo));
    setModulo(parseInt(m));
  };

  //Esta funcion genera numeros aleatorios utilizando el metodo Congruencial Mixto
  //xo: semilla, a: multiplicador, c: incremento, m: modulo
  function generarNumerosAleatorios(xo, a, m) {
    var xn1 = 0;
    var resultado = [];
    var xn = xo;
    let i = 0;
    for (i = 0; i < 20; i++) {
      //ax es ( a * xo )
      let ax = a * xn;
      //Sacamos el resto de la division de ax / m
      xn1 = ax % m;
      //Dividimos el resultado por /(m-1) para que sea decimal
      let xnm = xn1 / (m - 1);
      resultado[i + 1] = {
        key: i + 1,
        axc: ax,
        xn1: xn1,
        xnm: `${xnm.toFixed(4)}`
      };
      //Asignamos
      xn = xn1;
    }
    setxnf(xn);
    return resultado;
  }
  //Esta funcion calcula el siguiente numero
  function calcularSiguienteNumeroAleatorio() {
    let ax = multiplicador * xnf;
    let xn1 = ax % modulo;
    let xnm = xn1 / (modulo - 1);
    setxnf(xn1);
    resultado.push({
      key: resultado.length + 1,
      axc: ax,
      xn1: xn1,
      xnm: `${xnm.toFixed(4)}`
    });
  }

  return (
    <div className="congruencial-multiplicativo">
      <div className="form-congruencial">
        <h3>Congruencial Multiplicativo</h3>
        <Form
          name="congruencialmultiplicativo"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Semilla (X0)"
            name="semilla"
            rules={[
              {
                required: true,
                message: "Por favor introduce la semilla"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Multiplicador (a)"
            name="multiplicador"
            rules={[
              {
                required: true,
                message: "Por favor introduce el multiplicador"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Modulo (m)"
            name="modulo"
            rules={[
              {
                required: true,
                message: "Por favor introduce el modulo"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Ejecutar
            </Button>
            <Button
              type="secondary"
              onClick={() => calcularSiguienteNumeroAleatorio()}
            >
              +
            </Button>
            <Button type="danger" onClick={() => setResultado([])}>
              Limpiar Tabla
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p>
            A tener en cuenta: a y X0 tienen que ser mayores que cero. Y la
            variable m tiene que ser mayor que las tres anteriores
          </p>
        </div>
      </div>
      <div className="tabla">
        {!cargando ? <Tabla datos={resultado} /> : <></>}
      </div>
    </div>
  );
}
