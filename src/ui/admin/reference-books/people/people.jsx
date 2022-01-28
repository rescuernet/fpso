import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../../admin-page-wrapper";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import AdminReferenceBooksStore from "../../../../bll/admin/admin-reference-books-store";
import {ADM_RM} from "../../../../routes/admin-routes";
import {useHistory} from "react-router-dom";
import PeopleItem from "./people-item";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600
    },
    control: {
        marginBottom: 20,
        '@media (max-width: 600px)' : {
            marginTop: 20
        },
    },
}))

const People = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const create = () => {
        runInAction(async ()=>{
            const response = await AdminReferenceBooksStore.peopleCreate()
            response === 'OK'
                ? history.push(ADM_RM.Reference__Books__People_Edit.getUrl(AdminReferenceBooksStore.referenceBooks.people.id))
                : history.push(ADM_RM.Reference__Books__People.path)
        })
    }

    return (
        <AdminPageWrapper title={'Персонажи'}>
            <div className={classes.wrapper}>
                <div className={classes.control}>
                    <Button variant={"contained"} color={"primary"} onClick={()=>{create()}}>Добавить</Button>
                </div>
                <PeopleItem/>
            </div>
        </AdminPageWrapper>
    );
};

export default observer(People);
