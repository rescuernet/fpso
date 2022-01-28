import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import Store from "../../../../bll/store";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import CompAvatar from "./comp-avatar";
import {useHistory, useParams} from "react-router-dom";
import {runInAction} from "mobx";
import CompFields from "./comp-fields";
import CompDocs from "./comp-docs";
import {CompAlertDialog} from "./comp-alert";
import {ADM_RM} from "../../../../routes/admin-routes";
import CompCheckbox from "./comp-checkbox";
import CompResult from "./comp-result";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import AdminPageWrapper from "../../admin-page-wrapper";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340,
        },
        '@media (max-width: 1280px)' : {
            margin: '0 auto'
        },
    },
    control: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        '@media (max-width: 750px)': {
            marginTop: 20,
        },
    },
    controlButton: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 20,
        '@media (max-width: 750px)': {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    Button: {
        width: 120,
        '@media (max-width: 750px)': {
            marginBottom: 20,
        },
    }
}));

const CompEdit = (props) => {
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        runInAction(async () => {
            await Store.sendMediaDelTmp()
            await AdminCompStore.getCompId(id)
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminNewsStore.clearData()
            })
        }
    }, [id])

    const classes = useStyles();

    const [deleteComp, setDeleteComp] = useState(false);

    //отмена
    const Cancel = () => {
        history.push(ADM_RM.Competitions.path)
    };


    //создание массива для обновления
    const UpdateArr = async () => {
        const result = await AdminCompStore.compUpdate()
        if (result === 200) {
            history.push(ADM_RM.Competitions.path)
        }
    };

    const compDelete = () => {
        setDeleteComp(true)
    }

    const compDeleteConfirm = async (id) => {
        setDeleteComp(false)
        const result = await AdminCompStore.compDelete(id)
        if (result === 200) {
            history.push(ADM_RM.Competitions.path)
        }
    }

    return (
        <AdminPageWrapper title={'Соревнования'}>
            {AdminCompStore.compOne &&
                <div className={classes.wrapper}>
                    <CompAvatar compId={id}/>
                    <Divider/>

                    <CompFields/>
                    <Divider/>

                    <CompDocs compId={id}/>
                    <Divider/>

                    <CompResult compId={id}/>
                    <Divider/>

                    <CompCheckbox/>
                    <Divider/>

                    <div className={classes.control}>
                        <div className={classes.controlButton}>
                            <Button
                                className={classes.Button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={() => {
                                    Cancel()
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"primary"}
                                onClick={() => {
                                    UpdateArr()
                                }}
                            >
                                Сохранить
                            </Button>
                            {!AdminCompStore.compOne.tmp &&
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    color={"secondary"}
                                    onClick={() => {
                                        compDelete()
                                    }}
                                >
                                    удалить
                                </Button>
                            }
                            {deleteComp &&
                                <CompAlertDialog
                                    alertType={'confirm'}
                                    open={true}
                                    header={'Внимание!'}
                                    text={'Подтвердите удаление новости'}
                                    delete={() => {
                                        compDeleteConfirm(id)
                                    }}
                                    close={() => {
                                        setDeleteComp(false)
                                    }}
                                />
                            }

                        </div>
                    </div>
                    {AdminCompStore.tmp_errors &&
                        <CompAlertDialog
                            open={true}
                            header={'Ошибка!'}
                            text={AdminCompStore.tmp_errors}
                        />
                    }
                </div>
            }
        </AdminPageWrapper>
    );
};

export default observer(CompEdit);