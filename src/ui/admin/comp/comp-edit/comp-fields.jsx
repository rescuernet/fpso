import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction, toJS} from "mobx";
import {observer} from "mobx-react-lite";
import * as dateFns from "date-fns";

const useStyles = makeStyles((theme) => ({
    fieldsDates: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: '20px 0',
        '@media (max-width: 430px)' : {
            padding: "20px 0 0 0",
        },
    },
    fieldDate: {
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
        width: 180
    },
    selectLocation: {
        marginBottom: 20,
    },
    selectMenu: {
        whiteSpace: 'normal',
    },
    selectMenuItem: {
        whiteSpace: 'normal',
        paddingTop: 10,
        paddingBottom: 10
    },
    fieldsText: {
        display: "flex",
        flexDirection: "column",
        '& > div': {
            marginBottom: 20
        }
    },
}))


const CompFields = (props) => {
    const classes = useStyles();

    const compOne = toJS(AdminCompStore.compOne)

    const locationPool = AdminCompStore.pools

    return (
        <>
            {compOne &&
                <>
                    <div className={classes.fieldsDates}>
                        <TextField
                            id="dateStart"
                            label="Дата начала"
                            type="date"
                            value={compOne?.dateStart && dateFns.format(new Date(compOne.dateStart), 'yyyy-MM-dd')}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    AdminCompStore.compOne.dateStart = e.target.value
                                })
                            }}
                            className={classes.fieldDate}
                            variant={"outlined"}
                            InputLabelProps={{shrink: true,}}
                        />
                        <TextField
                            id="dateEnd"
                            label="Дата окончания"
                            type="date"
                            value={compOne?.dateEnd && dateFns.format(new Date(compOne.dateEnd), 'yyyy-MM-dd')}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    AdminCompStore.compOne.dateEnd = e.target.value
                                })
                            }}
                            className={classes.fieldDate}
                            variant={"outlined"}
                            InputLabelProps={{shrink: true,}}
                            error={compOne?.dateEnd && dateFns.format(new Date(compOne.dateEnd), 'yyyy-MM-dd') < dateFns.format(new Date(compOne.dateStart), 'yyyy-MM-dd')}
                            helperText={compOne?.dateEnd && dateFns.format(new Date(compOne.dateEnd), 'yyyy-MM-dd') < dateFns.format(new Date(compOne.dateStart), 'yyyy-MM-dd') && 'не верная дата'}
                        />
                    </div>
                    <div className={classes.selectLocation}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="location-select-label">Место проведения</InputLabel>
                            <Select
                                labelId="location-select-label"
                                id="locationSelect"
                                value={compOne.location}
                                onChange={(e)=>{
                                    runInAction(()=>{
                                        AdminCompStore.compOne.location = e.target.value
                                    })
                                }}
                                label="Место проведения"
                                classes={{
                                    selectMenu: classes.selectMenu
                                }}
                            >
                                <MenuItem value=''>
                                    <em>Не выбрано</em>
                                </MenuItem>
                                {locationPool.length > 0 &&
                                    locationPool.map((item)=>(
                                        <MenuItem key={item._id} classes={{root: classes.selectMenuItem}} value={item._id}>{`${item.name}, ${item.address}`}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.fieldsText} >
                        <TextField
                            id="headerFirst"
                            label="Заголовок"
                            value={compOne?.headerFirst}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    AdminCompStore.compOne.headerFirst = e.target.value
                                })
                            }}
                            variant="outlined"
                            multiline
                            minRows={1}
                            maxRows={5}
                            error={compOne?.headerFirst && compOne?.headerFirst.length > 150}
                            helperText={compOne?.headerFirst && compOne?.headerFirst.length > 150 && 'максимум 150 символов'}
                        />
                        <TextField
                            id="textMain"
                            label="Описание соревнований"
                            value={compOne.textMain}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    AdminCompStore.compOne.textMain = e.target.value
                                })
                            }}
                            variant="outlined"
                            multiline
                            minRows={3}
                            maxRows={10}
                        />
                    </div>
                </>
            }

        </>
    );
};

export default observer(CompFields);