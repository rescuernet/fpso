import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import pdf from "../../../common/assets/image/icons/pdf.png";
import doc from "../../../common/assets/image/icons/doc.png";
import docx from "../../../common/assets/image/icons/docx.png";
import xls from "../../../common/assets/image/icons/xls.png";
import xlsx from "../../../common/assets/image/icons/xlsx.png";
import lxf from "../../../common/assets/image/icons/lxf.png";
import {STORAGE_URL} from "../../../const/const";

const useStyles = makeStyles((theme) => ({
    itemWrap: {
        display: "flex",
        marginBottom: 10
    },
    item: {
        display: "flex",
        alignItems: "center",
        '& img': {
            marginRight: 10
        }
    }
}))
const Icon = {xls, xlsx, doc, docx, pdf, lxf}

const JudgesOrdersItemDocs = ({docs}) => {
    const classes = useStyles();
    const extension = docs.doc.slice(docs.doc.lastIndexOf(".") + 1)

    return (
        <div className={classes.itemWrap}>
            <a href={`${STORAGE_URL}/${docs.doc}`} target={'_blank'} rel="noreferrer">
                <div className={classes.item}>
                    <img src={Icon[extension]} alt="" width={30}/>
                    <div className={classes.title}>{docs.title}</div>
                </div>
            </a>
        </div>
    );
};

export default observer(JudgesOrdersItemDocs);