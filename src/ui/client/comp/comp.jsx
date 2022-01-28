import React, {useEffect} from 'react';
import {runInAction, toJS} from "mobx";
import UiCompStore from '../../../bll/ui/ui-comp-store'
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../../bll/store";
import {Pagination} from "@material-ui/lab";
import {useHistory, useParams} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";
import CompItem from "./comp-item";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import Rusada from "../rusada/rusada-poster";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "space-around",
        '@media (max-width: 1280px)': {
            justifyContent: "space-around",
        },
        flexWrap: "wrap",
        marginTop: 20,
    },
    paginationTop: {
        display: "flex",
        justifyContent: "center",
        margin: '40px 0',
        '@media (max-width: 750px)': {
            margin: '20px 0',
        },
    },
    paginationBottom: {
        display: "flex",
        justifyContent: "center",
        margin: '20px 0 40px 0'
    }
}))

const Comp = () => {

    const history = useHistory()
    const {page} = useParams()

    const pagesCount = toJS(UiCompStore.comp.pages)
    const pageCur = toJS(UiCompStore.comp.page)
    const compItem = toJS(UiCompStore.comp.docs)

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiCompStore.getComp(page)})
        return ()=> {runInAction(()=>{UiCompStore.comp = []})}
    },[page])

    const ChangePage = (e, toPage) => {
        window.scrollTo(0,0)
        history.push(UI_RM.Competitions__Page.getUrl(toPage))
    };

    return (
        <UiPageWrapper header={'Соревнования'}>
            <BpContainer>
                <Rusada/>
                {compItem &&
                    <>
                        {pagesCount > 1 &&
                            <div className={classes.paginationTop}>
                                <Pagination
                                    count={pagesCount}
                                    page={pageCur}
                                    color={"primary"}
                                    size={Store.width < 750 ? 'small' : 'medium'}
                                    onChange={ChangePage}
                                />
                            </div>
                        }
                        <div className={classes.wrapper}>
                            {compItem.map((i,index)=> <CompItem key={index} comp={i} index={index} />)}
                        </div>
                        {pagesCount > 1 &&
                            <div className={classes.paginationBottom}>
                                <Pagination
                                    count={pagesCount}
                                    page={pageCur}
                                    color={"primary"}
                                    size={Store.width < 750 ? 'small' : 'medium'}
                                    onChange={ChangePage}
                                />
                            </div>
                        }
                    </>
                }
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(Comp);