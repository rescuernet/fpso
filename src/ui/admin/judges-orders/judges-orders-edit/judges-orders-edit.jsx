import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../../admin-page-wrapper";
import {useHistory, useParams} from "react-router-dom";
import AdminJudgesOrdersStore from "../../../../bll/admin/admin-judges-orders-store";
import {runInAction} from "mobx";
import Store from "../../../../bll/store";
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from "@material-ui/core";
import {Judges_rank_doc} from "../../../../types/types";
import * as dateFns from "date-fns";
import JudgesOrdersEditPeoplePopup from "./judges-orders-edit-people-popup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {JudgesAlertDialog} from "./judges-orders-edit-alert";
import JudgesOrdersDocs from "./judges-orders-edit-docs";
import {ADM_RM} from "../../../../routes/admin-routes";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        paddingBottom: 20,
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340,
        },
        '@media (max-width: 1280px)' : {
            margin: '20px auto'
        },
    },
    date: {
        marginBottom: 20
    },
    selectType: {
        marginBottom: 20
    },
    selectRoot: {
        '& .Mui-disabled': {
            color: '#333'
        }
    },
    judges: {
    },
    header: {
        fontSize: '110%',
        fontWeight: "bold",
        marginBottom: 20
    },
    judgesList: {
        marginBottom: 20
    },
    judgesItem: {
        border: '1px solid #bcbcbc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    judgesName: {},
    judgesNameRed: {
        color: '#ff0000'
    },
    deleteJudges: {
        fontSize: 0,
        marginLeft: 5
    },
    control: {
        display: "flex",
        justifyContent: "space-evenly",
        paddingTop: 20,
        borderTop: '1px solid #ccc',
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    checkBox: {
        '@media (max-width: 750px)': {
            marginBottom: 20,
        },
    },
    button: {
        width: 120,
        '@media (max-width: 750px)': {
            marginBottom: 20,
        },
    }
}))

const JudgesOrdersEdit = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {id} = useParams();

    const [open,setOpen] = useState(false)

    const [deleteOrder, setDeleteOrder] = useState(false);

    useEffect(() => {
        runInAction(async () => {
            await Store.sendMediaDelTmp()
            await AdminJudgesOrdersStore.judgesOrdersId(id)
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminJudgesOrdersStore.clearData()
            })
        }
    }, [id])

    const order = AdminJudgesOrdersStore.judgesOrders.one

    const addJudges = () => {
        setOpen(true)
    }

    const deleteJudge = (index) => {
        order.tmpName.splice(index,1)
    }

    const saveOrder = async () => {
        const result = await AdminJudgesOrdersStore.judgesOrdersSave()
        if (result === 200) {
            history.push(ADM_RM.Judges_Orders.path)
        }
    }

    const cancel = async () => {
        history.push(ADM_RM.Judges_Orders.path)
    }

    const orderDelete = () => {
        setDeleteOrder(true)
    }

    const orderDeleteConfirm = async (id) => {
        setDeleteOrder(false)
        const result = await AdminJudgesOrdersStore.judgesOrdersDelete(id)
        if (result === 200) {
            history.push(ADM_RM.Judges_Orders.path)
        }
    }



    return (
        <AdminPageWrapper
            title={
            order
                ? order.tmp
                    ? `?????????? ????????????`
                    : `???????????????????????????? ??????????????`
                : null
        }
        >
            {order && (
                <div className={classes.wrapper}>
                    <div className={classes.date}>
                        <TextField
                            id="dateOrder"
                            label="???????? ??????????????"
                            type="date"
                            value={dateFns.format(new Date(order.dateOrder), 'yyyy-MM-dd')}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    order.dateOrder = e.target.value
                                })
                            }}
                            variant={"outlined"}
                            InputLabelProps={{shrink: true,}}
                        />
                    </div>
                    <div className={classes.selectType}>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            /*disabled={!order.tmp}*/
                            classes={{root: classes.selectRoot}}
                        >
                            <InputLabel id="orders-type-select-label">???????????????? ?????? ??????????????</InputLabel>
                            <Select
                                labelId="orders-type-select-label"
                                id="orders-type-select"
                                value={order?.orderType || ''}
                                onChange={(e)=>{
                                    runInAction(()=>{
                                        AdminJudgesOrdersStore.judgesOrders.one.orderType = e.target.value
                                    })
                                }}
                                label="???????????????? ?????? ??????????????"
                            >
                                <MenuItem value=''>
                                    <em>???? ??????????????</em>
                                </MenuItem>
                                {Judges_rank_doc.map((item)=>(
                                    <MenuItem key={item.value} classes={{root: classes.selectMenuItem}} value={item.value}>{item.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {order.orderType && (
                        <>
                            <div className={classes.judges}>
                                <div className={classes.header}>??????????</div>
                                {order.tmpName.length > 0 && (
                                    <div className={classes.judgesList}>
                                        {
                                            order.tmpName.map((item,index)=> (
                                                <div key={index} className={classes.judgesItem}>
                                                    <div className={classes.judgesName + ' ' + (item.view === false ? classes.judgesNameRed : '')}>{item.peopleName}</div>
                                                    <div className={classes.deleteJudges}>
                                                        <HighlightOffIcon
                                                            color={'secondary'}
                                                            onClick={()=>{deleteJudge(index)}}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                                <Button variant={'outlined'} color={"primary"} onClick={()=>{addJudges()}}>???????????????? ??????????</Button>
                            </div>
                            <JudgesOrdersDocs/>
                        </>
                    )}
                    <div className={classes.control}>
                        {order.orderType && (
                            <>
                                <FormControlLabel
                                    className={classes.checkBox}
                                    control={
                                        <Switch
                                            checked={order?.view || false}
                                            onChange={(e)=>{order.view = e.target.checked}}
                                            name="fixedNews"
                                            color="secondary"
                                        />
                                    }
                                    label={order?.view && order.view ? '????????????????????' : '???? ????????????????????'}
                                />
                                <Button className={classes.button} variant={"contained"} color={"primary"} onClick={()=>{saveOrder()}}>??????????????????</Button>
                                {!order.tmp && (
                                    <Button className={classes.button} variant={"contained"} color={"secondary"} onClick={()=>{orderDelete()}}>??????????????</Button>
                                )}
                            </>
                        )}
                        <Button className={classes.button} variant={"outlined"} color={"primary"} onClick={()=>{cancel()}}>????????????</Button>
                    </div>

                    {open && (
                        <JudgesOrdersEditPeoplePopup
                            open={open}
                            setOpen={setOpen}
                            orderId={id}
                        />
                    )}

                    {deleteOrder &&
                        <JudgesAlertDialog
                            alertType={'confirm'}
                            open={true}
                            header={'????????????????!'}
                            text={'?????????????????????? ???????????????? ??????????????'}
                            delete={() => {
                                orderDeleteConfirm(id)
                            }}
                            close={() => {
                                setDeleteOrder(false)
                            }}
                        />
                    }

                    {AdminJudgesOrdersStore.tmp_errors && (
                        <JudgesAlertDialog
                            open={true}
                            header={'????????????!'}
                            text={AdminJudgesOrdersStore.tmp_errors}
                        />
                        )
                    }
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(JudgesOrdersEdit);