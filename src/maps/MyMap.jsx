import { useEffect, useState } from "react";
import { Marker, NaverMap, useNavermaps } from "react-naver-maps";
import { filteringMarker } from "../utils/parsing";
import { useParams } from "react-router-dom";

const MyMap = ({ centerLat, centerLng, markers, zoom, filter }) => {
  const navermaps = useNavermaps();
  const { placeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [myMarkers, setMyMarkers] = useState([]);

  console.log(centerLat, centerLng, zoom);

  useEffect(() => {
    if (filter) {
      setLoading(true);
      setMyMarkers(filteringMarker(markers, filter));
    } else {
      setLoading(false);
    }
  }, [filter, markers]);

  useEffect(() => {
    if (myMarkers.length > 0) {
      setLoading(false);
    }
  }, [myMarkers]);

  return (
    <>
      <NaverMap center={new navermaps.LatLng(centerLat, centerLng)} zoom={zoom}>
        {loading ? null : placeId ? (
          <Marker
            defaultPosition={new navermaps.LatLng(centerLat, centerLng)}
          ></Marker>
        ) : (
          myMarkers?.map((marker, idx) => (
            <Marker
              key={idx}
              defaultPosition={new navermaps.LatLng(marker.lat, marker.lng)}
            ></Marker>
          ))
        )}
      </NaverMap>
    </>
  );
};

export default MyMap;
