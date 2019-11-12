import React from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from "react-router-dom";

function Header(props) {
    let title = props.location.pathname.replace('/','')
    let header = null
    if(title){
        title = title[0].toUpperCase() + title.slice(1)
        header = (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => props.history.goBack()}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
    return header
}

export default withRouter(Header)