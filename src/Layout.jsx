import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const NavLink = styled.div`
  display: flex;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = () => {
  return (
    <Wrapper>
      <NavLink>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/create-account">Create Account</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </NavLink>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default Layout;
