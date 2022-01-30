import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import BpContainer from "../bp-container";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex",
        alignItems: "center",
        height: 50,
        borderTop: '1px solid #ff6200'
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: '#005580',
        fontSize: '150%',
        '@media (max-width: 750px)': {
            fontSize: '100%',
        },
    },

}))

const Footer = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <BpContainer>
                <div className={classes.content}>
                    <div>Федерация плавания Самарской области</div>
                </div>
            </BpContainer>

        </div>
    );
};

export default observer(Footer);