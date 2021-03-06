import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Header from "./header/header";
import Footer from "./footer/footer";
import BackdropComponent from "../../utils/backdrop";
import Store from "../../bll/store";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: 50,
        height: '100%',
        flex: '1 0'
    },
    content: {
        flex: '1 0 auto',
        display: "flex",
        flexDirection: "column",
        position: "relative"
    }
}))

const UiPageWrapper = ({header,children}) => {
    const classes = useStyles();

    const isLoading = Store.isLoading

    return (
        <div className={classes.root}>
            <BackdropComponent/>
            <Header title={header}/>
            <div className={classes.content}>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default observer(UiPageWrapper);