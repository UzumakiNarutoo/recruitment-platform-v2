import React from 'react';
import './App.css';

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AllPosts from './components/Posts/AllPosts';
import PostsBySpecifiedUser from './components/Posts/PostsBySpecifiedUser';
import ApplicationsBySpecifiedUser from './components/Applications/ApplicationsBySpecifiedUser';
import CreatePost from './components/Posts/CreatePost';
import CreateApplication from './components/Applications/CreateApplication'
import ApplicationsBySpecifiedPost from './components/Applications/ApplicationsBySpecifiedPost'

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1EA1F2',
      contrastText: "#fff",
    },
    background: {
      default: '#15202B',
      paper: '#15202B',
    },
    divider: '#37444C',
  },
  overrides: {
    MuiButton: {
      color: 'white',
    },
  },
  typography: {
    fontFamily: [
      'Arial', 
    ].join(','),
  },
  status: {
    danger: 'orange',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appBar: {
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


function App() {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Authenticator>
      {({ signOut, user }) => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HashRouter>
            <Switch>
              <Route exact path='/' component={AllPosts} />
              <Route exact path='/create-job-post' component={CreatePost} />
              <Route exact path='/global-timeline' component={AllPosts} />
              <Route exact path='/posts-:userId' component={PostsBySpecifiedUser}/>
              <Route exact path='/applications-:userId' component={ApplicationsBySpecifiedUser}/>
              <Route exact path='/apply-:userId-:postId' component={CreateApplication}/>
              <Route exact path='/received-applications-:userId-:postId' component={ApplicationsBySpecifiedPost}/>
              <Redirect path="*" to="/" />
            </Switch>
          </HashRouter>
        </ThemeProvider>
      )}
      </Authenticator>
    </div>
  );
}

export default App;