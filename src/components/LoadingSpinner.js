import React from "react"
import { CircularProgress, Grid } from "@mui/material"
const LoadingSpinner = (props) => {
    const { enabled, containerProps, sx } = props
    const renderSpinner = () => {
        return (
            <Grid container {...containerProps}>
                <Grid item>
                    <CircularProgress sx={sx} />
                </Grid>
            </Grid>
        )
    }

    return <>{enabled && renderSpinner()}</>
}

export default LoadingSpinner
