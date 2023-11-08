import styled from "styled-components";
import VerticalContainer from "./VerticalContainer";
import IconButton from "./IconButton";
import closeIcon from "../assets/close.svg";

const ModalWrapper = styled(VerticalContainer)`
  justify-content: space-around;
  position: fixed;
  background-color: #000000cc;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  backdrop-filter: blur(3px);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const Modal = ({
  children,
  visible,
  setVisible,
}: {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!visible) return null;

  return (
    <ModalWrapper>
      <CloseButton icon={closeIcon} onClick={() => setVisible(false)} />
      {children}
    </ModalWrapper>
  );
};

export default Modal;
