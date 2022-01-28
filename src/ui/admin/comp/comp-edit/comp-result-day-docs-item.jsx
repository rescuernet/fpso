import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Divider, TextField} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction} from "mobx";
import {HTTPS_PROTOCOL, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import pdf from "../../../../common/assets/image/icons/pdf.png";
import doc from "../../../../common/assets/image/icons/doc.png";
import docx from "../../../../common/assets/image/icons/docx.png";
import xls from "../../../../common/assets/image/icons/xls.png";
import xlsx from "../../../../common/assets/image/icons/xlsx.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        '& svg': {
            margin: '0 10px',
            fontSize: '200%',
            '@media (max-width: 750px)' : {
                fontSize: '150%',
            }
        },
        '& svg:hover': {
            cursor: 'pointer'
        },
        '& img': {
            width: 40,
            '@media (max-width: 750px)' : {
                width: 30
            },
        },
        '& a': {
            margin: '0 10px'
        },
        '& hr': {
            backgroundColor: '#ccc'
        },
        '& .MuiTextField-root': {
            flexGrow: 1
        },
    },
}))
const Icon = {xls, xlsx, doc, docx, pdf}

const CompResultDayDocsItem = ({item,indexDay,index}) => {
    const classes = useStyles();
    const extension = item.doc.slice(item.doc.lastIndexOf(".") + 1)

    //удаление одного документа
    const DeleteOneDocs = (docsName) => {
        AdminCompStore.mediaDel.push(docsName)
        runInAction(() => {AdminCompStore.compOne.results[indexDay].docs.splice(index,1)})
    };

    return (
        <div className={classes.item}>
            <TextField
                id="headerFirst"
                required={true}
                label="название документа"
                value={item.title}
                onChange={(e) => {
                    runInAction(() => {
                        AdminCompStore.compOne.results[indexDay].docs[index].title = (e.target.value)
                    })
                }}
                variant="outlined"
                multiline
                rows={1}
                rowsMax={10}
            />
            <a href={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${item.doc}`} target={'_blank'} rel="noreferrer">
                <img src={Icon[extension]} alt="" />
            </a>
            <Divider orientation={"vertical"} flexItem={true}/>
            <HighlightOffIcon onClick={() => {
                DeleteOneDocs(item.doc)
            }} color={'error'}/>
        </div>
    );
};

export default observer(CompResultDayDocsItem);