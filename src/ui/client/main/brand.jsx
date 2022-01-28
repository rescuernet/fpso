import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Store from '../../../bll/store'
import brand from '../../../common/assets/image/brand.jpg'
import brandMob from '../../../common/assets/image/brand_mob.jpg'
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    brand: {
        marginBottom: 10,
        fontSize: 0,
        '& img': {
            width: '100%'
        }
    }
}))

const Brand = () => {

    const classes = useStyles();

    const width = Store.width

    return (
        <div className={classes.brand}>
            <img src={width >= 1281 ? brand : brandMob} alt=""/>
        </div>
    );
};

export default observer(Brand);