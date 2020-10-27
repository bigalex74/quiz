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
import Paper from '@material-ui/core/Paper';
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
    height: theme.spacing(58),
  },
  gridRow: {
    padding: theme.spacing(2)
  },
  gridRow2: {
    height: theme.spacing(30)
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
  paper: {
    padding: theme.spacing(2)
  }
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
                <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={3}
                      className={classes.gridRow}>
                  <Grid item>
                    <Paper elevation={3} className={classes.paper}>
                      <Typography component="p" variant="body1" color="textSecondary">
                        Результат тестирования по теме:
                      </Typography>
                      <Typography component="p" variant="h5" color="primary">
                        {this.state.nameQuiz}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Paper elevation={3} className={[classes.paper, classes.gridRow2].join(' ')}>
                          <ReactSpeedometer
                            maxValue={100}
                            minValue={0}
                            ringWidth={47}
                            paddingHorizontal={17}
                            value={Math.round(this.state.countRightAnswer / (this.state.data.length / 100))}
                            // eslint-disable-next-line
                            currentValueText="${value}%"
                            startColor="green"
                            endColor="red"
                            maxSegmentLabels={1}
                            segments={5555}
                            labelFontSize={'15px'}
                            valueTextFontSize={'23px'}
                            needleColor="steelblue"
                            needleTransitionDuration={4000}
                            needleTransition="easeElastic"
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs>
                        <Paper elevation={3} className={[classes.paper, classes.gridRow2].join(' ')}>
                          <MaterialTable
                            columns={[
                              {title: 'Показатель', field: 'name'},
                              {title: 'Значение', field: 'val'}
                            ]}
                            data={[
                              {name: 'Количество баллов (правильных ответов)', val: this.state.countRightAnswer},
                              {name: 'Максимально возможное количество баллов', val: this.state.data.length},
                              {name: 'Процент', val: Math.round(this.state.countRightAnswer / (this.state.data.length / 100))},
                            ]}
                            options={{
                              showTitle: false,
                              toolbar: false,
                              paging: false,
                              headerStyle: {
                                backgroundColor: '#ccc',
                              }
                            }}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{margin: '0 auto'}}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{height: '50px'}}
                      onClick={() => {
                        this.props.history.push(MAIN);
                      }}
                    >
                      {"Вернуться к списку тестов"}
                    </Button>
                  </Grid>
                </Grid>

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
