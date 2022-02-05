import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider, TextField} from "@material-ui/core";
import {runInAction} from "mobx";
import pdf from "../../../common/assets/image/icons/pdf.png";
import doc from "../../../common/assets/image/icons/doc.png";
import docx from "../../../common/assets/image/icons/docx.png";
import xls from "../../../common/assets/image/icons/xls.png";
import xlsx from "../../../common/assets/image/icons/xlsx.png";
import lxf from "../../../common/assets/image/icons/lxf.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {observer} from "mobx-react-lite";
import AdminTeamStore from "../../../bll/admin/admin-team-store";
import {STORAGE_URL} from "../../../const/const";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {moveItemDown, moveItemUp} from "../../../utils/up-down-item";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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
        '& .Mui-disabled': {
            color: '#000000de'
        }
    },
    move: {
        display: "flex",
        flexDirection: "column"
    }
}))

const Icon = {xls, xlsx, doc, docx, pdf, lxf}

const AdminTeamDocsItem = (props) => {
    const classes = useStyles();
    const extension = AdminTeamStore.team.docs[props.index].doc.slice(AdminTeamStore.team.docs[props.index].doc.lastIndexOf(".") + 1)

    //удаление одного документа
    const DeleteOneDocs = (docsId,docsName) => {
        runInAction(() => {
            AdminTeamStore.mediaDel.push(docsName)
            AdminTeamStore.team.docs.splice(docsId,1)
        })
    };

    return (
        <div className={classes.item}>
            <TextField
                id="headerFirst"
                required={true}
                label="название документа"
                value={AdminTeamStore.team.docs[props.index].title}
                onChange={(e) => {
                    runInAction(() => {
                        AdminTeamStore.team.docs[props.index].title = (e.target.value)
                    })
                }}
                variant="outlined"
                multiline
                minRows={1}
                maxRows={10}
                disabled={!AdminTeamStore.team.edit}
            />
            <a href={`${STORAGE_URL}/${props.item.doc}`} target={'_blank'} rel="noreferrer">
                <img src={Icon[extension]} alt="" />
            </a>
            {AdminTeamStore.team.edit && (
                <>
                    <Divider orientation={"vertical"} flexItem={true}/>
                    <HighlightOffIcon
                        onClick={() => {
                            DeleteOneDocs(props.index,props.item.doc)
                        }}
                        color={'error'}
                    />
                    {props.docsCount > 1 && (
                        <>
                            <Divider orientation={"vertical"} flexItem={true}/>
                            <div className={classes.move}>
                                {props.index > 0 && (
                                    <ArrowDropUpIcon onClick={()=>{moveItemUp(props.index,AdminTeamStore.team.docs)}}/>
                                )}
                                {props.index + 1 < props.docsCount && (
                                    <ArrowDropDownIcon onClick={()=>{moveItemDown(props.index,AdminTeamStore.team.docs)}}/>
                                )}
                            </div>
                        </>

                    )}
                </>
            )}
        </div>
    );
};

export default observer(AdminTeamDocsItem);
