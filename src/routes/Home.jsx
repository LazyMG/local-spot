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
  grid-template-columns: 0.5fr 1.5fr 1fr;
  height: 100%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
`;

const MapView = styled.div`
  width: 100%;
  height: 100%;
`;

const PlaceContainer = styled.div`
  //background-color: red;
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
              id="name1"
              name="철산동"
            />
            <label htmlFor="name1">철산동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="name2"
              name="광명동"
            />
            <label htmlFor="name2">광명동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="name3"
              name="하안동"
            />
            <label htmlFor="name3">하안동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="name4"
              name="소하동"
            />
            <label htmlFor="name4">소하동</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type="checkbox"
              id="name5"
              name="일직동"
            />
            <label htmlFor="name5">일직동</label>
          </div>
          <hr />
          <div>
            <input type="checkbox" id="menu1" name="한식" />
            <label htmlFor="menu1">한식</label>
          </div>
          <div>
            <input type="checkbox" id="menu2" name="일식" />
            <label htmlFor="menu2">일식</label>
          </div>
          <div>
            <input type="checkbox" id="menu3" name="중식" />
            <label htmlFor="menu3">중식</label>
          </div>
          <div>
            <input type="checkbox" id="menu4" name="양식" />
            <label htmlFor="menu4">양식</label>
          </div>
          <div>
            <input type="checkbox" id="menu5" name="주점" />
            <label htmlFor="menu5">주점</label>
          </div>
        </List>
        <MapView>{loading ? null : <Map filter={filter} />}</MapView>
        <PlaceContainer></PlaceContainer>
      </Content>
    </Wrapper>
  );
};

export default Home;
