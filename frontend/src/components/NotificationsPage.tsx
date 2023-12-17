import Box from "./containers/Box";
import Heading from "./core/text/Heading";
import Empty from "./util/Empty";

const Header = () => {
  return (
    <Box $bg="white" $pad="l">
      <Heading $level={2}>Notifications</Heading>
    </Box>
  );
};

const NotificationsPage = () => {
  return (
    <Box $width="500px" $gap="0.1em">
      <Header />

      <Empty />
    </Box>
  );
};

export default NotificationsPage;
