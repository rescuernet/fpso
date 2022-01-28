import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction, toJS} from "mobx";
import {observer} from "mobx-react-lite";
import * as dateFns from "date-fns";

const useStyles = makeStyles((theme) => ({
    fieldsDates: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: '20px 0',
        '@media (max-width: 430px)' : {
            padding: "20px 0 0 0",
        },
    },
    fieldDate: {
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
        width: 180
    },
    fieldsText: {
        display: "flex",
        flexDirection: "column",
        '& > div': {
            marginBottom: 20
        }
    },
}))

const NewsFields = (props) => {
    const classes = useStyles();

    const newsOne = toJS(AdminNewsStore.newsOne)

    return (
        <>
            <div className={classes.fieldsDates}>
                <TextField
                    id="dateStart"
                    required={true}
                    label="Опубликовать с даты"
                    type="date"
                    value={newsOne?.dateStart ? dateFns.format(new Date(newsOne.dateStart), 'yyyy-MM-dd') : dateFns.format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e)=>{
                        runInAction(()=>{
                        AdminNewsStore.newsOne.dateStart = e.target.value
                        })
                    }}
                    className={classes.fieldDate}
                    variant={"outlined"}
                    InputLabelProps={{shrink: true,}}
                />
                <TextField
                    id="dateEnd"
                    label="Окончить публикацию"
                    type="date"
                    value={newsOne?.dateEnd && dateFns.format(new Date(newsOne.dateEnd), 'yyyy-MM-dd')}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.newsOne.dateEnd = e.target.value
                        })
                    }}
                    className={classes.fieldDate}
                    variant={"outlined"}
                    InputLabelProps={{shrink: true,}}
                />
            </div>
            <div className={classes.fieldsText} >
                <TextField
                    id="headerFirst"
                    required={true}
                    label="Заголовок"
                    value={newsOne?.headerFirst}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.newsOne.headerFirst = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    minRows={1}
                    maxRows={2}
                    error={newsOne?.headerFirst && newsOne?.headerFirst.length > 100}
                    helperText={newsOne?.headerFirst && newsOne?.headerFirst.length > 100 && 'максимум 100 символов'}
                />
                {/*<TextField
                    id="headerSecond"
                    label="Дополнительный заголовок"
                    value={newsOne?.headerSecond}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.newsOne.headerSecond = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    minRows={1}
                    maxRows={2}
                    error={newsOne?.headerSecond && newsOne?.headerSecond.length > 100}
                    helperText={newsOne?.headerSecond && newsOne?.headerSecond.length > 100 && 'максимум 100 символов'}
                />*/}
                <TextField
                    id="textMain"
                    required={true}
                    label="Текст новости"
                    value={newsOne.textMain}
                    onChange={(e)=>{
                        runInAction(()=>{
                            AdminNewsStore.newsOne.textMain = e.target.value
                        })
                    }}
                    variant="outlined"
                    multiline
                    minRows={3}
                    maxRows={10}
                />
            </div>
        </>
    );
};

export default observer(NewsFields);