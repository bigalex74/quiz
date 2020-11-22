import {
  addAnswersInList,
  clearAnswersList, clearQuestionsList,
  delAnswersInList,
  setAnswersInList,
  setFirebasse,
} from "./actions";
// инициализация списка ответов для вопроса (key - ключ вопроса)
export function initAnswerList(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список ответов к вопросу
      let ref = db.ref('answers');
      // инициализация списка ответов в сторе
      dispatch(clearAnswersList());
      let answers = [];
      // отфильтруем список ответов по ключу вопрома и пробежимся по всем ответам
      ref.orderByChild("keyQuestion").equalTo(key).on("child_added", function (data) {
        const dv = data.val();
        const dk = data.key;
        answers.push({...dv, key: dk});
        // занесем очередной ответ в стор
        dispatch(setFirebasse({answers: [...answers]}));
      });
      resolve()
    })
  }
}
// добавление ответа (answer - данные ответа, keyQuestion - ключ вопроса)
export function addAnswer(answer, keyQuestion) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список ответов к вопросу
      let ref = db.ref('answers');
      // добавим вопрос в бд
      ref.push({...answer, keyQuestion: keyQuestion});
      // обновим вопрос в сторе
      dispatch(addAnswersInList(answer));
      resolve()
    })
  }
}
// редактирование ответа (answer - данные ответа, index - индекс ответа в списке)
export function setAnswer(answer, index) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      let key = answer.key;
      // получим ссылку в firebase на ответ к вопросу по ключу вопроса
      let ref = db.ref('answers/' + key);
      // обновим ответ в бд
      ref.update({...answer, key: null});
      // обновим ответ в сторе
      dispatch(setAnswersInList(answer, index));
      resolve()
    })
  }
}
// удаление ответа (answer - данные ответа)
export function delAnswer(answer) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      let key = answer.key;
      // получим ссылку в firebase на ответ к вопросу по ключу вопроса
      let ref = db.ref('answers/' + key);
      // удалим ответ в бд
      ref.remove();
      // удалим ответ в сторе
      dispatch(delAnswersInList(answer.tableData.id));
      resolve()
    })
  }
}
// удаление всех ответов вопроса (key - ключ вопроса)
export function delAllAnswersFromQuestion(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список ответов к вопросу
      let ref = db.ref('answers');
      // отфильтруем ответы по ключу вопроса и пробежимся по ним
      ref.orderByChild("keyQuestion").equalTo(key).on("child_added", function (data) {
        const dk = data.key;
        let ref = db.ref('answers/' + dk);
        // удалим вопрос из бд
        ref.remove();
      });
      resolve()
    })
  }
}
// получение всех ответов для вопроса (keyQuestion - ключ вопроса)
export function getAnswersFromQuestion(keyQuestion) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      // инициализация списка ответов в сторе
      dispatch(clearQuestionsList());
      // получим данные бд
      let {db} = getState();
      // получим ссылку в firebase на список ответов к вопросу
      let ref = db.ref('answers');
      let answers = [];
      // отфильтруем по ключу вопроса и пробежимся по списку ответов
      ref.orderByChild("keyQuestion").equalTo(keyQuestion).once("value").then(snapshot => {
        if (snapshot !== undefined && snapshot.val()) {
          Object.entries(snapshot.val()).forEach((key) => {
            answers.push({...key[1], key: key[0]})
          });
        }
        // обновим данные ответа в сторе
        dispatch(setFirebasse({answers: [...answers]}));
        resolve();
      });
    });
  }
}
