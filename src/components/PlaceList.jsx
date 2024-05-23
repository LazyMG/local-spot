import { useRecoilValue } from "recoil";
import { filteredPlacesState } from "../atoms";
import styled from "styled-components";
import PlaceItem from "./PlaceItem";

const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  //background-color: red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  overflow-y: scroll;
`;

const PlaceList = () => {
  const places = useRecoilValue(filteredPlacesState);

  return (
    <Wrapper>
      <ListContainer>
        {places.map((place) => (
          <PlaceItem key={place.placeId} place={place} />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default PlaceList;
