import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {STORAGE_URL} from "../../../../const/const";

const useStyles = makeStyles((theme) => ({
    imagesItem: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
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

const NewsImagesItem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.imagesItem}>
            <HighlightOffIcon id={props.index} onClick={()=> {props.DeleteOneImage(props.index,props.item)}} color={'error'}/>
            <img src={`${STORAGE_URL}/crop_${props.item}`} alt=""/>
        </div>
    );
};

export default NewsImagesItem;