import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import CompResultItemDocs from "./comp-result-day-docs";
import {TextField} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction} from "mobx";

const useStyles = makeStyles((theme) => ({
    compDay: {
        border: '1px solid #0095e1',
        padding: '0 10px',
        marginBottom: 20,
    },
    header: {
        fontFamily: "Roboto",
        fontSize: '100%',
        fontWeight: 'bold',
        textAlign: "center",
        margin: '10px 0',
    },
    videoTranslation: {
        display: "flex",
        '& .MuiTextField-root': {
            flexGrow: 1
        },
        marginBottom: 20
    },
}))

const CompResultDay = ({index,compId,item}) => {

    const classes = useStyles();

    return (
        <div className={classes.compDay}>
            <div className={classes.header}>
                {`${index +1}-й день соревнований`}
            </div>
            <div className={classes.videoTranslation}>
                <TextField
                    id="videoTranslation"
                    required={true}
                    label="ссылка на трансляцию"
                    value={item?.videoTranslation || ""}
                    onChange={(e) => {
                        runInAction(() => {
                            AdminCompStore.compOne.results[index].videoTranslation = (e.target.value)
                        })
                    }}
                    variant="outlined"
                    multiline
                    rows={1}
                    rowsMax={1}
                />
            </div>

            <CompResultItemDocs indexDay={index} compId={compId}/>
        </div>
    );
};

export default observer(CompResultDay);