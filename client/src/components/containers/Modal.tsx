import styled from "styled-components";
import VerticalContainer from "./VerticalContainer";
import IconButton from "../core/IconButton";
import closeIcon from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";

const ModalWrapper = styled(VerticalContainer)`
  justify-content: space-around;
  position: fixed;
  background-color: #555555cc;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const Modal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <ModalWrapper $center>
      <CloseButton icon={closeIcon} onClick={() => navigate("/")} />
      {children}
    </ModalWrapper>
  );
};

export default Modal;
