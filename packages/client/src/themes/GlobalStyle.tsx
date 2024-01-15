import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        position: relative;
        padding: 0;
        margin: 0;
        font-family: sans-serif;
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.grey1};
    }
`;

export default GlobalStyle;
