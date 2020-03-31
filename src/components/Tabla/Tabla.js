import React from "react";
import "./Tabla.scss";

export default function Tabla(props) {
  const { datos } = props;
  return (
    <div className="tabla">
      <table>
        <tr>
          <th>i</th>
          <th>aXi+c</th>
          <th>Xi+1</th>
          <th>Xi+1/1-m</th>
        </tr>
        {datos.map((numero, index) => (
          <tr>
            <td>{index}</td>
            <td>{numero.axc}</td>
            <td>{numero.xn1}</td>
            <td>{numero.xnm}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
