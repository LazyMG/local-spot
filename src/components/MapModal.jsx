import { useEffect, useRef } from "react";
import styled from "styled-components";
import Map from "../routes/Map";
import SmallMap from "../maps/SmallMap";
import ModalMap from "../maps/ModalMap";

const Wrapper = styled.div`
  z-index: 1200;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 /71%);
  display: flex;
  justify-content: center;
  align-items: center;
  //padding: 20px 0;
`;

const Modal = styled.div`
  position: relative;
  max-width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: white;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  //animation: fadeIn 400ms;

  width: 600px;
  height: 400px;

  border: 1px solid blue;

  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }
`;

const ModalContent = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
  //background-color: yellow;
`;

const MapBottom = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const MapBottomButton = styled.div`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  color: black;

  cursor: pointer;
`;

const MapModal = ({ setModalOpen, currentPlace }) => {
  const ref = useRef();

  const handler = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  return (
    <Wrapper role="presentation">
      <WrapperModal className="wrapper-modal">
        <Modal ref={ref}>
          <ModalContent>
            <ModalMap currentPlace={currentPlace} />
            <MapBottom>
              <MapBottomButton onClick={() => setModalOpen(false)}>
                닫기
              </MapBottomButton>
            </MapBottom>
          </ModalContent>
        </Modal>
      </WrapperModal>
    </Wrapper>
  );
};

export default MapModal;
