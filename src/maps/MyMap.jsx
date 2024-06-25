import { useEffect, useState } from "react";
import { Marker, NaverMap, useNavermaps } from "react-naver-maps";
import { useNavigate, useParams } from "react-router-dom";
import "../main.css";
import { useRecoilValue } from "recoil";
import { filteredPlacesState, isFilteredState, placeState } from "../atoms";
import PropTypes from "prop-types";

const defaultMarker = () => {
  return `<div class="Marker" >
  <div class="Marker__Bar"></div>
  <div class="Marker__Point-Profile">
    <div class="Marker__Point-Center"></div>
  </div>
</div>`;
};

const MyMap = ({ isDetail, centerLat, centerLng, zoom }) => {
  const navermaps = useNavermaps();
  const [loading, setLoading] = useState(true);
  const [myMarkers, setMyMarkers] = useState([]);
  const navigate = useNavigate();
  const filteredPlaces = useRecoilValue(filteredPlacesState);
  const isFiltered = useRecoilValue(isFilteredState);
  const [initialRender, setInitialRender] = useState(true);

  const places = useRecoilValue(placeState);

  useEffect(() => {
    setInitialRender(true);
    //console.log("latlng change");
  }, [centerLat, centerLng]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

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
      //console.log("mymap", myMarkers);
    }
  }, [myMarkers]);

  const onClick = (event) => {
    const [selectedPlace] = places.filter(
      (data) => data.name === event.overlay.title
    );
    const placeId = selectedPlace.id;
    navigate(`map/${placeId}`);
  };

  const toggleFunction = () => {
    setInitialRender(false);
    return new navermaps.LatLng(centerLat, centerLng);
  };

  return (
    <>
      <NaverMap
        center={initialRender ? toggleFunction : undefined}
        zoom={zoom}
        disableDoubleClickZoom={isDetail ? true : false}
        pinchZoom={isDetail ? false : true}
      >
        {loading
          ? null
          : myMarkers?.map((marker, idx) => (
              <Marker
                key={idx}
                defaultPosition={
                  new navermaps.LatLng(
                    marker.coordinate.lat,
                    marker.coordinate.lng
                  )
                }
                icon={{
                  content: defaultMarker(marker.name),
                }}
                title={marker.name}
                onClick={onClick}
              ></Marker>
            ))}
      </NaverMap>
    </>
  );
};

MyMap.propTypes = {
  centerLat: PropTypes.number,
  centerLng: PropTypes.number,
  zoom: PropTypes.number,
  isDetail: PropTypes.bool,
};

export default MyMap;
