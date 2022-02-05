import React from 'react';
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import UiCompStore from "../../../../../bll/ui/ui-comp-store";
import CompViewResultsDay from "./comp-view-results-day";



const CompViewResults = (props) => {
    const results = toJS(UiCompStore.compOne.results)
    return (
        <>
            {results.map((item,index)=>(
                <CompViewResultsDay key={index+'Results'} index={index} item={item}/>
            ))}
        </>
    );
};

export default observer(CompViewResults);