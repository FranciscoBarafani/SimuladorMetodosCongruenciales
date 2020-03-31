import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./CongruencialMixto.scss";
import Tabla from "../Tabla";

export default function CongruencialMixto() {
  const [cargando, setCargando] = useState(true);
  const [resultado, setResultado] = useState([]);
  const [multiplicador, setMultiplicador] = useState(0);
  const [incremento, setIncremento] = useState(0);
  const [semilla, setSemilla] = useState(0);
  const [modulo, setModulo] = useState(0);
  const [xnf, setxnf] = useState(0);

  //Esto se ejecuta una vez que hacemos click en ejecutar y los inputs del form son correctos
  const onFinish = values => {
    var { semilla, modulo, incremento, multiplicador } = values;
    //Ejecuto la funcion para generar numeros
    setResultado(
      generarNumerosAleatorios(
        parseInt(semilla),
        parseInt(multiplicador),
        parseInt(incremento),
        parseInt(modulo)
      )
    );
    setParametros(semilla, multiplicador, modulo, incremento);
    setCargando(false);
    //Asigno los valores que fueron pasados al estado del componente
    //Por si queremos ejecutar secuencialmente despues
  };

  //Asigna los parametros a las variables de estado del componente
  const setParametros = (xo, a, m, c) => {
    setMultiplicador(parseInt(a));
    setSemilla(parseInt(xo));
    setModulo(parseInt(m));
    setIncremento(parseInt(c));
  };

  //Esta funcion genera numeros aleatorios utilizando el metodo Congruencial Mixto o Lineal
  //xo: semilla, a: multiplicador, c: incremento, m: modulo
  function generarNumerosAleatorios(xo, a, c, m) {
    //Inicializacion de Variables
    var resultado = [];
    var xn1 = 0;
    var xn = xo;
    var i = 0;
    for (i = 0; i < 20; i++) {
      let axc = a * xn + c;
      xn1 = axc % m;
      let xnm = xn1 / (m - 1);
      //Agregamos los resultados al JSON
      resultado[i + 1] = {
        key: i + 1,
        axc: axc,
        xn1: xn1,
        xnm: `${xnm.toFixed(4)}`
      };
      xn = xn1;
    }
    setxnf(xn);
    return resultado;
  }
  //Esta funcion calcula el siguiente numero
  function calcularSiguienteNumeroAleatorio() {
    let axc = multiplicador * xnf + incremento;
    let xn1 = axc % modulo;
    let xnm = xn1 / (modulo - 1);
    setxnf(xn1);
    resultado.push({
      key: resultado.length + 1,
      axc: axc,
      xn1: xn1,
      xnm: `${xnm.toFixed(4)}`
    });
  }

  return (
    <div className="congruencial-mixto">
      <div className="form-congruencial">
        <h3>Congruencial Mixto</h3>
        <Form
          name="congruencialmixto"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Semilla (X0)"
            name="semilla"
            rules={[
              { required: true, message: "Por favor introduce la semilla" }
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
            label="Incremento (c)"
            name="incremento"
            rules={[
              { required: true, message: "Por favor introduce el incremento" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Modulo (m)"
            name="modulo"
            rules={[
              { required: true, message: "Por favor introduce el modulo" }
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
            A tener en cuenta: a, X0 y c tienen que ser mayores que cero. Y la
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
