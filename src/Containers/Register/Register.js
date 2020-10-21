import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Copyright from '../../Components/Copyright/copyright'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {signIn, signUp} from "../../Store/actions/rootActions";
import {connect} from "react-redux";
import {ACCOUNT, LOGIN, MAIN, REGISTER} from "../../Route/path";
import {Link as LinkRouter} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {isTeacher} from "../../Store/helper";

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
  link: {
    color: theme.palette.text.secondary,
  }
});

class SignUp extends React.Component{
  constructor(props) {
    super(props);
    // привяжем намертво контекст
    this.handleInputChange = this.handleInputChange.bind(this);
    this.typeAuth = this.props.match.params.name;
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: {},
      showDialog: false,
      redirect: false
    }
  }
  // componentDidMount() {
  //   this.typeAuth = this.props.match.params.name;
  // }

  componentWillReceiveProps(nextProps, nextState) {
    this.typeAuth = nextProps.match.params.name;
    if (nextState.password !== '')
      this.setState({
        password: ''
      });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async onClickHandle() {
    let title = 'Ошибка ';
    try {
      if (this.typeAuth === 'reg') {
        title += 'регистрации';
        await this.props.signUpFirebase(
          this.state.firstName,
          this.state.lastName,
          this.state.email,
          this.state.password
        );

      } else {
        title += 'аутентификации';
        await this.props.signInFirebase(
          this.state.email,
          this.state.password
        )
      }
      this.setState({
        showDialog: true,
        redirect: true,
        message: {
          title: `Уважаемый, ${this.props.user.displayName}`,
          message: 'Добро пожаловать в систему прохождения тестов. Очень надеюсь вам понравиться!!!',
        }
      });
      // На этом этапе пользователь аутентифицировался, либо зарегистрировался
      // можем загрузить из бд все данные пока он вдупляет на окно приветсвия и ищет кнопку ОК

    } catch (e) {
      this.setState({
        showDialog: true,
        redirect: false,
        message: {...e, title},
      })
    }

  }
  handleCloseDialog() {
    this.setState({
      showDialog: false
    });
    if (this.state.redirect) {
      if (isTeacher(this.props.user.email))
        this.props.history.push(ACCOUNT);
      else
        this.props.history.push(MAIN);
    }
  };
  render () {
    const { classes } = this.props;

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
                <LinkRouter to={this.typeAuth === 'reg'? LOGIN : REGISTER} className={classes.link} activeclassname={classes.link} >
                  {this.typeAuth === 'reg' ? 'Уже зарегистрированы? Войти' : 'Не зарегистрированы? Регистрация'}
                </LinkRouter>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        <Dialog
          open={this.state.showDialog}
          onClose={()=>{this.handleCloseDialog()}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.message.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.message.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.handleCloseDialog()}} color="primary" autoFocus >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

}

function mapStateToProps(state) {
  return {
    error: state.error,
    user: state.user
  }
}


function mapDispatchToProps(dispatch) {
  return {
    signUpFirebase: (name, lname, email, password) => dispatch(signUp(name, lname, email, password)),
    signInFirebase: (email, password) => dispatch(signIn(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp))
