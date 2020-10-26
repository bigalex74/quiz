import React, {forwardRef} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import MaterialTable, {MTableToolbar} from 'material-table'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ReactSpeedometer from "react-d3-speedometer";

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
// import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
// import {getAnswersFromQuestion, getQuestionsFromQuiz} from "../../Store/actions/rootActions";
import {MAIN} from "../../Route/path";

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
    height: theme.spacing(48),
    display: 'flex',
    justifyContent: "center",
    flexDirection: 'column',
  },
  gridRow: {
    display: 'flex',
    alignItems: "center",
    height: '100%'
  },
  titleHead: {
    marginLeft: theme.spacing(-1),
    color: theme.palette.primary.dark,
  },
  wrapperDescription: {
    margin: theme.spacing(-2, 3, 2, 2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridCol: {
    marginLeft: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(3, 0, 2, 2),
    width: '50%'

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
  },
  gridSpeedometr: {
    height: theme.spacing(10)
  },
  // gridRowSpidometr: {
  //   display: 'flex',
  //   alignItems: "center",
  // }
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


class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Вопросы:', field: 'name', render: rowData =>
            <Typography component="p" variant="subtitle1">
              {rowData.name}
            </Typography>
        },
      ],
      data: [],
      nameQuiz: '',
      countRightAnswer: 0,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    let count = 0;
    this.props.location.state.data.forEach(question => {
      let right = true;
      question.answers.forEach(item => {
        if (item.answerUser !== item.rightAnswer) {
          right = false;
        }
      });
      count += right ? 1 : 0;
    });
    this.setState({
      data: this.props.location.state.data,
      nameQuiz: this.props.location.state.quiz,
      countRightAnswer: count
    });
    console.log(this.state);
    this.setState({
      loading: false
    });

  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        {!this.state.data || this.state.data.length === 0 || this.state.loading
          ?
          <div className={classes.circularProgress}>
            <CircularProgress/>
          </div>
          :
          <Container component="main">
            <CssBaseline/>
            <div className={classes.root}>
              <Card className={classes.card}>
                <Grid container className={classes.gridRow}>
                  <Grid item className={classes.gridCol}>
                    <Typography component="p" variant="body1" color="textSecondary">
                      Результат тестирования по теме:
                    </Typography>
                  </Grid>
                  <Grid item className={classes.gridCol}>
                    <Typography component="p" variant="h5" color="primary">
                      {this.state.nameQuiz}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sm={2} className={classes.gridSpeedometr}>
                    <ReactSpeedometer
                      maxValue={this.state.data.length}
                      minValue={0}
                      value={this.state.countRightAnswer}
                      startColor="green"
                      endColor="red"
                      segments={this.state.data.length}
                      width={200}
                      height={250}
                      needleColor="steelblue"
                      needleTransitionDuration={4000}
                      needleTransition="easeElastic"
                    />
                  </Grid>
                </Grid>
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
              <MaterialTable
                title="Правильность ответов на вопросы"
                icons={tableIcons}
                columns={this.state.columns}
                data={this.state.data}
                options={{
                  pageSizeOptions: [5, 10, 20],
                  headerStyle: {fontSize: 16, fontWeight: 600},
                  rowStyle: rowData => {
                    let answers = rowData.answers;
                    let right = true;
                    answers.forEach(item => {
                      if (item.answerUser !== item.rightAnswer) {
                        right = false
                      }
                    });
                    return {color: (right) ? '#6acc75' : '#ff6c3c'}
                  }
                }}
                // onRowClick={((evt, selectedRow) => {
                //   let data = [...this.state.data];
                //   let answerUser = data[this.state.indexCurrentQuestion].answers[selectedRow.tableData.id].answerUser;
                //   if ((this.state.data[this.state.indexCurrentQuestion].answers.reduce((total, item) =>
                //     total += item.rightAnswer ? 1 : 0, 0) === 1)) {
                //     data[this.state.indexCurrentQuestion].answers.forEach((item, index, obj) => {
                //       obj[index].answerUser = false
                //     });
                //   }
                //   data[this.state.indexCurrentQuestion].answers[selectedRow.tableData.id].answerUser = !answerUser;
                //   this.setState({
                //     data: data
                //   });
                // })}
                components={{
                  Toolbar: props => (
                    <div>
                      <div className={classes.titleHead}>
                        <MTableToolbar {...props}/>
                      </div>
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

//
// function mapStateToProps(state) {
//   // console.log(state.listQuizes);
//   return {
//     listQuizes: state.listQuizes,
//     questions: state.questions,
//     answers: state.answers,
//     user: state.user,
//   }
// }
//
//
// function mapDispatchToProps(dispatch) {
//
//   return {
//     getAnswersFromQuestion: (keyQuestion) => dispatch(getAnswersFromQuestion(keyQuestion)),
//     getQuestionsFromQuiz: (keyQuiz) => dispatch(getQuestionsFromQuiz(keyQuiz))
//   }
// }
// connect(mapStateToProps, mapDispatchToProps)
export default withStyles(useStyles)(Result)
