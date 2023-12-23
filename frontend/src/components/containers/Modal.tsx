import styled from "styled-components";
import IconButton from "../core/buttons/IconButton";
import { icons } from "../../assets";
import { useAppSelector } from "../../hooks/store";
import Box from "./Box";
import useModal from "../../hooks/useModal";

const ModalBox = styled(Box)`
  justify-content: space-around;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  backdrop-filter: blur(1px);
`;

const CloseButton = styled(IconButton)`
  color: white;
  position: absolute;
  top: 1em;
  right: 1em;
`;

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const visible = useAppSelector((state) => state.modal);
  const { hideModal } = useModal();

  if (!visible) return null;

  return (
    <ModalBox $bg="#333333cc" $center>
      <CloseButton icon={<icons.CloseIcon />} onClick={() => hideModal()} />
      {children}
    </ModalBox>
  );
};

export default Modal;
