import React, {Component} from 'react';
import classes from './Test.module.css'
import axios from 'axios';
import QuestionCaption from "../Components/QuestionCaption";
import QuestionImage from "../Components/QuestionImage";
import AnswerButtons from "../Components/AnswerButtons";
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';

// функция перемешивающая массив
function shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// по сути основной компонент, поазывающй окно с тестом
export default class Test extends Component {
    constructor(props) {
        super(props);
        // Опишем стейт теста (потом нужно перенести его в Redux)
        this.state = {
            currentQuestion: 0,                 // Текущий вопрос
            loader: false,                      // Флаг, говорящий о том, что мы показываем в данный момент (бублик или основное окно)
            questions: [                        // Список вопросов (для примера)
                {
                    question: "В каком институте каждый абитуриент рассказывает приёмной комиссии басню?",
                    image: null,                // Изображение, которое выводиться над вопросом
                    video: null,                // Видео, которое выводиться над вопросом
                    type: "single",             // Тип ответа (single - одиночный ответ, multi - множественный ответ)
                    correctAnswers: [1],        // Правильный ответ на вопрос
                    answers: [                  // Варианты ответоы
                        {caption: "В театральном", background: "#ffffff", color: "#63717D"},
                        {caption: "В экономическом", background: "#ffffff", color: "#63717D"},
                        {caption: "В техническом", background: "#ffffff", color: "#63717D"},
                        {caption: "В историко-архивном", background: "#ffffff", color: "#63717D"}
                    ],
                    userAnswers: []              // Пользовательский ответ
                }
            ]
        }
    }

    // метод, запрашивающий новый вопрос с сайта
    async newQuestion () {
        // Т.к. запрос на сайт, может идти долго, заблокируем кнопки
        this.setState({
            loader: true
        });
        // запрос
        const response = await axios.get('https://engine.lifeis.porn/api/millionaire.php?qType=1&count=1');
        if (response.status === 200) {  // если ответ имеет статус ок
            let question = {            // добавим в стейт новую запись
                type: "single",
                video: null,
                audio: null,
                answers: [],
                userAnswers: [],
                correctAnswers: []
            };
            let answers = [];
            for (let _question of response.data.data) {
                question.question = _question.question;     // добавм в стейт сам вопрос
                _question.answers.map(function (_answer, index) {       // в переменную answers, положим ответы
                    answers.push({
                        caption: _answer,                               // текст ответа
                        background: "#ffffff",                          // изначальный цвет кнопки (белый)
                        color: "#63717D",                               // цвет текста (черный)
                        index                                           // прорядковый индекс ответа
                    });
                    return null
                })
            }
            shuffle(answers);  // Перемешаем ответы
            question.answers = [...answers];                // добавим в стейт ответы
            // изначально, к нам приходят ответы с условием, что правильный стоит на первом месте
            // поэтому, если мы все ответы  перемешали, нам нужно подкорректировать и правильный ответ
            // Скорректируем правильный ответ
            for (let item in answers) {
                if (answers[item].index === 0) {
                    question.correctAnswers.push(+item);
                }
            }
            let questions = [...this.state.questions];
            questions.push(question);                       // добавим в стейт новую запись
            this.setState({                                 // обновим стейт
                currentQuestion: questions.length - 1,
                questions: questions,
            });

        }
        this.setState({                 // разблокируем кнопки
            loader: false
        });
    }

    // при первоначальном появлении страницы
    componentDidMount() {
        this.setState({             // инициализация стейта
            questions: []
        });
        this.newQuestion();         // получаем первый вопрос
        function sleep(milliseconds) {      // ф-ия, которая заставляет браузер заснуть на определенное время
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }
        sleep(1000);                // т.к, на сайте введено ограничение, что интервал между запросами
    }                               // должен быть более одной секунды, засыпаем на 1 секунду

    // обработка нажатия клика на кнопку с ответом
    onClick (idx) {
        this.setState({
            loader: true
        });
        let questions = [...this.state.questions];
        // Покажем на 1 секунду выбранный ответ (закрасим желтым цветом)
        questions[this.state.currentQuestion].answers[idx].background = "#ffeb3b";
        questions[this.state.currentQuestion].userAnswers.push(idx)
        ;
        this.setState({
            questions: questions,
        });
        setTimeout(()=>{
            // покрасим в зеленый цвет правильный ответ
            for (let item of questions[this.state.currentQuestion].correctAnswers) {
                for (let itemAnswer in questions[this.state.currentQuestion].answers) {
                    if (item === +itemAnswer) {
                        questions[this.state.currentQuestion].answers[item].background = "#47d549";
                        questions[this.state.currentQuestion].answers[item].color = "#fff"

                    }
                }
            }

            // если ответ пользователя и правильный ответ не совпадают,  перекрасим его в красеый цвет
            for (let item of questions[this.state.currentQuestion].userAnswers) {
                if (questions[this.state.currentQuestion].answers[item].background !== "#47d549") {
                    questions[this.state.currentQuestion].answers[item].background = "#ff5252";
                    questions[this.state.currentQuestion].answers[item].color = "#fff"
                }
            }
            this.setState({             //обновим стейт и покажем раскрашенные кнопки
                questions: questions,
            });
            setTimeout(() => this.newQuestion(), 1200);     // через 1,2 секунды, запросим новый вопрос
        }, 1000);
    }

    // отрисовка копонента
    render () {
        let page = null;
        if (this.state.questions.length > 0) {      // если в стейте есть хоть один вопрос
            page =
            <div className={classes.Test}>
                {/*картинка с логотипом игры    */}
                <QuestionImage/>
                {/*вопрос    */}
                <QuestionCaption
                    question = {this.state.questions[this.state.currentQuestion].question}>
                </QuestionCaption>
                {/*кнопки с ответами    */}
                <AnswerButtons
                    answers = {this.state.questions[this.state.currentQuestion].answers}
                    onClick = {this.onClick.bind(this)}
                    disabled = {this.state.loader}
                >
                </AnswerButtons>
                {/*кнопки помощь и результаты с подсказками при наведении    */}
                <div className={classes.Help}>
                    <Tooltip title="Помощь"
                             classes={{ tooltip: classes.customWidth }}
                             TransitionComponent={Zoom}
                             TransitionProps={{ timeout: 600 }}>
                        <IconButton  color="primary"
                                     onClick={() => { this.props.onHelpClick() }}>
                            <HelpOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Результаты"
                             classes={{ tooltip: classes.customWidth }}
                             TransitionComponent={Zoom}
                             TransitionProps={{ timeout: 600 }}>
                        <IconButton  color="primary"
                                     onClick={() => { this.props.onResultClick(this.state) }}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                {/*значок с номером вопроса    */}
                <div className={classes.avatar}>
                    <Avatar variant="circle" style={{
                        color: "#ffffff",
                        background: "#3153cf",
                        boxShadow: "rgba(0, 0, 0, 0.20) 4px 4px 5px, rgba(0, 0, 0, 0.22) 4px 4px 5px"
                    }}>
                        {this.state.currentQuestion + 1}
                    </Avatar>
                </div>
            </div>
        }
        return page
    }
}