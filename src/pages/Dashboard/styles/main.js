import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        font-size: 16px;
        font-family: "Inter", sans-serif;
        background-color: ${({theme})=> theme.body };
        color: ${({theme})=> theme.color };

        a {
            text-decoration: none;
            color: ${({theme})=> theme.color };
        }
    }
`;

export const lightTheme = {
    body: "#111",
    background: "black",
    color: "white",
    borderColor: "dimgray",

    btnBackground: "white",
    btnColor: "black",

    activeBar: "black"
}

export const darkTheme = {
    body: "#fafafa",
    background: "white",
    color: "black",
    borderColor: "#D8D8D7",

    btnBackground: "black",
    btnColor: "white",

    activeBar: "white"
}