import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontSizes: {
      extraSmall: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    colors: {
      primary: string;
      secondary: string;
      third: string;
      background: string;
      grey1: string;
      grey2: string;
      grey3: string;
      grey4: string;
    };
  }
}
