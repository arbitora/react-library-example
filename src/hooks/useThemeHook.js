import { createTheme } from "@mui/material"

const useThemeHook = () => {
    let customTheme = {
        palette: {
            mode: "dark",
            primary: {
                main: "#C536B9"
            },
            secondary: {
                main: "#FDC864"
            }
        },
        typography: {
            fontFamily: ["Montserrat"].join(",")
        }
    }

    return createTheme(customTheme)
}

export default useThemeHook
