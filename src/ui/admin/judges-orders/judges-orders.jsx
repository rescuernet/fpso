import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../admin-page-wrapper";
import {Button, Divider, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {runInAction} from "mobx";
import {Judges_rank_doc} from '../../../types/types'
import {ADM_RM} from "../../../routes/admin-routes";
import AdminJudgesOrdersStore from "../../../bll/admin/admin-judges-orders-store";
import JudgesOrdersItem from "./judges-orders-item";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600,
        '@media (max-width: 1280px)': {
            margin: '0 auto',
        }
    },
    control: {
        marginBottom: 20,
    },
    newOrder: {
        marginBottom: 20
    },
    select: {
        maxWidth: 400,
        margin: '20px 0'
    }
}))

const JudgesOrders = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const [orderType,setOrderType] = useState('')

    useEffect(()=>{
        runInAction(async () => {
            await AdminJudgesOrdersStore.judgesOrdersGet(orderType)
        })
    },[orderType])

    const orders = AdminJudgesOrdersStore.judgesOrders.list

    const create = () => {
        runInAction(async ()=>{
            const response = await AdminJudgesOrdersStore.judgesOrdersCreate()
            response === 'OK'
                ? history.push(ADM_RM.Judges_Orders_Edit.getUrl(AdminJudgesOrdersStore.judgesOrders.id))
                : history.push(ADM_RM.Judges_Orders.path)
        })
    }

    return (
        <AdminPageWrapper title={'Судейский корпус'}>
            <div className={classes.wrapper}>
                <div className={classes.control}>
                    <Button className={classes.newOrder} variant={"contained"} color={"primary"} onClick={()=>{create()}}>Добавить приказ</Button>
                    <Divider/>
                    <div className={classes.select}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="orders-type-select-label">Выберите тип приказа</InputLabel>
                            <Select
                                labelId="orders-type-select-label"
                                id="orders-type-select"
                                value={orderType}
                                onChange={(e)=>{
                                    setOrderType(e.target.value)
                                }}
                                label="Выберите тип приказа"
                            >
                                <MenuItem value=''>
                                    <em>Не выбрано</em>
                                </MenuItem>
                                {Judges_rank_doc.map((item)=>(
                                    <MenuItem key={item.value} classes={{root: classes.selectMenuItem}} value={item.value}>{item.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={classes.orders}>
                    {orders.map((item,index)=>(
                        <JudgesOrdersItem key={index} item={item}/>
                    ))}
                </div>
            </div>
        </AdminPageWrapper>
    );
};

export default observer(JudgesOrders);