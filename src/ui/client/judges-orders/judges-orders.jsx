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

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: '0 auto',
        paddingBottom: 20
    },
    control: {
        margin: '40px 0',
        '@media (max-width: 750px)' : {
            marginTop: 20
        },
    },
    newOrder: {
        marginBottom: 20
    },
    select: {
        marginBottom: 20
    },
    orders: {
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340
        },
    }
}))

const JudgesOrders = (props) => {
    const classes = useStyles();

    const [orderType,setOrderType] = useState('')

    useEffect(()=>{
        runInAction(async () => {
            await UiJudgesStore.judgesOrdersGet(orderType)
        })
        return ()=> {
            runInAction(()=>{
                UiJudgesStore.judgesOrders = []
            })
        }
    },[orderType])

    const orders = UiJudgesStore.judgesOrders

    return (
        <UiPageWrapper header={'Судейский корпус'}>
            <BpContainer>
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
                        {orders.length > 0 && Judges_rank_doc.map((type,index)=>{
                            let res = orders.filter(el => el.orderType === type.value);
                            if(res){
                                return (
                                    <>
                                        {orderType === '' && (
                                            <h3 style={{textAlign: 'center'}}>{type.title}</h3>
                                        )}
                                        {res.map((item,index)=>(
                                            <JudgesOrdersItem key={index+'2'} item={item}/>
                                        ))}
                                    </>
                                )
                            }

                        })}
                    </div>
                </div>
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(JudgesOrders);