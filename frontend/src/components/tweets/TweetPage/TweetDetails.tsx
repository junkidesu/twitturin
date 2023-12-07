import styled from "styled-components";
import RouterLink from "../../core/RouterLink";
import { pictures } from "../../../assets";
import { Tweet } from "../../../types";
import Box from "../../containers/Box";
import Label from "../../core/text/Label";
import lightTheme from "../../../themes/lightTheme";

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfilePicture = styled.img`
  width: 3em;
  height: 3em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const TweetDetails = ({ tweet }: { tweet: Tweet }) => {
  const submissionTime = new Date(tweet.createdAt);
  const editTime = new Date(tweet.updatedAt);
  const edited = editTime.valueOf() - submissionTime.valueOf() !== 0;

  return (
    <Box $bg="white" $horizontal $pad="l" $gap="1.5em" $width="500px">
      <RouterLink to={`/users/${tweet.author.id}`}>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </RouterLink>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.7em">
          <RouterLink $size="medium" $bold to={`/users/${tweet.author.id}`}>
            {tweet.author.fullName || "Twittur User"}
          </RouterLink>

          <UsernameLink $size="medium" to={`/users/${tweet.author.id}`}>
            @{tweet.author.username}
          </UsernameLink>
        </Box>

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
    </Box>
  );
};

export default TweetDetails;
