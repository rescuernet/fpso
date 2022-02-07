import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import Rusada from "../rusada/rusada-poster";
import {runInAction} from "mobx";
import TeamItemDocs from "./team-item-docs";
import UiTeamStore from "../../../bll/ui/ui-team-store";


const useStyles = makeStyles((theme) => ({
    team: {
        display: "flex",
        justifyContent: "center"
    },
    wrapper: {
        width: 600,
        '@media (max-width: 750px)': {
            maxWidth: 360,
            padding: "0 10px"
        },
    },
    header: {
        fontSize: '150%',
        textAlign: "center",
        marginBottom: 40,
        '@media (max-width: 750px)': {
            fontSize: '130%',
        },
    },
    text: {
        marginBottom: 40
    }
}))

const Team = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction(async ()=>{
            await UiTeamStore.teamGet()
        })
    },[])

    const team = UiTeamStore.team

    return (
        <UiPageWrapper header={'Сборная'}>
            <BpContainer>
                <Rusada/>
                {team && (
                    <div className={classes.team}>
                        <div className={classes.wrapper}>
                            <div className={classes.header}>{`Сборная на ${team.year} год`}</div>
                            {team.text && (
                                <div className={classes.text}>{team.text}</div>
                            )}
                            {team.docs.map((i,index)=>(
                                <TeamItemDocs key={index} docs={i}/>
                            ))}
                        </div>
                    </div>
                )}
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(Team);