import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";
import {STORAGE_URL} from "../../../const/const";

const useStyles = makeStyles((theme) => ({
    imagesItem: {
        position: "relative",
        display: "flex",
        margin: '0 10px 20px 10px',
        '& svg': {
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            backgroundColor: '#fff',
            borderRadius: 16,
            fontSize: '200%'
        },
        '& svg:hover': {
            cursor: 'pointer'
        }
    },
}))

const AdminAboutUSImgItem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.imagesItem}>
            {AdminAboutUsStore.aboutUs.edit && (
                <HighlightOffIcon id={props.index} onClick={()=> {props.DeleteOneImage(props.index,props.item)}} color={'error'}/>
            )}
            <img src={`${STORAGE_URL}/crop_${props.item}`} alt=""/>
        </div>
    );
};

export default AdminAboutUSImgItem;