import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";
import Store from "./bll/store";
import {runInAction} from "mobx";
import {UI_RM} from "./routes/ui-routes"
import {useTheme} from "./utils/useTheme";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {ADM_RM} from "./routes/admin-routes";

const useStyles = makeStyles((theme) => ({}))

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
        }
    }, []);

    const isAuth = AuthStore.isAuth

    return (
        <ThemeProvider theme={useTheme}>
            <div className="App">
                <Switch>
                    {Routes.map(({path,Component,auth}) => (auth === isAuth || !auth) && <Route key={path} exact path={path} component={Component}/>)}
                    <Redirect to={'/'}/>
                </Switch>
            </div>
        </ThemeProvider>

    );
}

export default observer(App);
