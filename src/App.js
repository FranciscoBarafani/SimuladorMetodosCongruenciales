import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import CongruencialMixto from "./components/CongruencialMixto";
import CongruencialMultiplicativo from "./components/CongruencialMultiplicativo";
import ChiCuadrado from "./components/ChiCuadrado";

function App() {
  const { Header, Content } = Layout;
  return (
    <div className="App">
      <Router>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item>
              <Link to="/congruencial-mixto">Congruencial Mixto</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/congruencial-multiplicativo">
                Congruencial multiplicativo
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/chi-cuadrado">Test Chi Cuadrado</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/congruencial-mixto">
              <CongruencialMixto />
            </Route>
            <Route path="/congruencial-multiplicativo">
              <CongruencialMultiplicativo />
            </Route>
            <Route path="/chi-cuadrado">
              <ChiCuadrado />
            </Route>
          </Switch>
        </Content>
      </Router>
    </div>
  );
}

export default App;
