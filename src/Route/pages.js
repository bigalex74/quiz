import {ACCOUNT, LOGIN, MAIN, MILLIONAIRE, REGISTER} from "./path";
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const Pages = [
  {
    id: 'main',
    to: MAIN,
    title: 'Главная',
    exact: true,
    icon: <HomeIcon />
  },
  {
    id: 'account',
    to: ACCOUNT,
    title: 'Личный кабинет',
    exact: false,
    icon: <AccountBoxIcon/>
  },
  {
    id: 'login',
    to: LOGIN,
    title: 'Вход',
    exact: false,
    icon: <LockOpenIcon/>
  },
  {
    id: 'register',
    to: REGISTER,
    title: 'Зарегистрироваться',
    exact: false,
    icon: <PersonAddIcon/>
  },
  {
    id: 'millionaire',
    to: MILLIONAIRE,
    title: 'Кто хочет стать миллионером',
    exact: false,
    icon: <PersonAddIcon/>
  },
];
