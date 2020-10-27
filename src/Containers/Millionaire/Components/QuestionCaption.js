import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: 32,
        lineHeight: "120%",
        textAlign: "center",
        width: "90%",
        height: 150,
        marginTop: "20",
        color: "#282D37",
        overflow: "hidden",
        background: "#E9EDF1",
        boxShadow: "-8px -8px 10px rgba(209, 217, 230, 0.6), -5px -5px 10px rgba(255, 255, 255, 0.7), 1px 1px 4px rgba(167, 182, 197, 0.8)",
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const QuestionCaption = function (props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.question.trim()}
        </div>
    )
};

export default QuestionCaption;