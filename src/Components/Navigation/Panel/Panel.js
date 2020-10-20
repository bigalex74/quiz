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
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from "react-redux";
import {signOut} from "../../../Store/actions/rootActions";
import {ACCOUNT, LOGIN, MAIN, REGISTER} from "../../../Route/path";
import {isTeacher} from "../../../Store/helper";

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
  accountInfo: {
    display: 'flex',
  }
}));

// Главная панель для всех экранов
const ApplicationBar = props => {
  // console.log(props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [showUser, setUser] = React.useState(false);

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

  const isEnabledItem = (item) => {
    if ((item.to === LOGIN || item.to === REGISTER) && props.user !== null) { return false; }
    if ((item.to === ACCOUNT || item.to === MAIN) && props.user === null) { return false; }
    if ((item.to === MAIN) && props.user !== null && isTeacher(props.user.email)) { return false; }
    if ((item.to === ACCOUNT) && props.user !== null && !isTeacher(props.user.email)) { return false; }
    return true
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
          {
             !(!!props.user && !!props.user.displayName)
              ? <div>
                  <Button color="inherit"
                               onClick={() => {
                                 props.history.push({
                                   pathname: Pages.find(item => item.id === 'login').to
                                 })
                               }}>
                    {Pages.find(item => item.id === 'login').title}
                  </Button>
                  <Button color="inherit"
                          onClick={() => {
                            props.history.push({
                              pathname: Pages.find(item => item.id === 'register').to
                            })
                          }}>
                    {Pages.find(item => item.id === 'register').title}
                  </Button>
                </div>
              : <div className={classes.accountInfo}>
                 <Button color="inherit"
                         size="large"
                         startIcon={Pages.find(item => item.id === 'account').icon}
                         onClick={() => {
                           if (isTeacher(props.user.email)) {
                             console.log('ЛК');
                             props.history.push(ACCOUNT);
                           }
                         }}>
                   {props.user.displayName }
                 </Button>
                 <Divider orientation="vertical" flexItem style={{backgroundColor: '#ffffff'}} variant="middle"/>
                 <Button color="inherit"
                        onClick={() => {
                          console.log('Выход');
                          props.signOutFirebase();
                          props.history.push(LOGIN);
                        }}>
                  Выйти
                 </Button>
               </div>
          }
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
            <ListItem button
                      key={page.title}
                      disabled={!isEnabledItem(page)}
                      onClick={() => {
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

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    signOutFirebase: () => dispatch(signOut()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicationBar));
