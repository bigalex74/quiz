import {addQuizInList, delQuizInList, setFirebasse, setQuizInList} from "./actions";
import {delAllQuestionsFromQuiz} from "./questionFirebase";

// Добавить тест в список (quiz - данные теста)
export function addQuiz(quiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд и зарегистрированного пользователя
      let {db, user} = getState();
      // получим ссылку в firebase на список тестов
      let ref = db.ref('quiz');
      // добавим тест в бд
      ref.push({...quiz, uid: user.uid});
      // добавим тест в стор
      dispatch(addQuizInList(quiz));
      resolve()
    })
  }
}
// модификация теста (quiz - данные теста, index - номер теста в списке)
export function setQuiz(quiz, index) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      let key = quiz.key;
      // получим ссылку на тест по ключу
      let ref = db.ref('quiz/'+key);
      // обновим данные теста в бд
      ref.update({...quiz, key: null});
      // обновим данные теста в сторе
      dispatch(setQuizInList(quiz, index));
      resolve()
    })
  }
}
// удаление теста (quiz - данные теста)
export function delQuiz(quiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      let key = quiz.key;
      // получим ссылку на тест по ключу
      let ref = db.ref('quiz'+key);
      // удалим тест из бд
      ref.remove();
      // удалим из стора все вопросы, относящиеся к этому тесту
      dispatch(delAllQuestionsFromQuiz(key));
      // удалим из стора сам тест
      dispatch(delQuizInList(quiz.tableData.id));
      resolve()
    })
  }
}
// инициализация списка тестов для залогиненного пользователя (в качестве преподователя)
export function initDataUser() {
  return (dispatch, getState) => {
    // инициализация списка тестов в сторе
    dispatch(setFirebasse({listQuizes: []}));
    // получим данные бд и зарегистрированного пользователя
    let {db, user} = getState();
    // получим ссылку в firebase на список тестов
    let ref = db.ref('quiz');
    let listQuizes = [];
    // получим из бд все тесты, которые относятся к данному пользователю
    ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(data) {
      const dv = data.val();
      const dk = data.key;
      listQuizes.push({...dv, key: dk});
      // сформированный список тестов занесем в стор
      dispatch(setFirebasse({listQuizes: [...listQuizes]}));
    });
  }
}
// получение всех тестов (для пользователей - студентов)
export function getAllQuiz() {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // инициализация списка тестов в сторе
      dispatch(setFirebasse({listQuizes: []}));
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список тестов
      let ref = db.ref('quiz');
      let listQuizes = [];
      // получим из бд все тесты, которые там есть
      ref.once("value").then(snapshot => {
        Object.entries(snapshot.val()).forEach((key) => {
          // Уберем из списка приватные тесты
          if (key[1].access !== 2)
            listQuizes.push({...key[1], key: key[0]})
        });
        // сформированный список тестов занесем в стор
        dispatch(setFirebasse({listQuizes: [...listQuizes]}));
        resolve();
      });
    });
  }
}
