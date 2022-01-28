import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction, toJS} from "mobx";
import {dateDifference} from "../../../../utils/dateDifference";
import CompResultDay from "./comp-result-day";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    results: {},
    headerWrap: {
        backgroundColor: '#e6e6e6',
        textAlign: "center",
        padding: '5px 0',
    },
    header: {
        fontSize: '110%',
        fontWeight: "bold"
    },
    docsDeclarationText: {
        fontSize: '90%',
        color: '#00000085',
    },
    add: {
        margin: '20px 0',
        textAlign: "center",
    }
}))

const CompResult = ({compId}) => {
    const classes = useStyles();

    const countCompDay = dateDifference(AdminCompStore.compOne.dateStart, AdminCompStore.compOne.dateEnd)

    const results = toJS(AdminCompStore.compOne.results)

    return (
        <>
            <div className={classes.results}>
                {results.map((item,index)=> (
                    <CompResultDay key={index} index={index} compId={compId} item={item}/>
                ))}
                {(!results || results.length < countCompDay) &&
                    <div className={classes.add}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={()=>{
                                runInAction(()=>{AdminCompStore.compOne.results.push({docs:[],videoTranslation:''})})}}
                        >
                            {`Создать данные ${results.length +1}-го дня`}
                        </Button>
                    </div>
                }
            </div>
        </>
    );
};

export default observer(CompResult);