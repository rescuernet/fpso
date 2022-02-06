import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, CircularProgress} from "@material-ui/core";
import Store from "../bll/store";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ff6200',
        '& .MuiCircularProgress-root': {
            width: '100px!important',
            height: '100px!important'
        },
        background: 'none'
    }
}))

const BackdropComponent = (props) => {
    const classes = useStyles();

    const isLoading = Store.isLoading

    const [backdrop,setBackdrop] = useState(false);

    useEffect(() => {
        if(isLoading){
            setBackdrop(true)
        }else{
            const backdropTimeOut = setTimeout(() => {
                setBackdrop(false)
            }, 500);
            return () => clearTimeout(backdropTimeOut);
        }
    }, [isLoading]);

    return (
        <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default observer(BackdropComponent);