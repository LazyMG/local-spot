import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import MapModal from "../components/MapModal";
import SmallMap from "../maps/SmallMap";
import { NavermapsProvider, Container as MapDiv } from "react-naver-maps";
import { getTodayDay } from "../utils/parsing";

const Wrapper = styled.div`
  width: 100%;
  //height: 100vh;
  background-color: #b7b7b7;
  padding: 0 400px;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1.5fr;
  gap: 5px;
  width: 100%;
  //height: 100%;
`;

const MainContentContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContent = styled.div`
  width: 100%;
  //height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MainContentImg = styled.div`
  width: 100%;
  background-color: orange;
  height: 300px;
`;

const MainContentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContentTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainContentTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const MainContentText = styled.div``;

const MainContentTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MainContentTimeTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainContentTimeTopToday = styled.div``;

const MainContentTimeTopBusiness = styled.div``;

const SideContentContainer = styled.div`
  //background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SideContent = styled.div`
  padding: 10px;

  width: 100%;
  height: 250px;
  background-color: white;
  border-radius: 10px;
`;

const timePattern = /\d{2}:\d{2}\s*-\s*\d{2}:\d{2}/;
const CLOSED = "정기 휴무";

function extractTimeFormat(inputString) {
  const match = inputString.match(timePattern);
  if (match) return `영업시간 : ${match[0]}`;
  if (inputString === CLOSED) return CLOSED;
  return "Error";
}

const Place = () => {
  const { placeId } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState({});
  const [loading, setLoading] = useState(true);

  const handleClick = () => setModalOpen(true);

  const getPlace = useCallback(async () => {
    fetch("/restraunt_list.json")
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlace(data[placeId]);
        setLoading(false);
      })
      .catch((error) => console.error("Error loading local data:", error));
  }, [placeId]);

  useEffect(() => {
    getPlace();
  }, [getPlace]);

  return (
    <Wrapper>
      <ContentContainer>
        <MainContentContainer>
          <MainContent>
            <MainContentImg />
            <MainContentRow>
              <MainContentTitleRow>
                <MainContentTitle>{currentPlace?.name}</MainContentTitle>
              </MainContentTitleRow>
              <MainContentText>{currentPlace?.local}</MainContentText>
              <MainContentText>주요 메뉴</MainContentText>
              <MainContentText>{currentPlace?.address}</MainContentText>
              <MainContentText>{currentPlace?.phone_number}</MainContentText>
            </MainContentRow>
          </MainContent>
          <MainContent>
            <MainContentTitleRow>
              <MainContentTitle>영업시간</MainContentTitle>
            </MainContentTitleRow>
            {!loading && (
              <MainContentTime>
                {Array.from({ length: 7 }).map((_, idx) => (
                  <MainContentTimeTop key={idx}>
                    <MainContentTimeTopToday>
                      {getTodayDay(idx)}
                    </MainContentTimeTopToday>
                    <MainContentTimeTopBusiness>
                      {extractTimeFormat(
                        currentPlace?.business_hours[getTodayDay(idx)]
                      )}
                    </MainContentTimeTopBusiness>
                  </MainContentTimeTop>
                ))}
              </MainContentTime>
            )}
            <MainContentTitleRow>
              <MainContentTitle>메뉴정보</MainContentTitle>
            </MainContentTitleRow>
          </MainContent>
          <MainContent></MainContent>
        </MainContentContainer>
        <SideContentContainer>
          <SideContent onClick={handleClick}>
            <NavermapsProvider ncpClientId="b35d4kyq3s">
              <MapDiv
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {!loading && <SmallMap currentPlace={currentPlace} />}
              </MapDiv>
            </NavermapsProvider>
          </SideContent>
          <SideContent></SideContent>
        </SideContentContainer>
      </ContentContainer>
      {modalOpen && (
        <MapModal currentPlace={currentPlace} setModalOpen={setModalOpen} />
      )}
    </Wrapper>
  );
};

export default Place;
