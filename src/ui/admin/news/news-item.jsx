import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import * as dateFns from "date-fns";
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import Store from '../../../bll/store';
import AdminNewsStore from "../../../bll/admin/admin-news-store";
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

const NewsItem = () => {

    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction(()=>{AdminNewsStore.getNews()})
    },[])

    const news = toJS(AdminNewsStore.news)

    const newsEdit = (id) => {
        runInAction(()=>{AdminNewsStore.clearData()})
        history.push(ADM_RM.News__Edit.getUrl(id))
    }


    return (
        <table className={classes.table}>
            <tbody>
            {Store.width > 750 && news &&
                <>
                    {Store.width > 1280 &&
                        <th className={classes.min}>создана</th>
                    }

                    <th></th>
                    <th>заголовок</th>
                    <th className={classes.min}>старт</th>
                    <th className={classes.min}>финиш</th>
                    <th className={classes.min}>закреплена</th>
                    <th className={classes.min}>важная</th>
                </>
            }
            {news && news.length > 0 && news.map((i) => (
                <tr key={i._id} onClick={()=>{newsEdit(i._id)}} id={i._id} className={!i.published ? classes.notPublished : null}>
                    {Store.width > 1280 && <td className={classes.min}>{dateFns.format(new Date(i.createdAt), 'dd.MM.yyyy')}</td>}
                    <td className={classes.min}>{i.published ? <VisibilityOutlinedIcon color={"primary"}/> : <VisibilityOffOutlinedIcon color={"secondary"}/>}</td>
                    <td>{i.headerFirst}</td>
                    {Store.width > 750 &&
                    <>
                        <td className={classes.min}>{dateFns.format(new Date(i.dateStart), 'dd.MM.yyyy')}</td>
                        <td className={classes.min}>{i.dateEnd ? dateFns.format(new Date(i.dateEnd), 'dd.MM.yyyy') : <RemoveIcon color={"primary"}/>}</td>
                        <td className={classes.min}>{i.fixedNews ? <CheckBoxOutlinedIcon color={"secondary"}/> : <CheckBoxOutlineBlankOutlinedIcon color={"primary"}/>}</td>
                        <td className={classes.min}>{i.importantNews ? <CheckBoxOutlinedIcon color={"secondary"}/> : <CheckBoxOutlineBlankOutlinedIcon color={"primary"}/>}</td>
                    </>
                    }
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default observer(NewsItem);