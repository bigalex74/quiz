import React from 'react';
import {withRouter} from 'react-router-dom'
import {Pages} from '../../../Route/pages';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import {AUTH, REGISTER} from "../../../Route/path";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    left: 'none'

  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

// Главная панель для всех экранов
const ApplicationBar = props => {
  // console.log(props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTitle = () => {
    const page = Pages.find(item => item.to === props.location.pathname);
    return page ? page.title : '';
  };
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="static" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}
                      className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {getTitle()}
          </Typography>
          <Button color="inherit"
                  onClick={() => {
                    props.history.push({
                      pathname: Pages.find(item=>item.id==='login').to
                    })
                  }}>
            {Pages.find(item=>item.id==='login').title}
          </Button>
          <Button color="inherit"
                  onClick={() => {
                    props.history.push({
                      pathname: Pages.find(item=>item.id==='register').to
                    })
                  }}>
            {Pages.find(item=>item.id==='register').title}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          {Pages.map((page) => (
            <ListItem button key={page.title} onClick={() => {
              props.history.push({
                pathname: page.to
              });
              handleDrawerClose()
            }}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(ApplicationBar);
