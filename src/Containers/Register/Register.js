import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {signUp} from "../../Store/actions/actions";
import {connect} from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Денисова Юлия Алексеевна
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component{
  constructor(props) {
    super(props);
    // привяжем намертво контекст
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }
  typeAuth = this.props.match.params.name;

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onClickHandle() {
    if (this.typeAuth === 'reg') {
      this.props.signUpFirebase(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password
      )
    }
    console.log(this.state);
  }

  render () {
    const { classes } = this.props;
    // console.log(classes);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.typeAuth === 'reg' ? 'Регистрация' : 'Авторизация'}
          </Typography>
          <form className={classes.form} onSubmit={(e) => {e.preventDefault();}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  disabled={this.typeAuth === 'log'}
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="lname"
                  disabled={this.typeAuth === 'log'}
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email адрес"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus={this.typeAuth === 'log'}
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onClickHandle.bind(this)}
            >
              {this.typeAuth === 'reg' ? 'Зарегистрироваться' : 'Войти'}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={this.typeAuth === 'reg'? "#" : "##"} variant="body2">
                  {this.typeAuth === 'reg' ? 'Уже зарегистрированы? Войти' : 'Не зарегистрированы? Регистрация'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

}

// function mapStateToProps(state) {
// }

function mapDispatchToProps(dispatch) {
  return {
    signUpFirebase: (name, lname, email, password) => dispatch(signUp(name, lname, email, password)),
  }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(SignUp))
