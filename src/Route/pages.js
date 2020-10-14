import {ACCOUNT, LOG, MAIN, REGISTER} from "./path";

export const Pages = [
  {
    to: MAIN,
    title: 'Главная',
    exact: true
  },
  {
    to: ACCOUNT,
    title: 'Личный кабинет',
    exact: false
  },
  {
    to: LOG,
    title: 'Вход',
    exact: false
  },
  {
    to: REGISTER,
    title: 'Зарегистрироваться',
    exact: false
  },
];
