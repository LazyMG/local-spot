import {
  Marker,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
  Container as MapDiv,
} from "react-naver-maps";

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

const ModalMap = ({ currentPlace }) => {
  const navermaps = useNavermaps();

  return (
    <NavermapsProvider ncpClientId="b35d4kyq3s">
      <MapDiv
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <NaverMap
          center={
            new navermaps.LatLng(
              currentPlace.coordinate?.lat,
              currentPlace.coordinate?.lng
            )
          }
          zoom={18}
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
      </MapDiv>
    </NavermapsProvider>
  );
};

export default ModalMap;
