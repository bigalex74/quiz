import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// описание стилей для компонента
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "90%",
        paddingTop: 20,

    },
    button: {
        height: 75,
        boxShadow: "-5px -5px 10px rgba(255, 255, 255, 0.7), 5px 5px 10px #BFC8D8, 1px 1px 3px #EFF1F3, inset 0px 0px 10px rgba(255, 255, 255, 0.7)",
        borderRadius: 15,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: "130%",
        textAlign: "center",
    },
}));

// компонент рисующий 4 кнопки на экране
// тут я воспользовалась компонентом Grid из Material-UI, позволяющим позиционировать компоненты в виде таблицы
const AnswerButtons = function (props) {
    const classes = useStyles();        // будем использовать стили в рамках Material-UI
    let idx = 0;                        // сквозной индекс для каждой кнопки. на его основе будут передаваться данные, какая кнопка была нажата
                                        // а также какие стили будут применяться к кнопкам
    // ф-я генерирующая кнопки
    function FormRow() {
        let Row= [];
        for (let i = 0; i < 2;  i++) {      // 2 колонки в строке
            Row.push(
                <Grid item xs={6} key={idx}>
                    <Button
                        disabled = {props.disabled}
                        variant="outlined"
                        fullWidth
                        style={{
                            background: props.answers[idx].background,
                            color: props.answers[idx].color
                        }}
                        className={classes.button}
                        onClick={((idx) => { props.onClick(idx) }).bind(this, idx)}>
                        {props.answers[idx].caption}
                    </Button>
                </Grid>);
            idx++;
        }
        return (
            <React.Fragment>
                {Row.map((item)=>item)}
            </React.Fragment>
        );
    }

    // ф-я генерирующая строки в Grid
    function FormCol() {
        return (
            <Grid container item xs={12} spacing={1}>
                <FormRow />
            </Grid>
        )
    }

    // рендерим компонент
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <FormCol/>
                <FormCol/>
            </Grid>
        </div>
    );
};

export default AnswerButtons;