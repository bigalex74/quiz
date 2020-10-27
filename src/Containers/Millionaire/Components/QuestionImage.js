import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image from '../image/image.png';


const useStyles = makeStyles((theme) => ({
    root: {
        height: 200,
        widths: "100%",
        marginTop: 20,
    },
    img: {
        height: "100%"
    }
}));

const QuestionImage = function (props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={image} alt="Кто хочет стать миллионером" className={classes.img}/>
        </div>
    )
};

export default QuestionImage;