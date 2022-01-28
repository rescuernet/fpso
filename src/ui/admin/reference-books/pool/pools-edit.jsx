import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Button, Divider, FormControlLabel, Switch, TextField} from "@material-ui/core";
import {runInAction} from "mobx";
import AdminReferenceBooksStore from "../../../../bll/admin/admin-reference-books-store";
import {useHistory, useParams} from "react-router-dom";
import {ADM_RM} from "../../../../routes/admin-routes";
import AdminPageWrapper from "../../admin-page-wrapper";
import {PoolsAlertDialog} from "./pools-alert";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600
    },
    item: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 20,
        '& .MuiTextField-root': {
            marginBottom: 20,
            minWidth: 300
        }
    },
    control: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        '@media (max-width: 430px)' : {
            marginTop: 20,
        },
    },
    controlCheckBox: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        padding: 10
    },
    controlButton: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 20,
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    checkBox: {
        '@media (max-width: 750px)' : {
            marginBottom: 20,
        },
    },
    Button: {
        width: 120,
        '@media (max-width: 750px)' : {
            marginBottom: 20,
        },
    }
}))

const PoolsEdit = (props) => {
    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();


    useEffect(()=>{
        runInAction(async () => {
            await AdminReferenceBooksStore.poolsId(id)
        })
        return ()=> {AdminReferenceBooksStore.clearData()}
    },[id])

    const pool = AdminReferenceBooksStore.referenceBooks.pools.one

    //отмена
    const Cancel = () => {
        history.push(ADM_RM.Reference__Books__Pool.path)
    };

    //сохранить
    const Save = async () => {
        const result = await AdminReferenceBooksStore.poolSave()
        if(result === 200){
            history.push(ADM_RM.Reference__Books__Pool.path)
        }
    };

    return (
        <AdminPageWrapper title={'Бассейны'}>
            {pool && (
                <div className={classes.wrapper}>
                    <h4>{pool?.name ? 'Редактирование' : 'Новый бассейн'}</h4>
                    <h6 style={{color: '#ff0000',textAlign: 'center'}}>Внимание! Внесенные изменения будут отображаться везде, где используется данный бассейн!</h6>
                    <div className={classes.item}>
                        <TextField
                            label="Бассейн"
                            value={pool?.name || ''}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    pool.name = e.target.value
                                })
                            }}
                            variant="outlined"
                            error={pool?.name && pool?.name.length > 50}
                            helperText={pool?.name && pool?.name.length > 50 && 'максимум 50 символов'}
                        />
                        <TextField
                            label="Адрес"
                            value={pool?.address || ''}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    pool.address = e.target.value
                                })
                            }}
                            variant="outlined"
                            error={pool?.address && pool?.address.length > 50}
                            helperText={pool?.address && pool?.address.length > 50 && 'максимум 50 символов'}
                        />
                    </div>
                    <div className={classes.control}>
                        <Divider/>
                        <div className={classes.controlButton}>
                            <FormControlLabel className={classes.checkBox}
                                              control={
                                                  <Switch
                                                      checked={pool?.view || false}
                                                      onChange={(e)=>{runInAction(()=>{pool.view = e.target.checked})}}
                                                      name="fixedNews"
                                                      color="secondary"
                                                  />
                                              }
                                              label={pool?.view && pool.view ? 'отображать в списках' : 'не отображать в списках'}
                            />
                            <Button
                                className={classes.Button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{Cancel()}}
                            >
                                Отмена
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"primary"}
                                onClick={()=>{Save()}}
                            >
                                Сохранить
                            </Button>

                            {AdminReferenceBooksStore.tmp_errors &&
                                <PoolsAlertDialog
                                    open={true}
                                    header={'Ошибка!'}
                                    text={AdminReferenceBooksStore.tmp_errors}
                                />
                            }
                        </div>
                        {!pool.view && (
                            <h6 style={{color: '#ff0000',textAlign: 'center'}}>Внимание! Выключение показа в списках - полностью скрывает выбранный бассейн.</h6>
                        )}
                    </div>
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(PoolsEdit);