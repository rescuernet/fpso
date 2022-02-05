import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../admin-page-wrapper";
import {Button} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import RusadaDocsItem from "./rusada-docs-item";
import AdminRusadaStore from "../../../bll/admin/admin-rusada-store";
import {ErrorAlert} from "../calendar-plan/error-alert";
import Store from "../../../bll/store";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600
    },
    control: {
        display: "flex",
        marginBottom: 30,
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    button: {
        marginRight: 30,
        '@media (max-width: 750px)' : {
            width: 195,
            marginRight: 0,
            marginBottom: 20
        },
    }
}))

const Rusada = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction(async () => {
            await AdminRusadaStore.rusadaGet()
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminRusadaStore.clearData()
            })
        }
    },[])

    const docs = AdminRusadaStore.rusada?.docs


    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substring(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminRusadaStore.rusadaDocsCreate(data,originName)})
            event.target.value = ''
        })
    };

    const save = async () => {
        const result = await AdminRusadaStore.rusadaSave()
        if (result === 200) {
            await AdminRusadaStore.rusadaGet()
            await Store.sendMediaDelTmp()
        }
    };

    const docsCount = AdminRusadaStore.rusada?.docs && AdminRusadaStore.rusada.docs.length

    return (
        <AdminPageWrapper title={'Антидопинг'}>
            {AdminRusadaStore.rusada && (
                <div className={classes.wrapper}>
                    {AdminRusadaStore.rusada.edit && (
                        <div className={classes.control}>
                            <label htmlFor="docs">
                                <input
                                    style={{ display: 'none' }}
                                    id="docs"
                                    name="docs"
                                    type="file"
                                    onChange={UploadDocs}
                                />
                                <Button
                                    className={classes.button}
                                    color="primary"
                                    variant={"contained"}
                                    component={'span'}
                                >
                                    добавить документ
                                </Button>
                            </label>
                            <Button
                                className={classes.button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{
                                    runInAction( async () => {
                                        await AdminRusadaStore.rusadaGet()
                                        await Store.sendMediaDelTmp()
                                    })
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                className={classes.button}
                                variant={"contained"}
                                color={"primary"}
                                onClick={()=>{save()}}
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                    {!AdminRusadaStore.rusada.edit && (
                        <div className={classes.control}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                onClick={()=>{
                                    runInAction(()=>{
                                        AdminRusadaStore.rusada.edit = true
                                    })
                                }}
                            >
                                Редактировать
                            </Button>
                        </div>
                    )}
                    <div className={classes.docs}>
                        {
                            docs.map((item,index)=>(
                                <RusadaDocsItem key={'docs'+index} item={item} index={index} docsCount={docsCount}/>
                            ))
                        }
                    </div>
                    {AdminRusadaStore.tmp_errors &&
                        <ErrorAlert
                            open={true}
                            header={'Ошибка!'}
                            text={AdminRusadaStore.tmp_errors}
                        />
                    }
                </div>
            )}

        </AdminPageWrapper>
    );
};

export default observer(Rusada);