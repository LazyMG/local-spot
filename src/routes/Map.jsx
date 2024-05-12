import { NavermapsProvider } from "react-naver-maps";
import MyMap from "../maps/MyMap";
import { Container as MapDiv } from "react-naver-maps";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { center, localData } from "../utils/tempData";
import { calculateCenter } from "../utils/parsing";
import PropTypes from "prop-types";

const Map = ({ filter }) => {
  const { placeId } = useParams();
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);
  const [zoom, setZoom] = useState(20);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState(localData);

  useEffect(() => {
    setLoading(true);

    if (!placeId) {
      if (filter?.length === 0) {
        setCenterLat(center.lat);
        setCenterLng(center.lng);
        setZoom(12);
      } else {
        const { centerLat: avgLat, centerLng: avgLng } = calculateCenter(
          markers,
          filter
        );
        setCenterLat(avgLat);
        setCenterLng(avgLng);
        if (filter.length === 1) setZoom(16);
        else setZoom(12.5);
      }
      if (centerLat !== 0 && centerLng !== 0) setLoading(false);
      return;
    }
    const id = +placeId;

    setCenterLat(localData[id].lat);
    setCenterLng(localData[id].lng);

    if (centerLat !== 0 && centerLng !== 0) setLoading(false);
  }, [centerLat, centerLng, placeId, filter, markers]);

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
              markers={markers}
              filter={filter}
            />
          </MapDiv>
        </NavermapsProvider>
      )}
    </>
  );
};

// filter props의 PropTypes를 정의합니다.
Map.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string),
};

export default Map;
