import { Paper, Typography } from "@mui/material"
import React, { Component } from "react"

class DebugWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            info: "",
            error: ""
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true, info, error })
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <Paper elevation={1} variant="outlined">
                        <Typography variant="body2">{this.state.error}</Typography>
                    </Paper>
                </>
            )
        } else {
            return this.props.children
        }
    }
}

export default DebugWrapper
