import styled from "styled-components";
import VerticalList from "./VerticalList";
import IconButton from "../core/IconButton";
import closeIcon from "../../assets/icons/close.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { hideModal } from "../../reducers/modalReducer";

const ModalWrapper = styled(VerticalList)`
  justify-content: space-around;
  position: fixed;
  background-color: #555555cc;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  backdrop-filter: blur(1px);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const Modal = ({ children }: { children: React.ReactNode }) => {
  const visible = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  if (!visible) return null;

  return (
    <ModalWrapper $center>
      <CloseButton icon={closeIcon} onClick={() => dispatch(hideModal())} />
      {children}
    </ModalWrapper>
  );
};

export default Modal;
