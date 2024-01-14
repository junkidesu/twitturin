import Box from "../components/containers/Box";
import PageHeading from "../components/util/PageHeading";
import Empty from "../components/util/Empty";

const MessagesPage = () => {
  return (
    <Box $width="500px" $gap="0.1em">
      <PageHeading label="Messages" />

      <Empty />
    </Box>
  );
};

export default MessagesPage;
