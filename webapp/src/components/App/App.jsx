import React from "react";
import { Routes, Route, useMatch, useNavigate, useLocation, Link } from "react-router-dom";

import { Layout, Menu } from "antd";
import JokeList from "../Joke/JokeList";
import About from "components/About/About";
import JokeDetail from "components/Joke/JokeDetail";

const { Header, Content } = Layout;

const App = () => {
  const location = useLocation();
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item><Link to={"/jokes"}>Jokes</Link></Menu.Item>
          <Menu.Item><Link to={"/about"}>About</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "30px 50px" }}>
        <Routes>
          <Route path="/jokes" element={<JokeList />} />
          <Route path="/jokes/:id" element={<JokeDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
