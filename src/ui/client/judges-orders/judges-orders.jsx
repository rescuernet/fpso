import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {runInAction} from "mobx";
import {Judges_rank_doc} from '../../../types/types'
import JudgesOrdersItem from "./judges-orders-item";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import UiJudgesStore from "../../../bll/ui/ui-judges-store";
import Rusada from "../rusada/rusada-poster";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: '0 auto',
        maxWidth: 600,
        paddingBottom: 20
    },
    control: {
        marginBottom: 20,
        '@media (max-width: 600px)' : {
            marginTop: 20
        },
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

    const [orderType,setOrderType] = useState('')

    useEffect(()=>{
        runInAction(async () => {
            await UiJudgesStore.judgesOrdersGet(orderType)
        })
    },[orderType])

    const orders = UiJudgesStore.judgesOrders

    return (
        <UiPageWrapper header={'Судейский корпус'}>
            <BpContainer>
                <Rusada/>
                <div className={classes.wrapper}>
                    <div className={classes.control}>
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
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(JudgesOrders);