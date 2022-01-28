import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {HTTPS_PROTOCOL, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import pdf from "../../../../common/assets/image/icons/pdf.png";
import doc from "../../../../common/assets/image/icons/doc.png";
import docx from "../../../../common/assets/image/icons/docx.png";
import xls from "../../../../common/assets/image/icons/xls.png";
import xlsx from "../../../../common/assets/image/icons/xlsx.png";

const Icon = {xls, xlsx, doc, docx, pdf}

const useStyles = makeStyles((theme) => ({
    wrap: {
        marginBottom: 10,
        '& a': {
            margin: '3px 0',
            padding: '3px 0'
        },
        '& a:hover': {
            color: '#ff6200!important'
        },
    },
    docsItem: {
        display: "flex",
        alignItems: "center",
        margin: '5px 0',
        '& img': {
            height: 30,
            width: 'auto',
            marginRight: 10
        }
    },
    title: {
        overflow: "hidden"
    }
}))

const NewsViewItemDoc = ({item}) => {
    const classes = useStyles();
    const extension = item.doc.slice(item.doc.lastIndexOf(".") + 1)

    return (
        <div className={classes.wrap}>
            <a href={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${item.doc}`} target={'_blank'} rel="noreferrer">
                <div className={classes.docsItem}>
                    <img src={Icon[extension]} alt="" width={40}/>
                    <div className={classes.title}>{item.title}</div>
                </div>
            </a>
        </div>

    );
};

export default observer(NewsViewItemDoc);