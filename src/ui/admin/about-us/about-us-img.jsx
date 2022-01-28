import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";
import AdminAboutUSImgItem from "./about-us-img-item";


const useStyles = makeStyles((theme) => ({
    images: {
        '& > *': {
            marginBottom: 20
        },
        marginBottom: 20
    },
    itemWrap: {
        display: "flex",
        '@media (max-width: 750px)' : {
            justifyContent: "space-evenly",
        },
        flexWrap: "wrap",
    },
    imageAdd: {
        display: "flex",
        justifyContent: "center",
    },
}))

const AdminAboutUSImg = ({newsId}) => {
    const classes = useStyles();
    //загрузка фотографий
    const UploadImage = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        data.append('newsId',newsId);
        runInAction( async () => {
            await runInAction(()=>{AdminAboutUsStore.aboutUsImgCreate(data)})
        })
        event.target.value = ''
    };

    //удаление одной фоографии
    const DeleteOneImage = (imgId,imgName) => {
        runInAction(() => {
            AdminAboutUsStore.mediaDel.push(imgName)
            AdminAboutUsStore.aboutUs.img.splice(imgId,1)
        })
    };

    return (
        <div className={classes.images}>
            {AdminAboutUsStore.aboutUs.edit && (
                <div>Изображения</div>
            )}
            {AdminAboutUsStore.aboutUs.img.length > 0 && (
                <div className={classes.itemWrap}>
                    {
                        AdminAboutUsStore.aboutUs?.img.map((item,index)=>(
                            <AdminAboutUSImgItem key={'img'+index} item={item} index={index} DeleteOneImage={DeleteOneImage}/>
                        ))
                    }
                </div>
            )}
            {AdminAboutUsStore.aboutUs.edit && (
                <div className={classes.imageAdd}>
                    <label htmlFor="image">
                        <input
                            style={{ display: 'none' }}
                            id="image"
                            name="image"
                            type="file"
                            onChange={UploadImage}
                        />
                        <Button
                            color="primary"
                            size="small"
                            variant={"outlined"}
                            component={'span'}
                        >
                            добавить фотографию
                        </Button>
                    </label>
                </div>
            )}
        </div>
    );
};

export default observer(AdminAboutUSImg);