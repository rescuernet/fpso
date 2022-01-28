import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {runInAction, toJS} from "mobx";
import PoolsItem from "./pools-item";
import {useHistory} from "react-router-dom";
import {ADM_RM} from "../../../../routes/admin-routes";
import AdminReferenceBooksStore from "../../../../bll/admin/admin-reference-books-store";
import AdminPageWrapper from "../../admin-page-wrapper";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600
    },
    control: {
        marginBottom: 20,
        '@media (max-width: 600px)' : {
            marginTop: 20
        },
    },
    pool: {
        marginBottom: 20,
    },
}))

const Pools = (props) => {
    const classes = useStyles();
    const history = useHistory()

    useEffect(()=>{
        runInAction(async ()=>{
            await AdminReferenceBooksStore.poolsGet()
        })
    },[])

    const create = () => {
        runInAction(async ()=>{
            const response = await AdminReferenceBooksStore.poolsCreate()
            response === 'OK'
                ? history.push(ADM_RM.Reference__Books__Pool_Edit.getUrl(AdminReferenceBooksStore.referenceBooks.pools.id))
                : history.push(ADM_RM.Reference__Books__Pool.path)
        })
    }

    const pool = toJS(AdminReferenceBooksStore.referenceBooks.pools.list)

    return (
        <AdminPageWrapper title={'Бассейны'}>
            <div className={classes.wrapper}>
                <div className={classes.control}>
                    <Button variant={"contained"} color={"primary"} onClick={()=>{create()}}>Добавить новый</Button>
                </div>
                <div className={classes.pool}>
                    {pool &&
                        pool.map((item,index)=>(
                            <PoolsItem key={'referenceItem'+index} item={item} index={index}/>
                        ))
                    }
                </div>
            </div>
        </AdminPageWrapper>
    );
};

export default observer(Pools);