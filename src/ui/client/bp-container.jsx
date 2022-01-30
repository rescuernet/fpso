import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    container: {
        width: 1280,
        margin: '0 auto',
        padding: '0 10px',
        '@media (max-width: 1280px)': {
            width: 740
        },
        '@media (max-width: 750px)': {
            width: 360
        },
    }
}))

const BpContainer = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default observer(BpContainer);