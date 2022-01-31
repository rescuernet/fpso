import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../admin-page-wrapper";
import AdminTeamStore from "../../../bll/admin/admin-team-store";
import {runInAction, toJS} from "mobx";
import AdminTeamFields from "./team-fields";
import {Button} from "@material-ui/core";
import Store from "../../../bll/store";
import AdminTeamDocs from "./team-docs";
import {ErrorAlert} from "../calendar-plan/error-alert";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600,
    },
    control: {
        display: "flex",
        justifyContent: "space-evenly",
        borderTop: '1px solid #bcbcbc',
        padding: '20px 0',
        marginBottom: 20,
        '@media (max-width: 600px)' : {
            marginTop: 20
        },
    },
}))

const Team = (props) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction(async () => {
            await AdminTeamStore.teamGet()
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminTeamStore.clearData()
            })
        }
    },[])

    const save = async () => {
        const result = await AdminTeamStore.teamSave()
        if (result === 200) {
            await AdminTeamStore.teamGet()
            await Store.sendMediaDelTmp()
        }
    };

    return (
        <AdminPageWrapper title={'Сборная'}>
            {AdminTeamStore.team && (
                <div className={classes.wrapper}>
                    <AdminTeamFields/>
                    <AdminTeamDocs/>
                    <div className={classes.control}>
                        {!AdminTeamStore.team.edit && (
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{
                                    runInAction(()=>{
                                        AdminTeamStore.team.edit = true
                                    })
                                }}
                            >
                                Редактировать
                            </Button>
                        )}

                        {AdminTeamStore.team.edit && (
                            <>
                                <Button
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={()=>{
                                        runInAction( async () => {
                                            await AdminTeamStore.teamGet()
                                            await Store.sendMediaDelTmp()
                                        })
                                    }}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={()=>{save()}}
                                >
                                    Сохранить
                                </Button>
                            </>
                        )}
                    </div>
                    {AdminTeamStore.tmp_errors &&
                        <ErrorAlert
                            open={true}
                            header={'Ошибка!'}
                            text={AdminTeamStore.tmp_errors}
                        />
                    }
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(Team);