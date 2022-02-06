import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import {runInAction} from "mobx";
import UiAboutUsStore from "../../../bll/ui/ui-about-us-store";
import {STORAGE_URL} from "../../../const/const";
import AboutUsItemDocs from "./about-us-item-docs";

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
        marginBottom: 40,
        '@media (max-width: 750px)': {
            fontSize: '150%',
        },
        color: '#005580'
    },
    text: {
        textAlign: "justify",
        lineHeight: '1.5',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottom: '1px solid #c4c4c4'
    },
    contact: {
        marginBottom: 40,
        paddingBottom: 20,
        borderBottom: '1px solid #c4c4c4'
    },
    contactItem: {
        marginBottom: 20
    },
    docs: {
        marginBottom: 40,
        paddingBottom: 20,
        borderBottom: '1px solid #c4c4c4'
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
                        {aboutUs.text && (
                            <div className={classes.text}>{aboutUs.text}</div>
                        )}

                        <div className={classes.contact}>
                            <div className={classes.contactItem}>{aboutUs.address}</div>
                            <div className={classes.contactItem}>{aboutUs.telephone}</div>
                            <div className={classes.contactItem}>{aboutUs.email}</div>
                        </div>

                        {aboutUs.docs.length > 0 && (
                            <div className={classes.docs}>
                                {aboutUs.docs.map((i,index)=>(
                                    <AboutUsItemDocs key={index} docs={i}/>
                                ))}
                            </div>
                        )}
                        {aboutUs.img.length > 0 && (
                            <div className={classes.img}>
                                {aboutUs.img.map((i)=>(
                                    <a href={`${STORAGE_URL}/${i}`} target={'_blank'} rel="noreferrer">
                                        <img src={`${STORAGE_URL}/${i}`} alt="" width={widthImg}/>
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