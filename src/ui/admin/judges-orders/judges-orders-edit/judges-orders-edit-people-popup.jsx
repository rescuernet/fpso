import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from "@material-ui/core/styles";
import {runInAction} from "mobx";
import AdminJudgesOrdersStore from "../../../../bll/admin/admin-judges-orders-store";
import {Judges_rank} from "../../../../types/types";
import {Divider, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Store from "../../../../bll/store";

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        width: 400,
        '@media (max-width: 750px)' : {
            width: 300,
        },
        height: 545,
        padding: 10,
        overflow: "inherit"
    },
    sort: {
        marginBottom: 10
    },
    wrapper: {
        overflow: "hidden",
        paddingBottom: 10,
    },
    list: {
        height: '100%',
        overflowY: "scroll",
        margin: '10px 0',
        marginRight: -15,
        '@media (max-width: 750px)' : {
            marginRight: -7,
            paddingRight: 7
        },
    },
    item: {
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: '5px 10px',
        marginBottom: 5,
    },
    name: {
        textTransform: "uppercase",
        marginBottom: 5,
    },
    rank: {
        textTransform: "lowercase",
        fontWeight: "bold"
    },
    rankRed: {
        textTransform: "lowercase",
        color: '#ff0000'
    },
    close: {
        zIndex: 9000,
        position: "absolute",
        border: '1px solid #ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        top: -10,
        right: -10
    }
}));

export const JudgesOrdersEditPeoplePopup = ({open,setOpen,orderId}) => {

    const classes = useStyles();

    useEffect(() => {
        runInAction(async () => {
            await AdminJudgesOrdersStore.judgesOrdersPeopleGet(AdminJudgesOrdersStore.judgesOrders.one.orderType)
        })
    }, [])

    const [filterStr,setFilterStr] = useState('')

    let people = AdminJudgesOrdersStore.judgesOrders.people.filter(
        el => (el.surname+el.name+el.patronymic).toLowerCase().indexOf(filterStr.toLowerCase()) !== -1)



    const filter = (event)=> {
        setFilterStr(event)
    }

    const addPeople = (peopleId,peopleName) => {
        let res = AdminJudgesOrdersStore.judgesOrders.one.tmpName.find(item => item.peopleId === peopleId)
        if(!res){
            AdminJudgesOrdersStore.judgesOrders.one.tmpName.push({peopleId,peopleName:peopleName})
        }else{
            AdminJudgesOrdersStore.tmp_errors = 'Выбранный судья уже добавлен в список приказа'
        }
        handleClose()
    }

    const handleClose = () => {
        runInAction(()=> {
            AdminJudgesOrdersStore.judgesOrders.people = []
        })
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{paper: classes.dialogPaper}}
        >
            {Store.width < 750 && (
                <CloseIcon className={classes.close} fontSize={"medium"} onClick={()=>{handleClose()}}/>
            )}
            <div className={classes.sort}>
                <TextField
                    id="sortPeople"
                    label="поиск"
                    value={filterStr}
                    onChange={(e)=>{
                        filter(e.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                />
            </div>
            <Divider/>
            <div className={classes.wrapper}>
                <div className={classes.list}>
                    {people.map((i)=>{
                        let res = Judges_rank.find((item => item.value === i.rank_judges))
                        return (
                            <div key={i._id} id={i._id} className={classes.item} onClick={()=> {addPeople(i._id,`${i.surname} ${i.name} ${i.patronymic}`)}}>
                                <div className={classes.name}>{`${i.surname} ${i.name} ${i.patronymic}`}</div>
                                <div className={res ? classes.rank : classes.rankRed}>{res?.abbreviation || 'Без категории'}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Dialog>
    );
}
