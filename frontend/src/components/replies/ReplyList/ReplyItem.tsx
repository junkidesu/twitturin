import { Reply } from "../../../types";
import styled from "styled-components";
import RouterLink from "../../core/RouterLink";
import { pictures } from "../../../assets";
import BorderedBox from "../../containers/BorderedBox";
import Box from "../../containers/Box";

interface Props {
  reply: Reply;
}

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const ReplyItem = ({ reply }: Props) => {
  return (
    <BorderedBox
      $horizontal
      $bg="white"
      $gap="1em"
      $pad="l"
      $rounded
      id={reply.id}
    >
      <RouterLink to={`/users/${reply.author.id}`}>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </RouterLink>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <RouterLink $bold to={`/users/${reply.author.id}`}>
            {reply.author.fullName || "Twittur User"}
          </RouterLink>

          <UsernameLink $size="extraSmall" to={`/users/${reply.author.id}`}>
            @{reply.author.username}
          </UsernameLink>
        </Box>

        <RouterLink to={`/tweets/${reply.tweet}/#${reply.id}`}>
          {reply.content}
        </RouterLink>
      </Box>
    </BorderedBox>
  );
};

export default ReplyItem;
