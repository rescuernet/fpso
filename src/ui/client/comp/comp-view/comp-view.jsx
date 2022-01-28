import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import UiCompStore from "../../../../bll/ui/ui-comp-store";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {HTTPS_PROTOCOL, YA_CRM_BUCKET, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import s from "./comp-view.module.css"
import * as dateFns from "date-fns";
import CompViewDocs from "./comp-view-docs";
import CompViewResults from "./comp-view-results/comp-view-results";
import UiPageWrapper from "../../ui-page-wrapper";
import BpContainer from "../../bp-container";
import Store from "../../../../bll/store";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        minHeight: '100%'
    },
    comp: {
        width: 720,
        '@media (max-width: 750px)': {
            width: 340,
        },
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        display: "flex",
        marginBottom: 20,
        height: 300,
        '@media (max-width: 750px)': {
            flexDirection: 'column',
            height: 'auto',
        },
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: '0 20px 0 0',
        fontSize: 0,
        '@media (max-width: 750px)': {
            margin: '0 0 20px 0',
        },
    },
    img: {
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
    },
    imgOrig: {
        zIndex: 1000,
        border: '1px solid #fff'
    },
    imgBackWrapper: {
        position: 'absolute',
        width: 300,
        height: 300,
        overflow: 'hidden',
    },
    imgBack: {
        filter: 'blur(20px)',
        height: 450
    },
    dateWrap: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    },
    date: {
        textAlign: "center",
        backgroundColor: '#ff6000',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        padding: '5px 0',
    },
    location: {
        padding: '5px 5px 15px 5px',
        marginBottom: 10,
        borderBottom: '1px solid #ccc'
    },
    headerFirstWrap: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    },
    headerFirst: {
        fontSize: '130%',
        fontWeight: 700,
        lineHeight: '1.5',
        '@media (max-width: 750px)': {
            margin: 0,
            lineHeight: 'normal',
        },
    },
    text: {
        fontSize: '110%',
        lineHeight: '1.8',
        marginBottom: 20
    },
    docs: {
        marginTop: 10
    },
    docsHeader: {
        fontWeight: 'bold',
        textAlign: "center"
    },

})

const CompView = (props) => {
    const classes = useStyles();
    const comp = toJS(UiCompStore.compOne)
    const { id } = useParams();

    useEffect(()=>{
        runInAction(()=>{
            UiCompStore.getCompId(id)
        })
        return ()=> {
            runInAction(()=>{
                UiCompStore.compOne = null
            })
        }
    },[id])

    const avatarIMG = comp?.avatar && `${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${comp.avatar}`

    return (
        <UiPageWrapper header={'Соревнования'}>
            <BpContainer>
                {comp && (
                    <div className={classes.root}>
                        <div className={classes.comp}>
                            <div className={classes.header}>
                                <div className={classes.avatar}>
                                    {
                                        comp.avatar
                                            ? <div className={classes.img}>
                                                <img className={classes.imgOrig} src={avatarIMG} alt=""/>
                                                <div className={classes.imgBackWrapper}>
                                                    <img className={classes.imgBack} src={avatarIMG} alt=""/>
                                                </div>
                                            </div>
                                            : <img src={`${HTTPS_PROTOCOL}${YA_CRM_BUCKET}.${YA_ENDPOINT}/nocompavatar.jpg`} alt="" />
                                    }
                                </div>
                                <div className={classes.dateWrap}>
                                    <div className={classes.date}>
                                        {comp.dateStart === comp.dateEnd
                                            ? dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')
                                            : `${dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')} - ${dateFns.format(new Date(comp.dateEnd), 'dd.MM.yyyy')}`}
                                    </div>
                                    <div className={classes.location}>
                                        <div>{comp.location.name}</div>
                                        <div>{comp.location.address}</div>
                                    </div>
                                    <div className={classes.headerFirstWrap}>
                                        <div className={`${classes.headerFirst} ${s.headerText}`}>
                                            {comp.headerFirst}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Divider/>
                            <div className={classes.text}>{comp.textMain}</div>
                            <Divider/>

                            {comp.docs.length > 0 &&
                                <>
                                    <div className={classes.docs}>
                                        <div className={classes.docsHeader}>Документы соревнования</div>
                                        {comp.docs.map((item,index)=>(
                                            <CompViewDocs key={index} index={index} item={item} compId={id}/>
                                        ))}
                                    </div>
                                    <Divider/>
                                </>
                            }

                            {comp.results.length > 0 &&
                                <CompViewResults/>
                            }
                        </div>
                    </div>
                )}
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(CompView);