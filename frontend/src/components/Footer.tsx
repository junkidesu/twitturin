import styled from "styled-components";
import { icons } from "../assets";
import IconButton from "./core/buttons/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./containers/Card";

const Wrapper = styled(Card).attrs({ $horizontal: true })`
  width: 100%;
  padding: 0;
  position: fixed;
  bottom: 0px;
  justify-content: space-around;

  @media (min-width: 650px) {
    display: none;
  }
`;

const NavButton = styled(IconButton)<{ $active: boolean }>`
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.grey2};
  stroke-width: ${({ $active }) => ($active ? 5 : 2)};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.grey4 : "transparent"};
  border-radius: 0;
`;

type Page = "home" | "explore" | "messages" | "me";

const Footer = () => {
  const [page, setPage] = useState<Page>("home");
  const navigate = useNavigate();

  const goToPage = (page: Page) => () => {
    setPage(page);
    navigate(`/${page}`);
  };

  return (
    <Wrapper>
      <NavButton
        icon={<icons.HomeIcon />}
        $vertical
        $active={page === "home"}
        onClick={goToPage("home")}
      />
      <NavButton
        icon={<icons.SearchIcon />}
        $vertical
        $active={page === "explore"}
        onClick={goToPage("explore")}
      />
      <NavButton
        icon={<icons.MailIcon />}
        $vertical
        $active={page === "messages"}
        onClick={goToPage("messages")}
      />
      <NavButton
        icon={<icons.UserIcon />}
        $vertical
        $active={page === "me"}
        onClick={goToPage("me")}
      />
    </Wrapper>
  );
};

export default Footer;
