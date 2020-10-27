import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// описание слилей для текущей страницы
const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        height: 600,
        margin: "auto",
        boxShadow: "0 14px 28px rgba(0, 0, 0, 0.75), 10px 10px 7px rgba(0, 0, 0, 0.22)",
        transition: "all 0.3s cubic-bezier(.25, .8, .25, 1)",
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.0001) 16.73%), #E9EDF1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"

},
    paper: {
        width: "90%",
        height: "78%",
        margin: 20,
        padding: 20,
        '& h3': {
            textAlign: "center",
            fontSize: 24,
        },
        '& p': {
            fontSize: 20,
            lineHeight: "120%",
            color: "#282D37",
        },
        '& span': {
            color: "#00bfa5",
            fontWeight: 400
        }
    },
}));

// страница, показывающая помощь
const HelpPage = function (props) {
    const classes = useStyles();        // будем использовать стили в рамках Material-UI
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <h3>
                    Правила и цели тестирования
                </h3>
                <p>
                    Данный тест основан на игре - викторине <span>Кто хочет стать миллионером?</span>
                    Цель викторины:  правильно ответить на ряд вопросов с несколькими вариантами ответов.
                    Вопросы структурированы в соответствии с единственным начальным уровнем и имеют
                    одинаковую сложность.
                </p>
                <p>
                    Цель написания данного теста - создание сайта на фреймворке <span>React</span>. Показать
                    основные приемы и возможности данного фреймворка. Все вопросы формируются
                    средствами <span>Rest API</span> запросов. Дизайн разработан
                    посредством <span>Material UI</span> компонент.
                </p>
                <p>
                    Данный проект был разработан в рамках курсовой работы по теме: <span>"Программирование
                    на React"</span>. Разроботчик и обладатель прав на данный продукт
                    принадлежат <span>Денисовой Юлии Алексеевне (с)</span>.
                </p>
            </Paper>
            {/*кнопка возврата к тестам*/}
            <Button
                onClick = { () => {props.onTestClick()}}
                style={{fontWeight: "bold"}}>
                Вернуться к тесту
            </Button>
        </div>
    )
};

export default HelpPage;
