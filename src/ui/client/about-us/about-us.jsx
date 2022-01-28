import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import {runInAction, toJS} from "mobx";
import UiAboutUsStore from "../../../bll/ui/ui-about-us-store";
import {HTTPS_PROTOCOL, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../const/const";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 750,
        margin: '0 auto',
        padding: '20px 10px',
        fontFamily: 'Roboto',
        backgroundColor: '#fff'
    },
    header: {
        fontSize: '200%',
        textAlign: "center",
        marginBottom: 30,
        '@media (max-width: 750px)': {
            fontSize: '150%',
        },
        color: '#005580'
    },
    text: {
        textAlign: "justify",
        lineHeight: '1.5',
        marginBottom: 30
    },
    contact: {
        marginBottom: 20
    },
    img: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        fontSize: 0,
        '& a': {
            marginBottom: 20
        }
    }
}))

const AboutUs = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction(async () => {
            await UiAboutUsStore.aboutUsGet()
        })
    },[])

    const widthImg = 200

    const aboutUs = UiAboutUsStore.aboutUs

    return (
        <UiPageWrapper header={'О нас'}>
            <BpContainer>
                {aboutUs && (
                    <div className={classes.wrapper}>
                        <div className={classes.header}>{aboutUs.header}</div>
                        <div className={classes.text}>{aboutUs.text}</div>
                        <div className={classes.contact}>{aboutUs.address}</div>
                        <div className={classes.contact}>{aboutUs.telephone}</div>
                        <div className={classes.contact}>{aboutUs.email}</div>
                        {aboutUs.docs.length > 0 && aboutUs.docs.map((i)=>(
                            <div>{i.title}</div>
                        ))}
                        {aboutUs.img.length > 0 && (
                            <div className={classes.img}>
                                {aboutUs.img.map((i)=>(
                                    <a href={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${i}`} target={'_blank'}>
                                        <img src={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${i}`} alt="" width={widthImg}/>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(AboutUs);