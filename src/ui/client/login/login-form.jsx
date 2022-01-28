import React, {useState} from 'react';
import {Box, Button, TextField} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../bll/auth-store";
import {Redirect} from "react-router-dom";
import {runInAction} from "mobx";
import {makeStyles} from "@material-ui/core/styles";
import {ADM_RM} from "../../../routes/admin-routes";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";

const useStyles = makeStyles((theme) => ({
    login: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 340,
        margin: '0 auto',

    },
    textField: {
        marginBottom: 20
    },
    authError: {
        margin: '20px 0',
        color: '#999',
        fontFamily: 'Roboto'
    }
}))

const LoginForm = () => {
    const classes = useStyles()

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    if(AuthStore.isAuth){return <Redirect to={ADM_RM.News.path}/>}
    const authError = AuthStore?.authError?.data?.message

    const clearAuthError = () => {
        if(authError){
            runInAction(() => {AuthStore.authError = {}})
        }
    }

    const onKeyDown = (event) => {
        if(event.key === 'Enter'){
            AuthStore.login(email,password)
        }
    }


    return (
        <UiPageWrapper header={'Авторизация'}>
            <BpContainer>
                <div className={classes.login}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            className={classes.textField}
                            id="login"
                            label="логин"
                            variant="outlined"
                            autoComplete='off'
                            value={email}
                            fullWidth={true}
                            onChange={(e)=>setEmail(e.target.value)}
                            error={!!authError}
                            onFocus={()=>{clearAuthError()}}
                        />
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="password"
                            variant="outlined"
                            type="password"
                            autoComplete='new-password'
                            value={password}
                            fullWidth={true}
                            onChange={(e)=>setPassword(e.target.value)}
                            error={!!authError}
                            onFocus={()=>{clearAuthError()}}
                            onKeyDown={onKeyDown}
                        />
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => AuthStore.login(email,password)}
                    >
                        Войти
                    </Button>
                    {authError &&
                        <div className={classes.authError}>{authError}</div>
                    }
                </div>
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(LoginForm);