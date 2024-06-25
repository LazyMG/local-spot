import { useEffect } from "react";
import { Marker, NaverMap, useNavermaps } from "react-naver-maps";

const placeMarker = (title) => {
  return `<div class="Marker" >
  <div class="Marker__Bar"></div>
  <div class="Marker__Point-Profile">
    <div class="Marker__Point-Center"></div>
  </div>
  <div class="Marker__Container">
    <div class="Marker__Title">${title}</div>
  </div>
</div>`;
};

const SmallMap = ({ currentPlace }) => {
  const navermaps = useNavermaps();

  useEffect(() => {
    console.log(currentPlace);
  }, []);

  return (
    <NaverMap
      center={
        new navermaps.LatLng(
          currentPlace.coordinate?.lat,
          currentPlace.coordinate?.lng
        )
      }
      defaultZoom={17}
      draggable={false}
      scrollWheel={false}
    >
      <Marker
        defaultPosition={
          new navermaps.LatLng(
            currentPlace.coordinate?.lat,
            currentPlace.coordinate?.lng
          )
        }
        icon={{
          content: placeMarker(currentPlace?.name),
        }}
      ></Marker>
    </NaverMap>
  );
};

export default SmallMap;
