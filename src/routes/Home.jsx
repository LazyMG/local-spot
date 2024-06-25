// import { Link } from "react-router-dom";
import styled from "styled-components";
import Map from "./Map";
import { useCallback, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterState, isFilteredState, placeState } from "../atoms";
import { changeDayToKor } from "../utils/parsing";

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
  height: 800px;
  /* border: 1px solid black; */
`;

const Home = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const setPlace = useSetRecoilState(placeState);

  const getJson = useCallback(async () => {
    fetch("/restraunt_list.json")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPlace(data);
      })
      .catch((error) => console.error("Error loading local data:", error));
  }, [setPlace]);

  useEffect(() => {
    getJson();
  }, [getJson]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, [time]);

  useEffect(() => {
    setFilter({ local: [], menu: [], time: [] });
  }, [setFilter]);

  const onChange = (event, type) => {
    const { name, checked } = event.target;
    setLoading(true);
    if (checked) {
      if (type === "time") {
        const day = time.toString().split(" ")[0];
        const now = time.toString().split(" ")[4].substring(0, 5);
        const korDay = changeDayToKor(day);
        console.log(now);
        setFilter((prev) => ({ ...prev, [type]: [korDay, now] }));
      } else {
        setFilter((prev) => ({ ...prev, [type]: [...prev[type], name] }));
      }
    } else {
      if (type === "time") {
        setFilter((prev) => ({ ...prev, [type]: [] }));
      } else {
        setFilter((prev) => ({
          ...prev,
          [type]: prev[type].filter((el) => el !== name),
        }));
      }
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Header>맛집 목록</Header>
      <Content>
        <List>
          <div>
            <input
              onChange={(event) => onChange(event, "local")}
              type="checkbox"
              id="name1"
              name="철산"
            />
            <label htmlFor="name1">철산</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "local")}
              type="checkbox"
              id="name2"
              name="광명"
            />
            <label htmlFor="name2">광명</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "local")}
              type="checkbox"
              id="name4"
              name="하안"
            />
            <label htmlFor="name3">하안</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "local")}
              type="checkbox"
              id="name4"
              name="소하"
            />
            <label htmlFor="name4">소하</label>
          </div>
          <hr />
          <div>
            <input
              onChange={(event) => onChange(event, "menu")}
              type="checkbox"
              id="menu1"
              name="한식"
            />
            <label htmlFor="menu1">한식</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "menu")}
              type="checkbox"
              id="menu2"
              name="일식"
            />
            <label htmlFor="menu2">일식</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "menu")}
              type="checkbox"
              id="menu3"
              name="중식"
            />
            <label htmlFor="menu3">중식</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "menu")}
              type="checkbox"
              id="menu4"
              name="양식"
            />
            <label htmlFor="menu4">양식</label>
          </div>
          <div>
            <input
              onChange={(event) => onChange(event, "menu")}
              type="checkbox"
              id="menu5"
              name="주점"
            />
            <label htmlFor="menu5">주점</label>
          </div>
          <hr />
          <div>
            <input
              onChange={(event) => onChange(event, "time")}
              type="checkbox"
              id="time"
              name="영업중"
            />
            <label htmlFor="time">영업중</label>
            <br />
            {/* <label htmlFor="time">영업시간</label>
            <input
              name="영업시간"
              id="time"
              type="range"
              onChange={(event) => onChange(event, "time")}
            />
            <br />
            <span>{new Date().toLocaleTimeString()}</span>
            <br />
            <input
              type="range"
              id="temp"
              name="temp"
              list="markers"
              step="25"
              min="0"
              max="100"
            /> */}

            {/* <datalist id="markers">
              <option value="0"></option>
              <option value="25"></option>
              <option value="50"></option>
              <option value="75"></option>
              <option value="100"></option>
            </datalist> */}
          </div>
        </List>
        <MapView>{loading ? null : <Map filter={filter} />}</MapView>
        <PlaceContainer>
          <PlaceList />
        </PlaceContainer>
      </Content>
    </Wrapper>
  );
};

export default Home;
