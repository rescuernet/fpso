import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";
import Store from "./bll/store";
import {runInAction} from "mobx";
import {UI_RM} from "./routes/ui-routes"
import {useTheme} from "./utils/useTheme";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {ADM_RM} from "./routes/admin-routes";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ff6200',
        '& .MuiCircularProgress-root': {
            width: '100px!important',
            height: '100px!important'
        }
    }
}))

window.addEventListener("resize", (event) => {
    runInAction(() => {Store.width = window.outerWidth})
})


const App = () => {
    const Routes = []
    for (let key in UI_RM) {Routes.push(UI_RM[key])}
    for (let key in ADM_RM) {Routes.push(ADM_RM[key])}
    const classes = useStyles();

    useEffect(() => {
        if(localStorage.getItem('token')){
            runInAction(()=>{AuthStore.authMe()})
        }else{
            runInAction(() => {Store.isInit = true})
        }
    }, []);


    const [backdrop,setBackdrop] = useState(false);


    const isLoading = Store.isLoading
    const isInit = Store.isInit
    const isAuth = AuthStore.isAuth

    useEffect(() => {
        if(isLoading){
            setBackdrop(true)
        }else{
            const backdropTimeOut = setTimeout(() => {
                setBackdrop(false)
            }, 500);
            return () => clearTimeout(backdropTimeOut);
        }
    }, [isLoading]);

    return (
        <ThemeProvider theme={useTheme}>
            <div className="App">
                <Backdrop className={classes.backdrop} open={backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {isInit &&
                <Switch>
                    {Routes.map(({path,Component,auth}) => (auth === isAuth || !auth) && <Route key={path} exact path={path} component={Component}/>)}
                    <Redirect to={'/'}/>
                </Switch>
                }
            </div>
        </ThemeProvider>

    );
}

export default observer(App);
