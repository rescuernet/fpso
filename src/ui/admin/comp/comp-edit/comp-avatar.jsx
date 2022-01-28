import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {HTTPS_PROTOCOL, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    avatar: {
        paddingBottom: 20
    },
    img: {
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        position: "relative"
    },
    imgOrig: {
        zIndex: 1000,
        border: '1px solid #fff'
    },
    imgBackWrapper: {
        position: 'absolute',
        width: 300,
        height: 300,
        overflow: 'hidden'
    },
    imgBack: {
        filter: 'blur(30px)',
        height: 450
    },
    avatarAdd: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& > div': {
            marginTop: 15,
            color: '#ff0000',
            fontSize: 13,
            fontWeight: 'bold'
        },
        '& > label > span': {
            padding: '5px 15px',
            fontSize: '0.875rem'
        }
    },
    avatarControl: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatarError: {
        color: '#ff0000',
    },
}))

const CompAvatar = () => {
    const classes = useStyles();

    // загрузка аватар
    const UploadAvatar = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(async () => {
            await AdminCompStore.compAvatarCreate(data)
        })
        event.target.value = ''
    };
    //удаление аватара
    const DeleteAvatar = () => {
        runInAction(() => {
            AdminCompStore.mediaDel.push(AdminCompStore.compOne.avatar)
            AdminCompStore.compOne.avatar = ''
        })
    };

    const avatarIMG = `${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${AdminCompStore.compOne.avatar}`


    return (
        <div className={classes.avatar} id={'avatar'}>
            <div className={classes.avatarControl}>
                {AdminCompStore.compOne.avatar &&
                <>
                    <div className={classes.img}>
                        <img className={classes.imgOrig} src={avatarIMG} alt=""/>
                        <div className={classes.imgBackWrapper}>
                            <img className={classes.imgBack} src={avatarIMG} alt=""/>
                        </div>
                    </div>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        onClick={()=> {DeleteAvatar()}}
                    >
                        удалить аватар
                    </Button>
                </>
                }
            </div>
            {!AdminCompStore.compOne.avatar &&
            <div className={classes.avatarAdd}>
                <label htmlFor="avatarImage">
                    <input
                        style={{ display: 'none' }}
                        id="avatarImage"
                        name="avatarImage"
                        type="file"
                        onChange={UploadAvatar}
                    />
                    <Button
                        color="primary"
                        size="small"
                        variant={"outlined"}
                        component={'span'}
                    >
                        выбрать аватар
                    </Button>
                </label>
            </div>
            }
        </div>
    );
};

export default observer(CompAvatar);