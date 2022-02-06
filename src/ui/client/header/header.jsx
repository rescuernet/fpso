import React from 'react';
import {AppBar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "../menu/menu";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../bll/auth-store";
import BpContainer from "../bp-container";
import {useHistory} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexDirection:'row',
        alignItems: "center",
        borderBottom: '2px solid #ff6200',
        height: 50,
    },

    toolBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0
    },
    fpso: {
        textTransform: "uppercase",
        fontSize: 20,
        letterSpacing: 10,
        textShadow: '1px 1px 3px #000',
        '@media (max-width: 750px)': {
            textAlign: 'right',
            fontSize: 10,
            letterSpacing: 5,
            width: 100,
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },
    title: {
        textTransform: "uppercase",
        fontSize: '0.8rem',
        fontFamily: 'Roboto',
        letterSpacing: 1.5,
    },
}))


const Header = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const isAuth = AuthStore.isAuth

    return (
        <AppBar className={classes.appBar}>
            <Menu isAuth={isAuth} logout={AuthStore.logout}/>
            <BpContainer>
                <div className={classes.toolBar}>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.fpso} onClick={()=>{history.push(UI_RM.Main.path)}}>samara swimming</div>
                </div>
            </BpContainer>
        </AppBar>
    );
};

export default observer(Header);



