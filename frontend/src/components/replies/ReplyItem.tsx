import { Reply } from "../../types";
import styled from "styled-components";
import RouterLink from "../core/RouterLink";
import emptyProfilePicture from "../../assets/images/empty-profile-picture.png";
import VerticalList from "../lists/VerticalList";
import HorizontalList from "../lists/HorizontalList";

interface Props {
  reply: Reply;
}

const Wrapper = styled(HorizontalList)`
  display: flex;
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-radius: 5px;
  padding: 1em;
`;

const FullName = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey1};
  font-weight: bold;
`;

const Username = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const Body = styled(VerticalList)`
  padding-left: 1em;
  gap: 1em;
`;

const ReplyItem = ({ reply }: Props) => {
  return (
    <Wrapper>
      <RouterLink to={`/users/${reply.author.id}`}>
        <ProfilePicture src={emptyProfilePicture} />
      </RouterLink>

      <Body>
        <HorizontalList $center $gap="0.5em">
          <FullName to={`/users/${reply.author.id}`}>
            {reply.author.fullName || "Twittur User"}
          </FullName>

          <Username to={`/users/${reply.author.id}`}>
            @{reply.author.username}
          </Username>
        </HorizontalList>

        <div>{reply.content}</div>
      </Body>
    </Wrapper>
  );
};

export default ReplyItem;
