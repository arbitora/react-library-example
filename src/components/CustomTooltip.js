import React from "react"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"

const RawCustomTooltip = (props) => {
    const { children, value, placement } = props

    let valueToShow = value
    if (typeof value === "object") {
        if (value.text != null) {
            valueToShow = value.text
        } else if (value.label != null) {
            valueToShow = value.label
        } else {
            valueToShow = value.value
        }
    }

    return (
        <Tooltip placement={placement} title={valueToShow} {...props}>
            {children}
        </Tooltip>
    )
}

RawCustomTooltip.defaultProps = {
    arrow: true,
    placement: "top"
}

const CustomTooltip = styled(({ className, ...props }) => <RawCustomTooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.primary.light
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.primary.light
        }
    })
)
export default CustomTooltip
