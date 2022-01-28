import React from 'react';
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import AdminPageWrapper from "../admin-page-wrapper";
import BpContainer from "../../client/bp-container";

const useStyles = makeStyles((theme) => ({}));


const Admin = () => {
    const classes = useStyles();

    return (
        <AdminPageWrapper title={'Главная'}>
            <BpContainer>
                Главная
            </BpContainer>
        </AdminPageWrapper>
    );
}

export default observer(Admin)

