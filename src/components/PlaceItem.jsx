import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 15px;

  cursor: pointer;
`;

const Header = styled.div``;

const Title = styled.div``;

const Address = styled.div``;

const PlaceItem = ({ place }) => {
  const navigate = useNavigate();

  const onClick = (placeId) => {
    navigate(`map/${placeId}`);
  };

  return (
    <Wrapper onClick={() => onClick(place.placeId)}>{place.title}</Wrapper>
  );
};

PlaceItem.propTypes = {
  place: PropTypes.shape({
    placeId: PropTypes.number,
    title: PropTypes.string,
    address: PropTypes.string,
    local: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    type: PropTypes.shape({
      main: PropTypes.string,
      detail: PropTypes.string,
    }),
  }),
};

export default PlaceItem;
