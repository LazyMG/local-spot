import { Link } from "react-router-dom";
import styled from "styled-components";
import Map from "./Map";
import { useState } from "react";

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
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
`;

const MapView = styled.div`
  width: 100%;
`;

const Home = () => {
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    const { name, checked } = event.target;
    setLoading(true);
    if (checked) {
      setFilter((prev) => [...prev, name]);
    } else {
      setFilter(
        (prev) => prev.filter((el) => el !== name)
        // const tempArr = prev;
        // return tempArr.filter((el) => el !== event.target.name);
      );
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Header>맛집 목록</Header>
      <Content>
        <List>
          {/* {localData.map((item, idx) => (
            <li key={idx}>
              <Link to={`/map/${item.placeId}`}>{item.title}</Link>
            </li>
          ))} */}

          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="option1"
              name="철산동"
            />
            <label htmlFor="option1">철산동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="option2"
              name="광명동"
            />
            <label htmlFor="option2">광명동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="option3"
              name="하안동"
            />
            <label htmlFor="option3">하안동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="option4"
              name="소하동"
            />
            <label htmlFor="option4">소하동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="option5"
              name="일직동"
            />
            <label htmlFor="option5">일직동</label>
          </div>
        </List>
        <MapView>{loading ? null : <Map filter={filter} />}</MapView>
      </Content>
    </Wrapper>
  );
};

export default Home;
