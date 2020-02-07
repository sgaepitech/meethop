import React, { Component } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Avatar,
    Button,
    TextField, 
    Grid, 
    Link, 
    Typography,
    Dialog,
    DialogContent,
    FormControlLabel,
    Checkbox
} from '@material-ui/core/';
import Auth from '../auth/auth.component';

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
        }
    }

    handleEmailChange = (e) => {
        this.setState({
          email: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const User = { 
            email: this.state.email,
            password: this.state.password,
        };
        console.log('submit');
        console.log(User);
        fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(User),
        })
        .then(res => res.json())
        .then(res => localStorage.setItem('accessToken', res.token));

        // if(localStorage.getItem('accessToken') !== null) {
        //     Auth.login(() => {
        //         history.push('/main')
        //     })
        // }
    }

    render(){
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                <div>
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange.bind(this)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange.bind(this)}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </DialogContent>
            </Dialog>
        );
    }
}