import React, {forwardRef} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import Grid from '@material-ui/core/Grid';
import Copyright from "../../Components/Copyright/copyright";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import { TEST_PATH} from "../../Route/path";
import {withRouter} from 'react-router-dom'
// import {initAnswerList, addAnswer, delAnswer, setAnswer} from "../../Store/actions/rootActions";
// import {getAllQuiz} from "../../Store/actions/quizFirebase";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import {EDIT_ANSWERS_PATH} from "../../Route/path";

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(200),
    },
  },
  card: {
    marginTop: theme.spacing(4),
    height: theme.spacing(16),
  },
  gridRow: {
    display: 'flex',
    alignItems: "center",
    height: '100%'
  },
  gridCol: {
    marginLeft: 20,
  },
  button: {
    margin: theme.spacing(0, 0, 2, 3),

  },
  tbody: {
    // '> tr': {
      border: 'none',
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.75), 10px 10px 7px rgba(0, 0, 0, 0.22)",
      margin: 20
    // }
  }
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Тест', field: 'name', render: rowData =>
            <Typography component="p" variant="subtitle1">
              {rowData.name}
            </Typography>
        },
      ],
      open: false,
      password: null,
      key: ''
    }
  }

  render() {
    const {classes} = this.props;
    console.log(this.props);
    return (
      <div>
        {!this.props.data || this.props.loader ?
          <p>Данные загружаются</p>
          : <Container component="main">
            <CssBaseline/>
            <div className={classes.root}>
              <MaterialTable
                title="Список доступных тестов"
                icons={tableIcons}
                columns={this.state.columns}
                data={this.props.data}
                options={{
                  pageSizeOptions: [5, 10, 20],
                  headerStyle: {fontSize: 16, fontWeight: 600},
                  // rowStyle: rowData => ({
                  //   fontSize: "25px",
                  //   color: 'red'
                  // })
                }}
                onRowClick={((evt, selectedRow) => {
                  if (selectedRow.access === 1) {
                    this.setState({
                      open: true,
                      password: selectedRow.password ? selectedRow.password : '123456',
                      key: selectedRow.key
                    })
                  } else
                    this.props.history.push(TEST_PATH + '/' + selectedRow.key);
                })}
                localization={{
                  body: {
                    emptyDataSourceMessage: 'Тестов для прохождения нет. ',
                    addTooltip: 'Добавить новый тест',
                    deleteTooltip: 'Удалить',
                    editTooltip: 'Изменить',
                    filterRow: {
                      filterTooltip: 'Отфильтровать'
                    },
                    editRow: {
                      deleteText: 'Вы уверены, что хотите удалить ответ? Он будет удален безвозвратно!',
                      cancelTooltip: 'Отменить',
                      saveTooltip: 'ОК'
                    }
                  },
                  grouping: {
                    placeholder: 'Группировать ...',
                    groupedBy: 'Группировка по:'
                  },
                  header: {
                    actions: 'Действия'
                  },
                  pagination: {
                    labelDisplayedRows: '{from}-{to} из {count}',
                    labelRowsSelect: 'строк',
                    labelRowsPerPage: 'строк на странице:',
                    firstAriaLabel: 'Первая страница',
                    firstTooltip: 'Перейти на первую страницу',
                    previousAriaLabel: 'предыдущая страница',
                    previousTooltip: 'Перейти на предыдущую страницу',
                    nextAriaLabel: 'следующая страница',
                    nextTooltip: 'Перейти на следующую страницу',
                    lastAriaLabel: 'последняя страница',
                    lastTooltip: 'Перейти на последнюю страницу'
                  },
                  toolbar: {
                    addRemoveColumns: 'Spalten hinzufügen oder löschen',
                    nRowsSelected: '{0} Ответ(ов) укзаны как правильные',
                    showColumnsTitle: 'Zeige Spalten',
                    showColumnsAriaLabel: 'Zeige Spalten',
                    exportTitle: 'Экспорт',
                    exportAriaLabel: 'Экспорт',
                    exportName: 'Экспорт в CSV',
                    searchTooltip: 'Поиск вопросов по вхождению',
                    searchPlaceholder: 'Поиск'
                  }
                }}
              />
            </div>
            <Box mt={5}>
              <Copyright/>
            </Box>
            <Dialog open={this.state.open} onClose={() => this.setState({open: false})} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Пароль</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Доступ к прохождению теста ограничен паролем. Введите пароль для рпазблокировки теста.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Пароль"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({open: false})} color="primary">
                  Не знаю пароль
                </Button>
                <Button onClick={() => {
                  let passw = document.getElementById("password");
                  this.setState({open: false});
                  if (passw.value === this.state.password) {
                    this.props.history.push(TEST_PATH + '/' + this.state.key);
                  } else {
                    alert('Пароль введен неправильный')
                  }
                  }
                } color="primary">
                  ОК
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        }


      </div>

    );
  }
}

function mapStateToProps(state) {
  // console.log(state.listQuizes);
  return {
    data: state.listQuizes,
    questions: state.questions,
    user: state.user,
    loader: state.loader
  }
}


function mapDispatchToProps(dispatch) {

  return {
    // getAllQuiz: () => dispatch(getAllQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(MainPage)))
