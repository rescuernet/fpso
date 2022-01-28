import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import AdminReferenceBooksStore from "../../../../../bll/admin/admin-reference-books-store";
import {useHistory, useParams} from "react-router-dom";
import AdminPageWrapper from "../../../admin-page-wrapper";
import PeopleAvatar from "./people-edit-avatar";
import Store from "../../../../../bll/store";
import PeopleEditField from "./people-edit-field";
import {Button, FormControlLabel, Switch} from "@material-ui/core";
import {ADM_RM} from "../../../../../routes/admin-routes";
import {PeopleAlertDialog} from "./people-edit-alert";

const useStyles = makeStyles((theme) => ({
    people: {
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340,
        },
        '@media (max-width: 1280px)' : {
            margin: '20px auto'
        },
    },
    control: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 20,
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    button: {
        width: 120,
        '@media (max-width: 750px)' : {
            marginBottom: 20,
        },
    },
    checkBox: {
        '@media (max-width: 750px)' : {
            marginBottom: 20,
        },
    },
}))

const PeopleEdit = (props) => {
    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        runInAction(async () => {
            await Store.sendMediaDelTmp()
            AdminReferenceBooksStore.clearData()
            await AdminReferenceBooksStore.peopleId(id)
        })
        return ()=> {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminReferenceBooksStore.clearData()})
        }
    },[id])

    //отмена
    const Cancel = () => {
        history.push(ADM_RM.Reference__Books__People.path)
    };

    //сохранить
    const Save = async () => {
        const result = await AdminReferenceBooksStore.peopleSave()
        if(result === 200){
            history.push(ADM_RM.Reference__Books__People.path)
        }
    };

    const people = AdminReferenceBooksStore.referenceBooks.people.one

    return (
        <AdminPageWrapper title={people?.tmp ? 'Новый персонаж' : 'Персонажи'}>
            {AdminReferenceBooksStore.referenceBooks.people.one && (
                <div className={classes.people}>
                    <PeopleAvatar/>
                    <PeopleEditField people={people}/>
                    <div className={classes.control}>
                        <FormControlLabel
                            className={classes.checkBox}
                            control={
                                <Switch
                                    checked={people?.view || false}
                                    onChange={(e)=>{people.view = e.target.checked}}
                                    name="fixedNews"
                                    color="secondary"
                                />
                            }
                          label={people?.view && people.view ? 'отображать в системе' : 'не отображать в системе'}
                        />
                        <Button
                            className={classes.button}
                            variant={"outlined"}
                            color={"primary"}
                            onClick={()=>{Cancel()}}
                        >
                            Отмена
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color={"primary"}
                            onClick={()=>{Save()}}
                        >
                            Сохранить
                        </Button>
                    </div>
                    {AdminReferenceBooksStore.tmp_errors &&
                        <PeopleAlertDialog
                            open={true}
                            header={'Ошибка!'}
                            text={AdminReferenceBooksStore.tmp_errors}
                        />
                    }
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(PeopleEdit);