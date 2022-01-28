import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction, toJS} from "mobx";
import {Button} from "@material-ui/core";
import CompResultDayDocsItem from "./comp-result-day-docs-item";

const useStyles = makeStyles((theme) => ({
    docsAdd: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20
    },
    header: {
        fontFamily: "Roboto",
        fontSize: '100%',
        fontWeight: 'bold',
        textAlign: "center",
        margin: '10px 0 20px 0'
    },
}))


const CompResultDayDocs = ({indexDay,compId}) => {
    const classes = useStyles();

    const docs = toJS(AdminCompStore.compOne.results[indexDay].docs)

    //загрузка документов
    const UploadResultsDocs = (event) => {
        event.preventDefault();
        const section = {
            name:'results',
            day: indexDay
        }
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        data.append('compId',compId);
        runInAction( async () => {
            await runInAction(()=>{AdminCompStore.compDocsCreate(data,originName,section)})
        })
    };

    return (
        <div>
            {docs.length > 0 &&
                <>
                    <div className={classes.header}>
                        Документы
                    </div>
                    {docs.map((item, index) => (
                        <CompResultDayDocsItem
                            key={index}
                            item={item}
                            index={index}
                            indexDay={indexDay}
                            compId={compId}/>
                    ))}
                </>
            }
            <div className={classes.docsAdd}>
                <label htmlFor={`${indexDay}resultsDocs`}>
                    <input
                        style={{ display: 'none' }}
                        id={`${indexDay}resultsDocs`}
                        name="resultsDocs"
                        type="file"
                        onChange={UploadResultsDocs}
                    />
                    <Button
                        color="primary"
                        size="small"
                        variant={"outlined"}
                        component={'span'}
                    >
                        добавить документ
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default observer(CompResultDayDocs);