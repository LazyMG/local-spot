import { Container } from "react-naver-maps";
import MyMap from "./MyMap";

const NaverMapContainer = () => {
  return (
    <Container style={{ width: "100%", height: "100%", marginTop: "-30px" }}>
      <MyMap />
    </Container>
  );
};

export default NaverMapContainer;
