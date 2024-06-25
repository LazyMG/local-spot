import { NavermapsProvider } from "react-naver-maps";
import { Container as MapDiv } from "react-naver-maps";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { center } from "../utils/tempData";
import { calculateCenter } from "../utils/parsing";
import { filteredPlacesState, isFilteredState, placeState } from "../atoms";
import MyMap from "../maps/MyMap";

const Map = ({ defaultZoom = 17 }) => {
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);
  const [zoom, setZoom] = useState(defaultZoom);
  const [loading, setLoading] = useState(true);
  const filteredPlaces = useRecoilValue(filteredPlacesState);
  const isFiltered = useRecoilValue(isFilteredState);
  const places = useRecoilValue(placeState);

  const [isDetail, setIsDetail] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (!isFiltered) {
      setCenterLat(center.lat);
      setCenterLng(center.lng);
      setZoom(13);
    } else {
      const { centerLat: avgLat, centerLng: avgLng } = calculateCenter(
        filteredPlaces
      );
      console.log("filter lat", avgLat);
      console.log("filter lmg", avgLng);

      setCenterLat(avgLat);
      setCenterLng(avgLng);
      setZoom(12.5);
    }
    if (centerLat !== 0 && centerLng !== 0) setLoading(false);
    setIsDetail(false);
  }, [centerLat, centerLng, filteredPlaces, isFiltered, places]);

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
            <MyMap
              centerLat={centerLat}
              centerLng={centerLng}
              zoom={zoom}
              isDetail={isDetail}
            />
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
  defaultZoom: PropTypes.number,
};

export default Map;
