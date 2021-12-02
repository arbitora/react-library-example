import React from "react"
import { ThemeProvider } from "@mui/material"
import LoadingSpinner from "../components/LoadingSpinner"
import useThemeHook from "../hooks/useThemeHook"
export default {
    title: "Components/LoadingSpinner",
    component: LoadingSpinner,
    decorators: [
        (Story) => (
            <ThemeProvider theme={useThemeHook()}>
                <Story></Story>
            </ThemeProvider>
        )
    ]
}

const Template = (args) => <LoadingSpinner {...args} />

export const Spinner = Template.bind({})
Spinner.args = {
    enabled: true
}
