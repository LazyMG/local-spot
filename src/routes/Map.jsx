import { NavermapsProvider } from "react-naver-maps";
import MyMap from "../maps/MyMap";
import { Container as MapDiv } from "react-naver-maps";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { data } from "../utils/tempData";

const Map = () => {
  const { placeId } = useParams();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = +placeId;

    setLat(data[id].lat);
    setLng(data[id].lng);

    if (lat !== 0 && lng !== 0) setLoading(false);
  }, [lat, lng, placeId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <NavermapsProvider ncpClientId="b35d4kyq3s">
          <MapDiv
            style={{
              width: "100%",
              height: "600px",
            }}
          >
            <MyMap lat={lat} lng={lng} />
          </MapDiv>
          ;
        </NavermapsProvider>
      )}
    </>
  );
};

export default Map;
