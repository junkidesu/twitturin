import { useFilePicker } from "use-file-picker";
import Box from "../containers/Box";
import styled from "styled-components";
import { pictures } from "../../assets";
import Button from "./buttons/Button";

const ChosenImage = styled.img`
  width: 8em;
  height: 8em;
  border-radius: 4em;
`;

const ImagePicker = () => {
  const { openFilePicker, plainFiles, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  return (
    <Box $width="500px" $bg="white" $center $pad="l" $gap="1em">
      <ChosenImage
        src={
          plainFiles.length === 0 || filesContent.length === 0
            ? pictures.emptyProfilePicture
            : filesContent[0].content
        }
      />

      <Box $horizontal $width="100%" $gap="1em">
        <Button $width="100%" onClick={() => openFilePicker()}>
          Choose
        </Button>
        <Button $width="100%" $fg="red" onClick={() => clear()}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default ImagePicker;
