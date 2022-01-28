import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import CompViewResultsDayDocs from "./comp-view-results-day-docs";
import YouTube from "react-youtube";
import Store from "../../../../../bll/store"
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    day: {
        marginBottom: 30
    },
    dayHeader: {
        backgroundColor: '#ff6000',
        color: '#fff',
        padding: 5,
        textAlign: "center",
        marginBottom: 20
    },
    docs: {
        marginBottom: 40
    },
    header: {
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 20
    },
    videoTranslation: {
        marginBottom: 20
    }
}))

const CompViewResultsDay = ({index,item}) => {
    const classes = useStyles();

    const opts = {
        height: Store.width > 750 ? '406px' : '168px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    return (
        <>
            <div className={classes.day}>
                <div className={classes.dayHeader}>
                    {`${index + 1}-й день соревнований`}
                </div>
                {item.docs.length > 0 &&
                    <div className={classes.docs}>
                        <div className={classes.header}>документы</div>
                        {item.docs.map((itemDoc,indexDoc)=>(
                            <CompViewResultsDayDocs key={indexDoc} index={indexDoc} item={itemDoc}/>
                        ))}
                    </div>
                }
                {item.videoTranslation &&
                    <div className={classes.videoTranslation}>
                        <div className={classes.header}>трансляция</div>
                        <YouTube videoId={item.videoTranslation} opts={opts}/>
                    </div>
                }
            </div>
            <Divider/>
        </>

    );
};

export default observer(CompViewResultsDay);