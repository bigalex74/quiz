import React, {forwardRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
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
  chip: {
    fontSize: 12,
  }
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Editable() {
  const { useState } = React;

  const [columns] = useState([
    { title: 'Наименование теста', field: 'name', render: rowData =>
        <Typography component="p" variant="subtitle1">
          {rowData.name}
        </Typography>},
    { title: 'Видимость', field: 'access',
      render: rowData => {
        switch (rowData.access) {
          case 0: return <Chip style={{fontSize: 16}} label="Публичный" color="primary"/>;
          case 1: return <Chip style={{fontSize: 16}} label="Ограниченный" />;
          case 2: return <Chip style={{fontSize: 16}} label="Приватный"  color="secondary"/>;
          default: return null;
        }
      },
      lookup: {0: 'Публичный', 1: 'Ограниченный', 2: 'Приватный'},
      initialEditValue: '1',
      type: 'numeric',
      align: 'right' },
  ]);

  const [data, setData] = useState([
    { name: 'Компьютерная сеть. Топология сети', access: 0},
    { name: 'VBA', access: 0},
    { name: 'Канал, помехозащищенное кодирование', access: 2},
    { name: 'Компьютер как средство автоматизации информационных процессов. Компьютер как средство автоматизации информационных процессов.Компьютер как средство автоматизации информационных процессов', access: 1},
    { name: 'Аппаратное и программное обеспечение компьютера', access: 0},
    { name: 'Искусственный интелект. Основы', access: 2},
    { name: 'Что вы знаете о Bitcoin?', access: 1},
    { name: 'Методы и технологии интеллектуального анализа данных (Data Mining)', access: 1},

  ]);

  return (
    <MaterialTable
      title="Тесты"
      icons={tableIcons}
      columns={columns}
      data={data}
      options={{
        pageSizeOptions: [5,10,20],
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
          emptyDataSourceMessage: 'Keine Einträge',
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
          placeholder: 'Spalten ziehen ...',
          groupedBy: 'Gruppiert nach:'
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
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData={...newData, access: parseInt(newData.access)};
              setData([...data, newData]);
              resolve();
            }, 100)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData={...newData, access: parseInt(newData.access)};
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
            }, 100)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve()
            }, 1000)
          }),
      }}
    />
  )
}

export default function Account() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline/>
      <div className={classes.root}>
          <Card className={classes.card}/>
        {Editable()}
      </div>
      <Box mt={5}>
        <Copyright/>
      </Box>
    </Container>
  );
}
