import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#24C16B", // green
    secondary: "#F0F0F0",   // dark green
    white: "#FFFFFF",
    black: "#000000",
    blackLighten:"#4d4d4d",
    blackLighten2: "#262626",

    Red: "#F44336",
    lightRed: "#EF5350",
    darkRed: "#B71C1C",
    accentRed: "#D50000",

    Pink: "#E91E63",
    lightPink: "#EC407A",
    darkPink: "#880E4F",
    accentPink: "#C51162",

    Purple: "#9C27B0",
    lightPurple: "#AB47BC",
    darkPurple: "#4A148C",
    accentPurple: "#AA00FF",

    Indigo: "#3F51B5",
    lightIndigo: "#5C6BC0",
    darkIndigo: "#1A237E",
    accentIndigo: "#304FFE",

    Blue: "#2196F3",
    lightBlue: "#42A5F5",
    darkBlue: "#0D47A1",
    accentBlue: "#2962FF",

    Cyan: "#00BCD4",
    lightCyan: "#26C6DA",
    darkCyan: "#006064",
    accentCyan: "#00B8D4",

    Teal: "#009688",
    lightTeal: "#26A69A",
    darkTeal: "#004D40",
    accentTeal: "#00BFA5",

    Green: "#4CAF50",
    lightGreen: "#66BB6A",
    darkGreen: "#1B5E20",
    accentGreen: "#00C853",

    Lime: "#CDDC39",
    lightLime: "#D4E157",
    darkLime: "#827717",
    accentLime: "#AEEA00",

    Yellow: "#FFEB3B",
    lightYellow: "#FFEE58",
    darkYellow: "#F57F17",
    accentYellow: "#FFD600",

    Amber: "#FFC107",
    lightAmber: "#FFCA28",
    darkAmber: "#FF6F00",
    accentAmber: "#FFAB00",

    Orange: "#FF9800",
    lightOrange: "#FFA726",
    darkOrange: "#E65100",
    accentOrange: "#FF6D00",

    Grey: "#9E9E9E",
    lightGrey: "#EAEAEA",
    darkGrey: "#212121",

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 20,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;