import React, {forwardRef} from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table'
import Chip from '@material-ui/core/Chip';

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
import Copyright from "../../Components/Copyright/copyright";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import {addQuiz, setQuiz, delQuiz} from "../../Store/actions/rootActions";

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
      columns: [
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

      // data: [
      //   // {name: 'Компьютерная сеть. Топология сети', access: 0},
      //   // {name: 'VBA', access: 0},
      //   // {name: 'Канал, помехозащищенное кодирование', access: 2},
      //   // {
      //   //   name: 'Компьютер как средство автоматизации информационных процессов. Компьютер как средство автоматизации информационных процессов.Компьютер как средство автоматизации информационных процессов',
      //   //   access: 1
      //   // },
      //   // {name: 'Аппаратное и программное обеспечение компьютера', access: 0},
      //   // {name: 'Искусственный интелект. Основы', access: 2},
      //   // {name: 'Что вы знаете о Bitcoin?', access: 1},
      //   // {name: 'Методы и технологии интеллектуального анализа данных (Data Mining)', access: 1},
      //
      // ]
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Container component="main">
        <CssBaseline/>
        <div className={classes.root}>
          <Card className={classes.card}/>
          <MaterialTable
            title="Тесты"
            icons={tableIcons}
            columns={this.state.columns}
            data={this.props.data}
            options={{
              pageSizeOptions: [5, 10, 20],
              headerStyle: {fontSize: 16, fontWeight: 600}
            }}
            actions={[
              {
                icon: ListAltIcon,
                tooltip: 'Редактирование вопросов',
                onClick: (event, rowData) => {
                  // Do save operation
                }
              }
            ]}
            localization={{
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
                addRemoveColumns: 'Spalten hinzufügen oder löschen',
                nRowsSelected: '{0} Zeile(n) ausgewählt',
                showColumnsTitle: 'Zeige Spalten',
                showColumnsAriaLabel: 'Zeige Spalten',
                exportTitle: 'Экспорт',
                exportAriaLabel: 'Экспорт',
                exportName: 'Экспорт в CSV',
                searchTooltip: 'Поиск тестов по вхождению',
                searchPlaceholder: 'Поиск'
              }
            }}
            editable={{
              onRowAdd: newData =>
                new Promise(async (resolve) => {
                  await this.props.addQuiz({...newData, access: parseInt(newData.access)});
                  resolve();
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    this.props.setQuiz({...newData, access: parseInt(newData.access)}, oldData.tableData.id);
                    resolve();
                  }, 0)
                }),
              onRowDelete: oldData =>
                new Promise(async (resolve) => {
                  await this.props.delQuiz(oldData);
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
  // console.log(state.listQuizes);
  return {
    data: state.listQuizes
  }
}


function mapDispatchToProps(dispatch) {

  return {
    addQuiz: (quiz) => dispatch(addQuiz(quiz)),
    setQuiz: (quiz, index) => dispatch(setQuiz(quiz, index)),
    delQuiz: (quiz) => dispatch(delQuiz(quiz)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Account))
