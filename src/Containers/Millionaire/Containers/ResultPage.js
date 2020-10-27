import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as DoneIcon } from './../image/check-24px.svg';
import { ReactComponent as CancelIcon } from './../image/cancel-24px.svg';
import Paper from "@material-ui/core/Paper/Paper";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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
    container: {
        width: "90%",
        height: "80%",
        maxHeight: "86%",
        margin: "0 auto"
    },
    wrapper: {
        minHeight: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20
    },
    result: {
        height: "100%",
        width: "90%"
    },
    paper: {
        width: "100%",
        height: "100%"
    }
}));

const columns = [
    { id: 'question',
        label: 'Вопрос',
        minWidth: 270
    },
    { id: 'answer',
      label: 'Ваш ответ',
      minWidth: 100,
      align: "center"
    },
];
// Страница с результами
const ResultPage = function (props) {
    const classes = useStyles();                                // будем использовать стили в рамках Material-UI
    const [page, setPage] = React.useState(0);                  // инициализация переменных Page и rowsPerPage для пагинации таблицы
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    // обработчик события смены страницы таблицы
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // обработчик события выбора количества строк в странице таблицы
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // ф-ия проверяющая на идеинтичность двух массивов
    function equalsArrays(arr) {
        return arr.correctAnswers.filter(item => arr.userAnswers.indexOf(item) > -1).length !== 0;
    }

    // ф-ия вычисляющая на сколько было отвечано вопросов
    function getTotalQuestion() {
        return props.res.questions.filter(item => item.userAnswers.length > 0).length
    }

    // ф-ия вычисляющая сколько из всех ответов были правильными
    function getTotalRightAnsewrs () {
        return props.res.questions.filter(item => item.userAnswers.length > 0).reduce((count, item) => {
            if (equalsArrays(item)) { count ++ }
            return count
        }, 0) || 0
    }

    // ф-ия вычисляющая сколько из всех ответов были правильными
    function getTotalNotRightAnswers() {
        return getTotalQuestion() - getTotalRightAnsewrs();
    }
    // рендерим страницу
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                {/*рисуем таблицу*/}
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        {/*рисуем заголовки таблицы*/}
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {/*рисуем основную часть таблицы*/}
                        <TableBody>
                            {props.res.questions.filter(item => item.userAnswers.length > 0)    // из всех показанных вопросов, оставим только те на которые были даны ответы
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    // покажем только ту часть вопросов, которая соответствует текущей странице
                                .map((row, colIndex) => {                                       // пробежимся по этим вопросам
                                return (
                                    // т.к. компоненты рендерятся в цикле, обязательно добавим параметр key
                                    <StyledTableRow  key={"row" + colIndex}>
                                        {/*в первом столбце покажем вопрос    */}
                                        <StyledTableCell component="th" scope="row">
                                            {row.question}
                                        </StyledTableCell>
                                        {/*во втором столбце покажем иконку, в зависимости от того, правильный был ответ на него или нет*/}
                                        <StyledTableCell
                                            align="center">
                                            {equalsArrays(row) ?
                                                <SvgIcon component={DoneIcon} htmlColor="green" viewBox="0 0 24 24"/> :
                                                <SvgIcon component={CancelIcon} htmlColor="red" viewBox="0 0 24 24"/>}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*выведем под таблицей пагинацию и настроим ее*/}
                <TablePagination
                    rowsPerPageOptions={[4, 8, 16]}
                    component="div"
                    count={getTotalQuestion()}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
            {/*покажем результирующую таблицу*/}
            <div className={classes.result}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                                    Всего вопросов
                                </TableCell>
                                <TableCell align="center">{getTotalQuestion()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                                    Правильных
                                </TableCell>
                                <TableCell align="center">{getTotalRightAnsewrs()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                                    Не правильных
                                </TableCell>
                                <TableCell align="center">{getTotalNotRightAnswers()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
};

export default ResultPage;