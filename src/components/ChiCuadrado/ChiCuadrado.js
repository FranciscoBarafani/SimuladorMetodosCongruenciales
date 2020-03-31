import React, { useState } from "react";
import "./ChiCuadrado.scss";
import { Form, Input, Button, Switch } from "antd";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines
} from "react-vis";
import "react-vis/dist/style.css";

export default function ChiCuadrado() {
  //Cargando
  const [cargando, setCargando] = useState(true);
  //JSON con los subintervalos y los datos necesarios para formar la tabla
  const [datos, setDatos] = useState([]);
  //Esta funcion se ejecuta al terminar el form de manera correcta
  const onFinish = values => {
    const numeros = generarNumerosAleatorios(values.cantidad);
    let resultado = pruebaDeFrecuencia(numeros, values.subintervalos);
    setDatos(resultado);
    setCargando(false);
  };
  //Esta funcion genera los numeros aleatorios y los asigna al array Numeros
  const generarNumerosAleatorios = cantidad => {
    let i = 0;
    let numeros = [];
    for (i; i < cantidad; i++) {
      numeros.push(Math.random());
    }
    return numeros;
  };
  //Esta funcion ejecuta la prueba de frecuencia
  const pruebaDeFrecuencia = (numeros, intervalos) => {
    //Declaracion de Variables
    //Objeto Resultado
    var resultado = [];
    //Contador de Intervalos
    let i = 1;
    //Estadistico Acumulado
    let ca = 0;
    //Tamaño de Intervalos
    const t = 1 / intervalos;
    //Frecuencia Estimada
    const fe = numeros.length / intervalos;
    //Valor del extremo anterior
    let ea = 0;
    //Ejecucion
    for (i; i <= intervalos; i++) {
      //Contador de Numeros
      let j = 0;
      //Creacion del Intervalo
      const intervalo = { ei: ea, ed: i * t, fo: 0, fe: fe, c: 0, ca: 0 };
      //Calculo de Frecuencia Obtenida
      for (j; j <= numeros.length; j++) {
        if (numeros[j] > intervalo.ei && numeros[j] < intervalo.ed) {
          //Si el numero se encuentra entre el extremo izquierdo y derecho del intervalo sumamos +1 fo
          intervalo.fo++;
        }
      }
      //Calcular Estadistico
      intervalo.c = (intervalo.fe - intervalo.fo) ** 2 / fe;
      //Asignar Estadistico Acumulado
      ca = ca + intervalo.c;
      intervalo.ca = ca;
      //Insertar Intervalo en el resultado Final
      resultado.push(intervalo);
      //Setear nuevo extremo derecho como extremo anterior para el nuevo intervalo
      ea = intervalo.ed;
      //Setear nuevo estadistico acumulado
    }
    return resultado;
  };

  return (
    <div className="chi-cuadrado">
      <div className="form">
        <h3>Chi Cuadrado</h3>
        <Form
          name="chicuadrado"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="cantidad"
            label="Cantidad de Numeros a Generar"
            rules={[
              {
                required: true,
                message: "Por favor introduce la cantidad de numeros a generar"
              }
            ]}
          >
            <Input placeholder="Numeros a generar" />
          </Form.Item>
          <Form.Item
            name="subintervalos"
            label="Cantidad de Sub-Intervalos"
            rules={[
              {
                required: true,
                message: "Por favor introduce  la cantidad de subintervalos"
              }
            ]}
          >
            <Input placeholder="Cantidad de sub-intervalos" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Ejecutar
            </Button>
            <Button type="danger" onClick={() => setDatos([])}>
              Limpiar Tabla
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="tabla">{!cargando ? <Tabla datos={datos} /> : <></>}</div>
    </div>
  );
}

function Tabla(props) {
  const { datos } = props;
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const chartDataFo = [];
  const chartDataFe = [];
  let i = 0;

  for (i; i < datos.length; i++) {
    console.log(datos[i].fo);
    let puntofo = { x: i, y: datos[i].fo };
    let puntofe = { x: i, y: datos[i].fe };
    chartDataFo.push(puntofo);
    chartDataFe.push(puntofe);
  }

  const onSwitchChange = change => {
    setMostrarTabla(change);
  };

  return (
    <div className="dashboard">
      <h3>Mostrar Grafico: </h3>
      <Switch onChange={onSwitchChange} />
      {!mostrarTabla ? (
        <div className="tabla">
          <table>
            <tr>
              <th>Intervalo</th>
              <th>fo</th>
              <th>fe</th>
              <th>c</th>
              <th>CA</th>
            </tr>
            {datos.map((d, index) => (
              <tr>
                <td>
                  {d.ei.toFixed(1)} - {d.ed.toFixed(1)}
                </td>
                <td>{d.fo}</td>
                <td>{d.fe}</td>
                <td>{d.c.toFixed(2)}</td>
                <td>{d.ca.toFixed(2)}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="chart">
          <XYPlot height={300} width={800}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Intervalo" />
            <YAxis title="Frecuencia Obtenida y Esperada" />
            <LineSeries data={chartDataFe} />
            <LineSeries data={chartDataFo} />
          </XYPlot>
        </div>
      )}
    </div>
  );
}
