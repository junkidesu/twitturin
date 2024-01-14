import styled from "styled-components";
import RouterLink from "../../../components/core/RouterLink";
import { icons, pictures } from "../../../assets";
import { Tweet } from "../../../types";
import Box from "../../../components/containers/Box";
import Label from "../../../components/core/text/Label";
import lightTheme from "../../../themes/lightTheme";
import IconButton from "../../../components/core/buttons/IconButton";
import Card from "../../../components/containers/Card";
import Menu from "../../../components/core/Menu";
import HiddenItems from "../../../components/core/Menu/HiddenItems";
import FlatButton from "../../../components/core/buttons/FlatButton";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/store";
import { useNavigate } from "react-router-dom";
import { useDeleteTweetMutation } from "../../../services/tweetsService";
import useLoadingStripe from "../../../hooks/useLoadingStripe";
import useAlert from "../../../hooks/useAlert";

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
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const TweetMenuWrapper = styled(Box)`
  position: absolute;
  right: 0px;
  top: 0px;
`;

const RemoveButton = styled(FlatButton)`
  color: #ff0037;

  &:hover {
    color: #ff0037;
  }
`;

const TweetMenu = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const { errorAlert } = useAlert();
  const [deleteTweet] = useDeleteTweetMutation();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this tweet?")) {
      showLoadingStripe();

      try {
        await deleteTweet(tweet).unwrap();
        navigate("/");
      } catch (error) {
        errorAlert(error);
      }

      hideLoadingStripe();
    }
  };

  return (
    <TweetMenuWrapper>
      <Menu>
        <IconButton
          icon={<icons.MoreVerticalIcon />}
          onClick={() => setVisible(!visible)}
        />

        {visible && (
          <HiddenItems>
            <FlatButton
              icon={<icons.EditIcon />}
              label="Edit"
              onClick={() => navigate(`/tweets/${tweet.id}/edit`)}
            />
            <RemoveButton
              icon={<icons.RemoveIcon />}
              label="Remove"
              onClick={handleDelete}
            />
          </HiddenItems>
        )}
      </Menu>
    </TweetMenuWrapper>
  );
};

const TweetHeader = ({ tweet }: { tweet: Tweet }) => {
  const userId = useAppSelector(({ auth }) => auth.id);

  const isTweetAuthor = tweet.author.id === userId;

  return (
    <HeaderWrapper $horizontal $width="100%">
      <Box $horizontal $gap="0.7em">
        <RouterLink $size="medium" $bold to={`/users/${tweet.author.id}`}>
          {tweet.author.fullName || "Twittur User"}
        </RouterLink>

        <UsernameLink $size="medium" to={`/users/${tweet.author.id}`}>
          @{tweet.author.username}
        </UsernameLink>
      </Box>

      {isTweetAuthor && <TweetMenu tweet={tweet} />}
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
        <ProfilePicture
          src={tweet.author.profilePicture || pictures.emptyProfilePicture}
        />
      </RouterLink>

      <Box $gap="1em" $width="100%">
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
