import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import * as dateFns from "date-fns";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import Store from '../../../../bll/store';
import {runInAction, toJS} from "mobx";
import {ADM_RM} from "../../../../routes/admin-routes";
import {observer} from "mobx-react-lite";
import AdminReferenceBooksStore from "../../../../bll/admin/admin-reference-books-store";
import {Role} from "../../../../types/types";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';


const useStyles = makeStyles((theme) => ({
    table: {
        width: 1000,
        '@media (max-width: 1280px)' : {
            width: 700
        },
        '@media (max-width: 750px)' : {
            width: 340
        },
        borderCollapse: "collapse",
        fontFamily: 'Roboto',
        color: '#545454',
        '& tr': {
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc'
        },
        '& tr:hover': {
            transition: '0.3s',
            backgroundColor: '#f2f2f2',
            cursor: 'pointer'
        },
        '& td': {
            padding: '20px 10px',
            '@media (max-width: 750px)' : {
                padding: '10px 5px',
            },
        }
    },
    roles: {
        width: 100,
        '& div': {
            padding: 5
        }
    },
    min: {
        width: 100,
        textAlign: "center",
        padding: '0 5px',
    },
    notPublished: {
        color: '#ff0000'
    }
}));

const PeopleItem = () => {

    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction(async ()=>{
            await AdminReferenceBooksStore.peopleGet()
        })
    },[])

    const peopleEdit = (id) => {
        runInAction(()=>{AdminReferenceBooksStore.clearData()})
        history.push(ADM_RM.Reference__Books__People_Edit.getUrl(id))
    }

    const people = toJS(AdminReferenceBooksStore.referenceBooks.people.list)

    return (
        <>
            {people && people.length > 0 && (
                <table className={classes.table}>
                    <tbody>
                    {Store.width > 750 && (
                        <th></th>
                    )}
                    <th>Статус</th>
                    <th>Ф.И.О.</th>
                    {Store.width > 750 && (
                        <>
                            <th>Д.Р.</th>
                            <th>Аватар</th>
                        </>
                    )}
                    {people.map((i) => (
                        <tr
                            key={i._id}
                            id={i._id}
                            className={!i.view ? classes.notPublished : null}
                            onClick={()=>{peopleEdit(i._id)}}
                        >
                            {Store.width > 750 && (
                                <td className={classes.min}>
                                    {i.view
                                        ? <VisibilityOutlinedIcon color={"primary"}/>
                                        : <VisibilityOffOutlinedIcon color={"secondary"}/>}
                                </td>
                            )}
                            <td className={classes.roles}>
                                {i.role.map((i)=> {
                                    let res = Role.find((item => item.value === i))
                                    return (<div key={i.value}>{res.title}</div>)
                                })}
                            </td>
                            <td>{`${i.surname} ${i.name} ${i.patronymic}`}</td>
                            {Store.width > 750 && (
                                <>
                                    <td className={classes.min}>{i.date_birth ? dateFns.format(new Date(i.date_birth), 'dd.MM.yyyy') : <RemoveIcon color={"secondary"}/>}</td>
                                    <td className={classes.min}>{i.avatar
                                        ? <SentimentSatisfiedAltIcon color={"primary"}/>
                                        : <RemoveIcon color={"secondary"}/>}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default observer(PeopleItem);