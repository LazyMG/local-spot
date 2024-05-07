import { Marker, NaverMap, useNavermaps } from "react-naver-maps";

const MyMap = ({ lat, lng }) => {
  const navermaps = useNavermaps();

  return (
    <>
      <NaverMap defaultCenter={new navermaps.LatLng(lat, lng)} defaultZoom={20}>
        {/* <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} /> */}
        <Marker defaultPosition={new navermaps.LatLng(lat, lng)} />
      </NaverMap>
    </>
  );
};

export default MyMap;
