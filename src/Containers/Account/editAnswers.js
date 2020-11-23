import React, {forwardRef} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import MaterialTable, {MTableToolbar} from 'material-table'
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
import {initAnswerList, addAnswer, delAnswer, setAnswer} from "../../Store/actions/rootActions";

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


  class EditAnswers extends React.Component {
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
      nameQuestion: '',
      selectedRow: null
    }
  }

  async componentDidMount() {
    await this.props.initAnswerList(this.props.match.params.name);    // Очистим список вопросов и заполним список вопросами редактируемого теста
    let question = this.props.questions.find(item => item.key === this.props.match.params.name);
    this.setState({
      nameQuestion: question.name,
    });
    this.setState({
      nameQuiz: this.props.listQuizes.find(item => item.key === question.keyQuiz).name,
    })
  }

  render() {
    const {classes} = this.props;
    return (
      <Container component="main">
        <CssBaseline/>
        <div className={classes.root}>
          <Card className={classes.card}>
            <Grid container className={classes.gridRow}>
              {this.props.user ?
                <React.Fragment>
                  <Grid item xs={5} sm={2} className={classes.gridCol}>
                    <Typography component="p" variant="body1" color="textSecondary">
                      Преподаватель:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography component="p" variant="h6" color="textPrimary">
                      {this.props.user.displayName}
                    </Typography>
                  </Grid>
                </React.Fragment>
                : null
              }
              <Grid item xs={5} sm={2} className={classes.gridCol}>
                <Typography component="p" variant="body1" color="textSecondary">
                  Тест:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography component="p" variant="body1" color="textPrimary">
                  {this.state.nameQuiz}
                </Typography>
              </Grid>
              }
              <Grid item xs={5} sm={2} className={classes.gridCol}>
                <Typography component="p" variant="body1" color="textSecondary">
                  Вопрос:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography component="p" variant="body1" color="textPrimary">
                  {this.state.nameQuestion}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <MaterialTable
            title="Список ответов на вопрос"
            icons={tableIcons}
            columns={this.state.columns}
            data={this.props.data}
            options={{
              pageSizeOptions: [5, 10, 20],
              headerStyle: {fontSize: 16, fontWeight: 600},
              rowStyle: rowData => ({
                backgroundColor: (rowData.rightAnswer) ? '#6acc75' : '#FFF'
              })
            }}
            onRowClick={((evt, selectedRow) => {
              this.props.setAnswer({...selectedRow, rightAnswer: !selectedRow.rightAnswer, tableData:null}, selectedRow.tableData.id);
            })}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>this.props.history.goBack()}
                  >
                    {"Обратно к списку воросов"}
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
            editable={{
              onRowAdd: newData =>
                new Promise(async (resolve) => {
                  let checkRightAnswer = this.props.data.length === 0;
                  await this.props.addAnswer({...newData, rightAnswer: checkRightAnswer}, this.props.match.params.name);
                  resolve();
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    this.props.setAnswer({...newData}, oldData.tableData.id);
                    resolve();
                  }, 0)
                }),
              onRowDelete: oldData =>
                new Promise(async (resolve) => {
                  await this.props.delAnswer(oldData);
                  resolve()
                }),
            }}
          />
        </div>
        <Box mt={5}>
          <Copyright/>
        </Box>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    listQuizes: state.listQuizes,   // список тестов
    questions: state.questions,     // список вопросов
    data: state.answers,            // список ответов
    user: state.user,               // пользователь
  }
}


function mapDispatchToProps(dispatch) {

  return {
    initAnswerList: (key) => dispatch(initAnswerList(key)),                         // инициализация списка ответов
    addAnswer: (answer, keyQuestion) => dispatch(addAnswer(answer, keyQuestion)),   // добавить ответ
    setAnswer: (answer, index) => dispatch(setAnswer(answer, index)),               // редактировать ответ
    delAnswer: (keyQuiz) => dispatch(delAnswer(keyQuiz))                            // удалить ответ
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(EditAnswers))
