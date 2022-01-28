import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Header from "./header/header";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 50,
        height: '100%'
    },
}))

const UiPageWrapper = ({header,children}) => {
    const classes = useStyles();

    return (
        <>
            <Header title={header}/>
            <div className={classes.root}>
                {children}
            </div>
        </>

    );
};

export default observer(UiPageWrapper);