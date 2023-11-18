import NewTweetForm from "./NewTweetForm";
import Modal from "./lists/Modal";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTweetModal = ({ visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <NewTweetForm />
    </Modal>
  );
};

export default NewTweetModal;
