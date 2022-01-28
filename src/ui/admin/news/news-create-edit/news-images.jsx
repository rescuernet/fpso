import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import NewsImagesItem from "./news-images-item";

const useStyles = makeStyles((theme) => ({
    images: {
        padding: '20px 0'
    },
    imagesItemWrap: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    imageAdd: {
        display: "flex",
        justifyContent: "center",
    },
}))

const NewsImages = ({newsId}) => {
    const classes = useStyles();
    //загрузка фотографий
    const UploadImage = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('files',event.target.files[0]);
        data.append('newsId',newsId);
        runInAction( async () => {
            await runInAction(()=>{AdminNewsStore.newsImageCreate(data)})
        })
        event.target.value = ''
    };

    //удаление одной фоографии
    const DeleteOneImage = (imgId,imgName) => {
        runInAction(() => {
            AdminNewsStore.mediaDel.push(imgName)
            AdminNewsStore.newsOne.images.splice(imgId,1)
        })
    };

    return (
        <div className={classes.images}>
            <div className={classes.imagesItemWrap}>
                {AdminNewsStore.newsOne.images &&
                AdminNewsStore.newsOne.images.map((item,index)=>(
                    <NewsImagesItem key={'img'+index} item={item} index={index} DeleteOneImage={DeleteOneImage} newsId={newsId}/>
                ))
                }
            </div>
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
        </div>
    );
};

export default observer(NewsImages);