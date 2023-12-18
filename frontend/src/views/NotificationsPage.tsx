import Box from "../components/containers/Box";
import Empty from "../components/util/Empty";
import PageHeading from "../components/util/PageHeading";

const NotificationsPage = () => {
  return (
    <Box $width="500px" $gap="0.1em">
      <PageHeading label="Notifications" />

      <Empty />
    </Box>
  );
};

export default NotificationsPage;
