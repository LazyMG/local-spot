import { NavermapsProvider } from "react-naver-maps";
import { Container as MapDiv } from "react-naver-maps";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { center, newLocalData } from "../utils/tempData";
import { calculateCenter } from "../utils/parsing";
import { filteredPlacesState, isFilteredState } from "../atoms";
import MyMap from "../maps/MyMap";

const Map = () => {
  const { placeId } = useParams();
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);
  const [zoom, setZoom] = useState(20);
  const [loading, setLoading] = useState(true);
  const filteredPlaces = useRecoilValue(filteredPlacesState);
  const isFiltered = useRecoilValue(isFilteredState);

  useEffect(() => {
    setLoading(true);

    if (!placeId) {
      if (!isFiltered) {
        setCenterLat(center.lat);
        setCenterLng(center.lng);
        setZoom(13);
      } else {
        const { centerLat: avgLat, centerLng: avgLng } = calculateCenter(
          filteredPlaces
        );
        setCenterLat(avgLat);
        setCenterLng(avgLng);
        setZoom(12.5);
      }
      if (centerLat !== 0 && centerLng !== 0) setLoading(false);
      return;
    }
    const id = +placeId;

    setCenterLat(newLocalData[id].lat);
    setCenterLng(newLocalData[id].lng);

    if (centerLat !== 0 && centerLng !== 0) setLoading(false);
  }, [centerLat, centerLng, placeId, filteredPlaces, isFiltered]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <NavermapsProvider ncpClientId="b35d4kyq3s">
          <MapDiv
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <MyMap centerLat={centerLat} centerLng={centerLng} zoom={zoom} />
          </MapDiv>
        </NavermapsProvider>
      )}
    </>
  );
};

// filter props의 PropTypes를 정의합니다.
Map.propTypes = {
  filter: PropTypes.shape({
    local: PropTypes.arrayOf(PropTypes.string),
    menu: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Map;
