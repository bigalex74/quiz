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
    this.handleInputChange = this.handleInputChange.bind(this); // можно было воспользоваться стрелочной ф-ей. Это чисто в учебных целях
    this.typeAuth = this.props.match.params.name; // тип аутентификации - вход или регистрация
    this.state = {              // стейт компонента
      firstName: '',              // имя
      lastName: '',               // фамилия
      email: '',                  // е-mail
      password: '',               // пароль
      message: {},                // сообщение (либо ок, либо ошибка)
      showDialog: false,          // флаг показа диалогового окна
      redirect: false             // флаг, можно ли нам покинуть эту страницу
    }
  }

  // если пользователь ткнул на ссылку под полем ввода пароля (там мы предлагаем ему сменить тип аутентификации)
  componentWillReceiveProps(nextProps, nextState) {
    this.typeAuth = nextProps.match.params.name;    // меняем тип аутентификации
    if (nextState.password !== '')
      this.setState({
        password: ''                                // стираем пароль
      });
  }

  // при вводе с клавиатуры, сразу обновляем соответствующие значения в стейте
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // при нажатии на кнопку 'Зарегистрироваться'/'Войти'
  async onClickHandle() {
    let title = 'Ошибка ';                  // заголовок ошибки
    try {
      if (this.typeAuth === 'reg') {        // в зависимости от типа аутентификации
        title += 'регистрации';             // меняем заголовок ошибки
        await this.props.signUpFirebase(    // запрос на регистрацию нового пользователя в firebase
          this.state.firstName,
          this.state.lastName,
          this.state.email,
          this.state.password
        );

      } else {
        title += 'аутентификации';            // меняем заголовок ошибки
        await this.props.signInFirebase(      // запрос на вход зарегистрированного пользователя в firebase
          this.state.email,
          this.state.password
        )
      }
      this.setState({                           // если все отработало штатно и мы не получаем исключений
        showDialog: true,                       // покажем приветственное окно
        redirect: true,                         // после которого перейдем на другую станицу
        message: {                              // сообщение, которое покажем пользователю
          title: `Уважаемый, ${this.props.user.displayName}`,
          message: 'Добро пожаловать в систему прохождения тестов. Очень надеюсь вам понравиться!!!',
        }
      });
      // На этом этапе пользователь аутентифицировался, либо зарегистрировался
      // можем загрузить из бд все данные пока он вдупляет на окно приветсвия и ищет кнопку ОК

    } catch (e) {                                // если при аутентификации произошла ошибка
      this.setState({
        showDialog: true,                        // покажем ее пользователю
        redirect: false,                         // запрет на покидание этой страницы
        message: {...e, title},                  // сообщение, которое покажем пользователю
      })
    }
  }

  // при показе окна с сообщением для пользователя была нажата кнопка ОК
  handleCloseDialog() {
    this.setState({
      showDialog: false                           // уберем окно с экрана
    });
    if (this.state.redirect) {                    // если это приветственное окно об удачной аутентификации и нам разрешено закрыть эту страницк
      if (isTeacher(this.props.user.email))       // если это преподаватель, переходим в его личный кабинет
        this.props.history.push(ACCOUNT);
      else
        this.props.history.push(MAIN);            // если это студент, идем на главную страницу
    }
  };

  // функция блокировки/разблокировки кнопки аутентификации в зависимости от введенных значений в поля формы
  enableButton() {
    if (this.typeAuth === 'reg') {        // если это регистрация, то должны быть заполнены все поля
      return (
        this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.email !== '' &&
        this.state.password !== ''
      )
    } else {                              // если это обычный вход, то должны быть заполнены e-mail и пароль
      return (
        this.state.email !== '' &&
        this.state.password !== ''
      )
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
                  autoComplete="fname"                  // есть ли функция автозаполнения
                  name="firstName"                      // наименование поля
                  variant="outlined"                    // вариант представления. Здесь с рамкой
                  required                              // флаг, поле обязательно для заполнения
                  fullWidth                             // флаг, что поле будет занимать всю длину родителя
                  id="firstName"                        // идентификатор поля
                  label="Имя"                           // заголовок поля
                  autoFocus                             // флаг, что поле имеет автофокус
                  disabled={this.typeAuth === 'log'}    // поле заблокировано, если ип аутентификации не регистрация
                  value={this.state.firstName}          // значение поля
                  onChange={this.handleInputChange}     // функция, которая будет вызваапри вводе с клавиатуры
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
              disabled={!this.enableButton()}
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
    error: state.error,     // ошибка
    user: state.user        // зарегистрированный пользователь
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUpFirebase: (name, lname, email, password) => dispatch(signUp(name, lname, email, password)), // регистрация нового пользователя
    signInFirebase: (email, password) => dispatch(signIn(email, password))  // вход зарегистрированного пользователя
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp))
