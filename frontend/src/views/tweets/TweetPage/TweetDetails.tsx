import styled from "styled-components";
import RouterLink from "../../../components/core/RouterLink";
import { icons, pictures } from "../../../assets";
import { Tweet } from "../../../types";
import Box from "../../../components/containers/Box";
import Label from "../../../components/core/text/Label";
import lightTheme from "../../../themes/lightTheme";
import IconButton from "../../../components/core/buttons/IconButton";
import Card from "../../../components/containers/Card";

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfilePicture = styled.img`
  width: 3em;
  height: 3em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const HeaderWrapper = styled(Box)`
  align-items: space-between;
`;

const TweetHeader = ({ tweet }: { tweet: Tweet }) => {
  return (
    <HeaderWrapper $horizontal $center $width="100%">
      <Box $horizontal $gap="0.7em">
        <RouterLink $size="medium" $bold to={`/users/${tweet.author.id}`}>
          {tweet.author.fullName || "Twittur User"}
        </RouterLink>

        <UsernameLink $size="medium" to={`/users/${tweet.author.id}`}>
          @{tweet.author.username}
        </UsernameLink>
      </Box>

      <IconButton icon={<icons.MoreVerticalIcon />} />
    </HeaderWrapper>
  );
};

const TweetDetails = ({ tweet }: { tweet: Tweet }) => {
  const submissionTime = new Date(tweet.createdAt);
  const editTime = new Date(tweet.updatedAt);
  const edited = editTime.valueOf() - submissionTime.valueOf() !== 0;

  return (
    <Card $horizontal $gap="1.5em">
      <RouterLink to={`/users/${tweet.author.id}`}>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </RouterLink>

      <Box $gap="1em">
        <TweetHeader tweet={tweet} />

        <Label>{tweet.content}</Label>

        <Box $gap="0.4em">
          <Label
            $size="extraSmall"
            $color={lightTheme.colors.grey2}
            title={submissionTime.toString()}
          >
            Posted: {submissionTime.toLocaleString()}
          </Label>

          {edited && (
            <Label
              $size="extraSmall"
              $color={lightTheme.colors.grey2}
              title={editTime.toString()}
            >
              Last Edited: {editTime.toLocaleString()}
            </Label>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default TweetDetails;
