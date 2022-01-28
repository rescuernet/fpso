import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../admin-page-wrapper";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";
import {runInAction} from "mobx";
import Store from "../../../bll/store";
import AdminAboutUsFields from "./about-us-fields";
import AdminAboutUsDocs from "./about-us-docs";
import AdminAboutUSImg from "./about-us-img";
import {ADM_RM} from "../../../routes/admin-routes";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";

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

const AdminAboutUs = (props) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction( async () => {
            await AdminAboutUsStore.aboutUsGet()
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminAboutUsStore.clearData()
            })
        }
    },[])

    return (
        <AdminPageWrapper title={'О нас'}>
            {AdminAboutUsStore.aboutUs && (
                <div className={classes.wrapper}>
                    <AdminAboutUsFields/>
                    <AdminAboutUsDocs/>
                    <AdminAboutUSImg/>
                    <div className={classes.control}>
                        {!AdminAboutUsStore.aboutUs.edit && (
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{
                                    runInAction(()=>{
                                        AdminAboutUsStore.aboutUs.edit = true
                                    })
                                }}
                            >
                                Редактировать
                            </Button>
                        )}

                        {AdminAboutUsStore.aboutUs.edit && (
                            <>
                                <Button
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={()=>{
                                        runInAction( async () => {
                                            await AdminAboutUsStore.aboutUsGet()
                                            await Store.sendMediaDelTmp()
                                        })
                                    }}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={()=>{
                                        runInAction( async () => {
                                            await AdminAboutUsStore.aboutUsSave()
                                            await AdminAboutUsStore.aboutUsGet()
                                            await Store.sendMediaDelTmp()
                                        })
                                    }}
                                >
                                    Сохранить
                                </Button>
                            </>

                        )}
                    </div>
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(AdminAboutUs);