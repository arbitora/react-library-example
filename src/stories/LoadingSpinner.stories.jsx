import React from "react"
import LoadingSpinner from "../components/LoadingSpinner"

export default {
    title: "Components/LoadingSpinner",
    component: LoadingSpinner
}

const Template = (args) => <LoadingSpinner {...args} />

export const Spinner = Template.bind({})
Spinner.args = {
    enabled: true
}
