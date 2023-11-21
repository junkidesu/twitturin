import styled from "styled-components";
import VBox from "./VBox";
import IconButton from "../core/IconButton";
import { icons } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { hideModal } from "../../reducers/modalReducer";

const ModalWrapper = styled(VBox)`
  justify-content: space-around;
  position: fixed;
  background-color: #333333cc;
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
      <CloseButton icon={icons.closeIcon} onClick={() => dispatch(hideModal())} />
      {children}
    </ModalWrapper>
  );
};

export default Modal;
