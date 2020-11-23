import React, {forwardRef} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table'
import Chip from '@material-ui/core/Chip';
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
import ListAltIcon from '@material-ui/icons/ListAlt';

import Grid from '@material-ui/core/Grid';
import Copyright from "../../Components/Copyright/copyright";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import {addQuiz, setQuiz, delQuiz} from "../../Store/actions/rootActions";
import {EDIT_QUESTIONS_PATH} from "../../Route/path";

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
  cardTable:{
    width: '100%'
  },
  gridRow: {
    display: 'flex',
    alignItems: "center",
    height: '100%'
  },
  gridCol: {
    marginLeft: 20,
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


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [            // Заголовки колонок таблицы
        {
          title: 'Наименование теста', field: 'name', render: rowData =>
            <Typography component="p" variant="subtitle1">
              {rowData.name}
            </Typography>
        },
        {
          title: 'Видимость', field: 'access',
          render: rowData => {
            switch (rowData.access) {
              case 0:
                return <Chip style={{fontSize: 16}} label="Публичный" color="primary"/>;
              case 1:
                return <Chip style={{fontSize: 16}} label="Ограниченный"/>;
              case 2:
                return <Chip style={{fontSize: 16}} label="Приватный" color="secondary"/>;
              default:
                return null;
            }
          },
          lookup: {0: 'Публичный', 1: 'Ограниченный', 2: 'Приватный'},
          initialEditValue: '1',
          type: 'numeric',
          align: 'right'
        },
      ],
      open: false,        // отвечает за видимость модального окна - нужно, чтобы ввести пароль видимости теста
      rowData: null       // данные, которые мы видим в таблице
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Container component="main">
        <CssBaseline/>
        <div className={classes.root}>
          <Card className={classes.card}>
            <Grid container spacing={2} className={classes.gridRow}>
              {this.props.user ?
                <React.Fragment>
                  <Grid item xs={5} sm={2} className={classes.gridCol}>
                    <Typography component="p" variant="h6" color="textSecondary">
                      Преподаватель:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography component="p" variant="h5" color="textPrimary">
                      {this.props.user.displayName}
                    </Typography>
                  </Grid>
                </React.Fragment>
                : null
              }
            </Grid>
          </Card>
          <Card className={classes.cardTable}>
            <MaterialTable
              title="Тесты"                                         // заголовок таблицы
              icons={tableIcons}                                    // иконки, которые использут компонент для отображения действий
              columns={this.state.columns}                          // заголовки колонок
              data={this.props.data}                                // данные, которые отображаются в таблице
              options={{                                            // опции таблицы
                pageSizeOptions: [5, 10, 20],                       // количество строк на странице (выпадающий список)
                headerStyle: {fontSize: 16, fontWeight: 600}        // стиль отображения заголовков
              }}
              actions={[                                            // нестандартные действия пользователя
                {
                  icon: ListAltIcon,                                // иконка
                  tooltip: 'Редактирование вопросов',               // подсказка
                  onClick: (event, rowData) => {                    // что делаем при нажатии на иконку
                    this.props.history.push(EDIT_QUESTIONS_PATH + '/' + rowData.key); // открываем страницу  с редактированием вопросов к тесту
                  }
                },
                rowData => ({
                  icon: ChevronRight,                               // иконка
                  tooltip: 'Изменить пароль доступа',               // подсказка
                  onClick: (event, rowData) => this.setState({open: true, rowData: rowData}), // вызов окна ввода пароля
                  disabled: rowData.access !== 1                    // если тип доступа не ограниченный, данная возможность заблокируется
                })
              ]}
              localization={{         // перевод некоторых сообщений
                body: {
                  emptyDataSourceMessage: 'Данных нет. Для добавления теста нажмите кнопку со знаком +',
                  addTooltip: 'Добавить новый тест',
                  deleteTooltip: 'Удалить',
                  editTooltip: 'Изменить',
                  filterRow: {
                    filterTooltip: 'Отфильтровать'
                  },
                  editRow: {
                    deleteText: 'Вы уверены, что хотите удалить тест? Он будет удален безвозвратно!',
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
                  exportTitle: 'Экспорт',
                  exportAriaLabel: 'Экспорт',
                  exportName: 'Экспорт в CSV',
                  searchTooltip: 'Поиск тестов по вхождению',
                  searchPlaceholder: 'Поиск'
                }
              }}
              editable={{                           // стандартные действия
                onRowAdd: newData =>                // добавление строки
                  new Promise(async (resolve) => {
                    await this.props.addQuiz({...newData, access: parseInt(newData.access)}); // добавляем тест в бд
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>  // редактирование строки
                  new Promise((resolve) => {
                    setTimeout(() => {
                      this.props.setQuiz({...newData, access: parseInt(newData.access)}, oldData.tableData.id);   // редактируем тест в бд
                      resolve();
                    }, 0)
                  }),
                onRowDelete: oldData =>             // удаление строки
                  new Promise(async (resolve) => {
                    await this.props.delQuiz(oldData);    // удаление теста из бд
                    resolve()
                  }),
              }}
            />
          </Card>
        </div>
        <Box mt={5}>
          <Copyright/>
        </Box>
        <Dialog open={this.state.open} onClose={() => this.setState({open: false})} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Изменить пароль</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Доступ к прохождению теста может быть ограничен паролем, который будет запрошен у пользователя.
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
              Не хочу менять
            </Button>
            <Button onClick={() => {
              let passw = document.getElementById("password");
              // console.log(passw, passw.value, passw.target);
              this.props.setQuiz({
                  ...this.state.rowData,
                  access: parseInt(this.state.rowData.access),
                  tableData: null, password: passw.value
                },
                this.state.rowData.tableData.id);
              this.setState({open: false})
            }
            } color="primary">
              Изменить
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.listQuizes,   // список тестов
    user: state.user,         // пользователь, зарегистрированный в системе
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addQuiz: (quiz) => dispatch(addQuiz(quiz)),                 // добавить тест
    setQuiz: (quiz, index) => dispatch(setQuiz(quiz, index)),   // редактировать тест
    delQuiz: (quiz) => dispatch(delQuiz(quiz)),                 // удалить тест
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Account))
