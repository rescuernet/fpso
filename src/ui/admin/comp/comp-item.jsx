import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import * as dateFns from "date-fns";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import Store from '../../../bll/store';
import AdminCompStore from "../../../bll/admin/admin-competitions-store";
import {runInAction, toJS} from "mobx";
import {ADM_RM} from "../../../routes/admin-routes";
import {observer} from "mobx-react-lite";


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
    min: {
        width: 50,
        textAlign: "center",
        padding: '0 5px',
    },
    notPublished: {
        color: '#ff0000'
    }
}));

const CompItem = () => {

    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction(()=>{AdminCompStore.getComp()})
    },[])

    const comp = toJS(AdminCompStore.comp)

    const compEdit = (id) => {
        runInAction(()=>{AdminCompStore.clearData()})
        history.push(ADM_RM.Competitions__Edit.getUrl(id))
    }


    return (
        <table className={classes.table}>
            <tbody>
            {Store.width > 750 && comp &&
                <>
                    {Store.width > 1280 &&
                        <th className={classes.min}>создано</th>
                    }

                    <th></th>
                    <th>заголовок</th>
                    <th className={classes.min}>старт</th>
                    <th className={classes.min}>финиш</th>
                </>
            }
            {comp && comp.length > 0 && comp.map((i) => (
                <tr key={i._id} onClick={()=>{compEdit(i._id)}} id={i._id} className={!i.published ? classes.notPublished : null}>
                    {Store.width > 1280 && <td className={classes.min}>{dateFns.format(new Date(i.createdAt), 'dd.MM.yyyy')}</td>}
                    <td className={classes.min}>{i.published ? <VisibilityOutlinedIcon color={"primary"}/> : <VisibilityOffOutlinedIcon color={"secondary"}/>}</td>
                    <td>{i.headerFirst}</td>
                    {Store.width > 750 &&
                        <>
                            <td className={classes.min}>{dateFns.format(new Date(i.dateStart), 'dd.MM.yyyy')}</td>
                            <td className={classes.min}>{i.dateEnd ? dateFns.format(new Date(i.dateEnd), 'dd.MM.yyyy') : <RemoveIcon color={"primary"}/>}</td>
                        </>
                    }
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default observer(CompItem);