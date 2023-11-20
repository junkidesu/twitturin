import styled from "styled-components";
import { useState } from "react";
import VStack from "../../containers/VStack";
import HStack from "../../containers/HStack";
import TweetList from "../../tweets/TweetList";
import ReplyList from "../../replies/ReplyList";
import { Reply, Tweet } from "../../../types";

const NavButton = styled.button<{ $active: boolean }>`
  width: 100%;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.grey2};
  padding: 0.7em;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: transparent;
  border: none;
  border-radius: 0px;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey4};
    transition: 0.2s;
  }
`;

const TabWrapper = styled(VStack)`
  padding: 1em;
`;

interface Props {
  tweets: Tweet[];
  replies: Reply[];
}

const UserTabs = ({ tweets, replies }: Props) => {
  const [active, setActive] = useState<"tweets" | "replies">("tweets");

  return (
    <VStack $gap="0.5em">
      <HStack>
        <NavButton
          $active={active === "tweets"}
          onClick={() => setActive("tweets")}
        >
          Tweets
        </NavButton>
        <NavButton
          $active={active === "replies"}
          onClick={() => setActive("replies")}
        >
          Replies
        </NavButton>
      </HStack>

      <TabWrapper>
        {active === "tweets" && <TweetList tweets={tweets} />}

        {active === "replies" && <ReplyList replies={replies} />}
      </TabWrapper>
    </VStack>
  );
};

export default UserTabs;
