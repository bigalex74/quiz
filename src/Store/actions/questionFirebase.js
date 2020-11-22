import {
  addQuestionsInList,
  clearQuestionsList,
  delQuestionsInList,
  setFirebasse, setQuestionsInList,
} from "./actions";
import {delAllAnswersFromQuestion} from "./answerFirebase";

// инициализация списка вопросов теста (key - ключ теста)
export function initQuestionsList(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список вопросов к тесту
      let ref = db.ref('questions');
      // инициализация вопросов
      dispatch(clearQuestionsList());
      let questions = [];
      // отфильтруем список вопросов по ключу теста
      ref.orderByChild("keyQuiz").equalTo(key).on("child_added", function (data) {
        const dv = data.val();
        const dk = data.key;
        questions.push({...dv, key: dk});
        // занесем в стор полученные вопросы
        dispatch(setFirebasse({questions: [...questions]}));
      });
      resolve()
    })
  }
}
// добавление вопроса в списка вопросов теста (question - данные вопроса, keyQuiz - ключ теста)
export function addQuestion(question, keyQuiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список вопросов к тесту
      let ref = db.ref('questions');
      // добавим вопрос в бд
      ref.push({...question, keyQuiz: keyQuiz});
      // добавим вопрос в стор
      dispatch(addQuestionsInList(question));
      resolve()
    })
  }
}
// редактирование вопроса в списке вопросов теста (question - данные вопроса, index - индекс вопроса в списке)
export function setQuestion(question, index) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      let key = question.key;
      // получим ссылку в firebase на вопрос к тесту по ключу вопроса
      let ref = db.ref('questions/' + key);
      // обновим данные в бд
      ref.update({...question, key: null});
      // обновим данные в сторе
      dispatch(setQuestionsInList(question, index));
      resolve()
    })
  }
}
// удаление вопроса из списка вопросов теста (question - данные вопроса)
export function delQuestion(question) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      let key = question.key;
      // получим ссылку в firebase на вопрос к тесту по ключу вопроса
      let ref = db.ref('questions/' + key);
      // удалим вопрос из бд
      ref.remove();
      // удалим все ответы на данный вопрос
      dispatch(delAllAnswersFromQuestion(key));
      // удалим вопрос из стора
      dispatch(delQuestionsInList(question.tableData.id));
      resolve()
    })
  }
}
// удаление всех вопросов теста (key - ключ теста)
export function delAllQuestionsFromQuiz(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список вопросов к тесту
      let ref = db.ref('questions');
      // пробежимся по всем вопросам
      ref.orderByChild("keyQuiz").equalTo(key).on("child_added", function (data) {
        const dk = data.key;
        let ref = db.ref('questions/' + dk);
        // удалим сам вопрос из бд
        ref.remove();
        // удалим все ответы на этот вопрос из бд
        dispatch(delAllAnswersFromQuestion(dk));
      });
      resolve()
    })
  }
}
// получение всех вопросов для конкретного теста (keyQuiz - ключ теста)
export function getQuestionsFromQuiz(keyQuiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // инициализация (очистка) вопросов в сторе
      dispatch(clearQuestionsList());
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список вопросов к тесту
      let ref = db.ref('questions');
      let questions = [];
      // отфильтруем вопросы по ключу теста и пробежимся по ним
      ref.orderByChild("keyQuiz").equalTo(keyQuiz).once("value").then(snapshot => {
        if (snapshot !== undefined && snapshot.val()) {
          Object.entries(snapshot.val()).forEach((key) => {
            questions.push({...key[1], key: key[0]})
          });
        }
        // занесем найденные вопросы в стор
        dispatch(setFirebasse({questions: [...questions]}));
        resolve();
      });
    });
  }
}
