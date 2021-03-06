import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import AdminReferenceBooksStore from "../../../../../bll/admin/admin-reference-books-store";
import {STORAGE_URL} from "../../../../../const/const";

const useStyles = makeStyles((theme) => ({
    description: {
        textTransform: "uppercase",
        fontSize: '90%',
        marginBottom: 15,
        backgroundColor: '#ccc',
        padding: '3px 10px',
    },
    avatar: {
        border: '1px solid #ccc',
        marginBottom: 10
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
        marginBottom: 20,
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
        marginBottom: 20
    },
    avatarError: {
        color: '#ff0000',
    },
}))

const PeopleAvatar = () => {
    const classes = useStyles();

    // загрузка аватар
    const UploadAvatar = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction(async () => {
            await AdminReferenceBooksStore.peopleAvatarCreate(data)
            event.target.value = ''
        })
    };
    //удаление аватара
    const DeleteAvatar = () => {
        runInAction(() => {
            AdminReferenceBooksStore.mediaDel.push(AdminReferenceBooksStore.referenceBooks.people.one.avatar)
            AdminReferenceBooksStore.referenceBooks.people.one.avatar = ''
        })
    };

    const avatarIMG = `${STORAGE_URL}/${AdminReferenceBooksStore.referenceBooks.people.one.avatar}`


    return (
        <div className={classes.avatar} id={'avatar'}>
            <div className={classes.description}>аватар</div>
            {AdminReferenceBooksStore.referenceBooks.people.one.avatar &&
                <div className={classes.avatarControl}>
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
                </div>
            }
            {!AdminReferenceBooksStore.referenceBooks.people.one.avatar &&
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

export default observer(PeopleAvatar);