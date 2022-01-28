import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Gender} from "../../../../../types/types";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import {runInAction} from "mobx";
import AdminReferenceBooksStore from "../../../../../bll/admin/admin-reference-books-store";
import * as dateFns from "date-fns";

const useStyles = makeStyles((theme) => ({
    wrap: {
        border: '1px solid #ccc',
        marginBottom: 10
    },
    description: {
        textTransform: "uppercase",
        fontSize: '90%',
        marginBottom: 15,
        backgroundColor: '#ccc',
        padding: '3px 10px',
    },
    /*gender:{
        display: "flex",
        justifyContent: "center",
        '& .MuiFormGroup-root': {
            flexDirection: 'row',
            justifyContent: "center"
        },
        marginBottom: 20
    },*/
    fio: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    fieldFio: {
        marginBottom: 20,
        width: 300
    },
    fieldDateBirth: {
        marginBottom: 20
    }
}))

const PeopleEditFieldPersonal = ({gender,surname,name,patronymic,date_birth}) => {
    const classes = useStyles();

    const people = AdminReferenceBooksStore.referenceBooks.people.one

    return (
        <div className={classes.wrap}>
            <div className={classes.description}>личные данные</div>
            {/*<div className={classes.gender}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">пол</FormLabel>
                    <RadioGroup value={gender} onChange={(event)=> {people.gender = event.target.value}}>
                        {Gender.map((i)=>(
                            <FormControlLabel value={i.value} control={<Radio />} label={i.title} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>*/}
            <div className={classes.fio}>
                <TextField
                    className={classes.fieldFio}
                    id="surname"
                    label="Фамилия"
                    value={surname || ''}
                    onChange={(e)=>{
                        runInAction(()=>{
                            people.surname = e.target.value
                        })
                    }}
                    variant="outlined"
                    error={surname && surname.length < 3}
                    helperText={surname && surname.length < 3 && 'минимум 3 символа'}
                />
                <TextField
                    className={classes.fieldFio}
                    id="name"
                    label="Имя"
                    value={name || ''}
                    onChange={(e)=>{
                        runInAction(()=>{
                            people.name = e.target.value
                        })
                    }}
                    variant="outlined"
                    error={name && name.length < 3}
                    helperText={name && name.length < 3 && 'минимум 3 символа'}
                />
                <TextField
                    className={classes.fieldFio}
                    id="patronymic"
                    label="Отчество"
                    value={patronymic || ''}
                    onChange={(e)=>{
                        runInAction(()=>{
                            people.patronymic = e.target.value
                        })
                    }}
                    variant="outlined"
                    error={patronymic && patronymic.length < 3}
                    helperText={patronymic && patronymic.length < 3 && 'минимум 3 символа'}
                />
                <TextField
                    id="dateBirth"
                    label="Дата рождения"
                    type="date"
                    value={date_birth && dateFns.format(new Date(date_birth), 'yyyy-MM-dd')}
                    onChange={(e)=>{
                        runInAction(()=>{
                            people.date_birth = e.target.value
                        })
                    }}
                    className={classes.fieldDateBirth}
                    variant={"outlined"}
                    InputLabelProps={{shrink: true,}}
                />
            </div>

        </div>
    );
};

export default observer(PeopleEditFieldPersonal);