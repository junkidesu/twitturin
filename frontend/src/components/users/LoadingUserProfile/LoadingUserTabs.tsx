import styled from "styled-components";
import { useState } from "react";
import VBox from "../../containers/VBox";
import HBox from "../../containers/HBox";
import LoadingTweetList from "../../tweets/LoadingTweetList";
import LoadingReplyList from "../../replies/LoadingReplyList";

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

const TabWrapper = styled(VBox)`
  padding: 1em;
`;

const LoadingUserTabs = () => {
  const [active, setActive] = useState<"tweets" | "replies">("tweets");

  return (
    <VBox $gap="0.5em">
      <HBox>
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
      </HBox>

      <TabWrapper>
        {active === "tweets" && <LoadingTweetList />}

        {active === "replies" && <LoadingReplyList />}
      </TabWrapper>
    </VBox>
  );
};

export default LoadingUserTabs;
