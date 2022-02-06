import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import RusadaDocsItem from "./rusada-docs-item";
import AdminRusadaStore from "../../../bll/admin/admin-rusada-store";

const useStyles = makeStyles((theme) => ({}))

const RusadaDocs = (props) => {
    const classes = useStyles();

    const docs = AdminRusadaStore.rusada?.docs

    return (
        <div className={classes.docs}>
            {
                docs.map((item,index)=>(
                    <RusadaDocsItem key={'docs'+index} item={item} index={index} /*docsCount={docsCount}*//>
                ))
            }
        </div>
    );
};

export default observer(RusadaDocs);