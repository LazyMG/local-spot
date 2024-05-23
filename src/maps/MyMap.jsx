import { useEffect, useState } from "react";
import { Marker, NaverMap, useNavermaps } from "react-naver-maps";
import { useNavigate, useParams } from "react-router-dom";
import "../main.css";
import { newLocalData } from "../utils/tempData";
import { useRecoilValue } from "recoil";
import { filteredPlacesState, isFilteredState } from "../atoms";
import PropTypes from "prop-types";

// const obj = (title) => {
//   return `<div class="Marker" >
//   <div class="Marker__Bar"></div>
//   <div class="Marker__Point-Profile">
//     <div class="Marker__Point-Center"></div>
//   </div>
//   <div class="Marker__Container">
//     <div class="Marker__Title">${title}</div>
//   </div>
// </div>`;
// };

const obj = (title) => {
  return `<div class="Marker" >
  <div class="Marker__Bar"></div>
  <div class="Marker__Point-Profile">
    <div class="Marker__Point-Center"></div>
  </div>
</div>`;
};

const MyMap = ({ centerLat, centerLng, zoom }) => {
  const navermaps = useNavermaps();
  const { placeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [myMarkers, setMyMarkers] = useState([]);
  const navigate = useNavigate();
  const filteredPlaces = useRecoilValue(filteredPlacesState);
  const isFiltered = useRecoilValue(isFilteredState);

  useEffect(() => {
    if (isFiltered) {
      setLoading(true);
      setMyMarkers(filteredPlaces);
    } else {
      setMyMarkers(filteredPlaces);
      setLoading(false);
    }
  }, [filteredPlaces, isFiltered]);

  useEffect(() => {
    if (myMarkers.length > 0) {
      setLoading(false);
    }
  }, [myMarkers]);

  const onClick = (event) => {
    const [selectedPlace] = newLocalData.filter(
      (data) => data.title === event.overlay.title
    );
    const placeId = selectedPlace.placeId;
    navigate(`map/${placeId}`);
  };

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
              icon={{
                content: obj(marker.title),
              }}
              title={marker.title}
              onClick={onClick}
            ></Marker>
          ))
        )}
      </NaverMap>
    </>
  );
};

MyMap.propTypes = {
  centerLat: PropTypes.number,
  centerLng: PropTypes.number,
  zoom: PropTypes.number,
};

export default MyMap;
