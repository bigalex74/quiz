import {setFirebasse} from "./actions";

// Регистрация пользователя
export function signUp(name, lname, email, password) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      let {auth} = getState();
      // Создаем в firebase нового пользователя
      auth.createUserWithEmailAndPassword(email, password)
        .then(user=>{
          // если пользователь создан успешно, обновим его профиль
          auth.currentUser.updateProfile({
            displayName: name + ' ' + lname
          }).then(function() {
            // если все прошло успешно, обновим наш стор, указав ему нового пользователя
            dispatch(setFirebasse({auth, user: {...auth.currentUser, displayName: name + ' ' + lname}}));
            resolve()
          }, function(error) {
            // Если произошла ошибка обновления профиля
            console.log(error);
            reject(error);
          });
        })
        .catch(function(error) {
            // Ошибка создания пользователя (такой e-mail существует,...)
            dispatch(setFirebasse({error}));
            console.log(error.code);
            console.log(error.message);
            reject(error);
          }
        )
    })
      ;
  }
}

// Вход пользователя в систему
export function signIn(email, password) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let {auth} = getState();
      // запрос на аутентификацию пользователя в firebase
      auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
          // пользователь аутентифицирован, обновим данные в сторе
          dispatch(setFirebasse({auth, user: auth.currentUser}));
          resolve();
        })
        .catch(function(error) {
          // ошибка аутентификации (ошибка e-mail или пароля)
          dispatch(setFirebasse({error}));
          console.log(error.code);
          console.log(error.message);
          reject(error);
        })
    })
  }
}
// Выход пользователя из приложения
export function signOut() {
  return (dispatch, getState) => {
    let {auth} = getState();
    // запрос в firebase на выход из приложения
    auth.signOut()
      .then(()=>{
        // если все успешно, обновим данные в сторе
        dispatch(setFirebasse({auth, user: auth.currentUser}))
      })
      .catch(function(error) {
        // ошибка разлогирования
        dispatch(setFirebasse({error}));
        console.log(error.code);
        console.log(error.message);
      })
  }
}
