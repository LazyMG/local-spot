import { Link } from "react-router-dom";
import styled from "styled-components";
import { data } from "../utils/tempData";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Header = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
`;

const Home = () => {
  return (
    <Wrapper>
      <Header>맛집 목록</Header>
      <Content>
        <List>
          <li>
            <Link to={`/map/${data[0].placeId}`}>{data[0].title}</Link>
          </li>
          <li>
            <Link to={`/map/${data[1].placeId}`}>{data[1].title}</Link>
          </li>
          <li>
            <Link to={`/map/${data[2].placeId}`}>{data[2].title}</Link>
          </li>
        </List>
      </Content>
    </Wrapper>
  );
};

export default Home;
