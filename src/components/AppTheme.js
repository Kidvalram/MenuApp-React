import { createTheme } from '@material-ui/core/styles';

const appHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
};

const appTheme = createTheme({
    size: {
        height: appHeight,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 767,
        md: 768,
        lg: 992,
        xl: 1920
      },
    },
    
    colors: {
        primary: {
            rich_black: "#161C26 !important",
            alabaster: "#E9E4DA !important"
        },
        secondary:{
            golden_brown: "#9E692F !important",
            cultured: "#F7F6F6 !important",
            smoky_black: "#221816 !important",
            silver: "C4C4C4 !important",
            sonic_silver: "787878 !important"
        },
        button:{
            light_background: "rgba(196,196,196,60%)"
        }
    },
    button:{
        width: "100% !important",
        border_radius: "10px !important",
        font_family: "WorkSans",
        font_weight: "bold",
        background_color: "rgba(196,196,196,19%) !important",
        dark_background_color: "rgba(107,107,107,19%) !important",
        category: {
            size_font: {
                values: {
                    xs: "3.8vw !important",
                    sm: "3.8vw !important",
                    md: "3.5vw !important",
                    lg: "3vh !important",
                },
            },
            height: {
                values: {
                    xs: "5vh !important",
                    sm: "5vh !important",
                    md: "5vh !important",
                    lg: "4vh !important",
                },
            } 
        }
    }
});

export default appTheme;