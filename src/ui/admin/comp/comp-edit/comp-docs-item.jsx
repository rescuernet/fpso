import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
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
import {observer} from "mobx-react-lite";

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

//удаление одного документа
const DeleteOneDocs = (docsId,docsName) => {
    runInAction(() => {
        AdminCompStore.mediaDel.push(docsName)
        AdminCompStore.compOne.docs.splice(docsId,1)
    })
};

const CompDocsItem = (props) => {
    const classes = useStyles();
    const extension = AdminCompStore.compOne.docs[props.index].doc.slice(AdminCompStore.compOne.docs[props.index].doc.lastIndexOf(".") + 1)
    return (
        <div className={classes.item}>
            <TextField
                id="headerFirst"
                required={true}
                label="название документа"
                value={AdminCompStore.compOne.docs[props.index].title}
                onChange={(e) => {
                    runInAction(() => {
                        AdminCompStore.compOne.docs[props.index].title = (e.target.value)
                    })
                }}
                variant="outlined"
                multiline
                minRows={1}
                maxRows={10}
            />
            <a href={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${props.item.doc}`} target={'_blank'} rel="noreferrer">
                <img src={Icon[extension]} alt="" />
            </a>
            <Divider orientation={"vertical"} flexItem={true}/>
            <HighlightOffIcon onClick={() => {
                DeleteOneDocs(props.index,props.item.doc)
            }} color={'error'}/>
        </div>
    );
};

export default observer(CompDocsItem);
