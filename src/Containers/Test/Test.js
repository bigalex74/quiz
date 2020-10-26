import React, {forwardRef} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import MaterialTable, {MTableToolbar} from 'material-table'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

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

import Grid from '@material-ui/core/Grid';
import Copyright from "../../Components/Copyright/copyright";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import {getAnswersFromQuestion, getQuestionsFromQuiz} from "../../Store/actions/rootActions";
import {MAIN} from "../../Route/path";
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
    display: 'flex',
    justifyContent: "center",
    flexDirection: 'column',
  },
  titleHead: {
    color: theme.palette.primary.dark,
  },
  description: {
    margin: theme.spacing(-2, 0, 2, 3)
  },
  gridCol: {
    marginLeft: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(0, 0, 2, 3),

  },
  circularProgress: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    height: '100vh'
  },
  warning: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    height: '100vh',
  },
  cardWarning: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center',
    height: theme.spacing(30),
    width: theme.spacing(80),
  },
  textWarning: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
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


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Ответ', field: 'name', render: rowData =>
            <Typography component="p" variant="subtitle1">
              {rowData.name}
            </Typography>
        },
      ],
      nameQuiz: '',
      data: [],
      indexCurrentQuestion: 0,
      loader: false
    }
  }

  async componentDidMount() {
    this.setState({
      loader: true
    });
    await this.props.getQuestionsFromQuiz(this.props.match.params.name);    // Очистим список вопросов и заполним список вопросами редактируемого теста
    let data = [];
    for (const question of this.props.questions) {            // пробежимся по всем вопросам теста
      await this.props.getAnswersFromQuestion(question.key);    // получим для каждого вопроса список вариантов ответа
      if (this.props.answers.length > 0) {
        let answers = [...this.props.answers];
        answers.forEach(item => item.answerUser = false);
        let rightEmptyAnswer = answers.findIndex(item => item.rightAnswer) === -1;
        data.push({
          ...question,
          answers: [...this.props.answers,
            {
              name: 'Среди предложенных вариантов нет правильного',
              rightAnswer: rightEmptyAnswer,
              // answerUser: false
            }]
        })
      }
    }
    this.setState({
      indexCurrentQuestion: 0,
      data: data,
      nameQuiz: this.props.listQuizes.find(item => item.key === this.props.match.params.name).name
    });
    console.log('data', this.state.data);
    this.setState({
      loader: false
    });
  }

  warningMessage() {
    const {classes} = this.props;
    return (
      <div>
        <Container component="main">
          <CssBaseline/>
          <div className={classes.warning}>
            <Card className={classes.cardWarning}>
              <Typography component="p" variant="h6" color="textPrimary" className={classes.textWarning}>
                К сожалению, тест на данную тему сейчас не доступен. Попробуйте пройти его немного позже.
              </Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.history.push(MAIN);
                }}
              >
                {"Вернуться к списку тестов"}
              </Button>
            </Card>
          </div>
        </Container>
      </div>
    )
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        {!this.state.data || this.state.loader
          ?
          <div className={classes.circularProgress}>
            <CircularProgress/>
          </div>
          : this.state.data.length === 0
            ? this.warningMessage()
            :
            <Container component="main">
              <CssBaseline/>
              <div className={classes.root}>
                <Card className={classes.card}>
                  {/*<Grid container className={classes.gridRow}>*/}
                  <Grid item className={classes.gridCol}>
                    <Typography component="p" variant="body1" color="textSecondary">
                      Тестирование на тему:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridCol}>
                    <Typography component="p" variant="h5" color="primary">
                      {this.state.nameQuiz}
                    </Typography>
                  </Grid>
                  {/*</Grid>*/}
                </Card>
                <MaterialTable
                  title={this.state.data[this.state.indexCurrentQuestion].name}
                  icons={tableIcons}
                  columns={this.state.columns}
                  data={this.state.data[this.state.indexCurrentQuestion].answers}
                  options={{
                    pageSizeOptions: [5],
                    search: false,
                    paging: false,
                    headerStyle: {fontSize: 16, fontWeight: 600},
                    rowStyle: rowData => {
                      // console.log('rowData', rowData);
                      return {backgroundColor: (rowData.answerUser) ? '#6acc75' : '#FFF'}
                    }
                  }}
                  onRowClick={((evt, selectedRow) => {
                    // this.setState({selectedRow: selectedRow.tableData.id})
                    let data = [...this.state.data];
                    let answerUser = data[this.state.indexCurrentQuestion].answers[selectedRow.tableData.id].answerUser;
                    if ((this.state.data[this.state.indexCurrentQuestion].answers.reduce((total, item) =>
                      total += item.rightAnswer ? 1 : 0, 0) === 1)) {
                      data[this.state.indexCurrentQuestion].answers.forEach((item, index, obj) => {
                        // if (index !== selectedRow.tableData.id) {
                        obj[index].answerUser = false
                        // }
                      });
                    }
                    data[this.state.indexCurrentQuestion].answers[selectedRow.tableData.id].answerUser = !answerUser;
                    this.setState({
                      data: data
                    });
                  })}
                  components={{
                    Toolbar: props => (
                      <div>
                        <div className={classes.titleHead}>
                          <MTableToolbar {...props}/>
                        </div>
                        <Typography component="p" variant="body1" className={classes.description} color="textSecondary">
                          {(this.state.data[this.state.indexCurrentQuestion].answers.reduce((total, item) =>
                            total += item.rightAnswer ? 1 : 0, 0) === 1) ? 'Выберите один вариант ответа' : 'Выберите несколько вариантов ответа'}
                        </Typography>
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          disabled={!this.state.data[this.state.indexCurrentQuestion].answers.find(item => item.answerUser)}
                          onClick={() => {
                            if (this.state.indexCurrentQuestion === this.state.data.length - 1) {
                              alert('aless');
                              this.props.history.push(MAIN);
                            }
                            this.setState({
                              indexCurrentQuestion: this.state.indexCurrentQuestion + 1
                            })
                          }}
                        >
                          {this.state.indexCurrentQuestion < this.state.data.length - 1 ? "Следующий вопрос" : "Завершить тестирование"}
                        </Button>
                      </div>
                    ),
                  }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: 'Данных нет. Для добавления ответа нажмите кнопку со знаком +',
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
            </Container>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.listQuizes);
  return {
    listQuizes: state.listQuizes,
    questions: state.questions,
    answers: state.answers,
    user: state.user,
  }
}


function mapDispatchToProps(dispatch) {

  return {
    getAnswersFromQuestion: (keyQuestion) => dispatch(getAnswersFromQuestion(keyQuestion)),
    getQuestionsFromQuiz: (keyQuiz) => dispatch(getQuestionsFromQuiz(keyQuiz))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Test))
