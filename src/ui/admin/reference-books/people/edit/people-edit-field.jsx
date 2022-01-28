import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";

import PeopleEditFieldRole from "./people-edit-field-role";
import PeopleEditFieldPersonal from "./people-edit-field-personal";

const useStyles = makeStyles((theme) => ({
    fields: {},

}))

const PeopleEditField = ({people}) => {
    const classes = useStyles();


    return (
        <div className={classes.fields}>
            <PeopleEditFieldPersonal
                /*gender={people.gender}*/
                surname={people.surname}
                name={people.name}
                patronymic={people.patronymic}
                date_birth={people.date_birth}
            />
            <PeopleEditFieldRole role={people.role}/>
        </div>
    );
};

export default observer(PeopleEditField);