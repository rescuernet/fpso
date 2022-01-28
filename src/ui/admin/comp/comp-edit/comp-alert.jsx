import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minWidth: 300,
        boxShadow: '0px 0px 5px 1px rgb(255 0 0 / 100%)'
    },
}));

export const CompAlertDialog = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(props.open);

    const handleClose = () => {
        if(props.alertType === 'confirm'){
            setOpen(false)
            setTimeout(props.close,500)
        }else{
            AdminCompStore.tmp_errors = null
            setOpen(false);
        }

    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{paper: classes.dialogPaper}}
        >
            <DialogTitle style={{color: '#ff0000'}}>{props.header}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Закрыть
                </Button>
                {props.alertType === 'confirm' &&
                    <Button onClick={props.delete} color="secondary">
                        Удалить
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}
