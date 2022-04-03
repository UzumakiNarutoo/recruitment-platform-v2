import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Public as PublicIcon,
} from '@material-ui/icons';

import {Auth } from 'aws-amplify';

import { useHistory } from 'react-router';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  textField: {
    width: drawerWidth,
  },
  list: {
    width: 300,
  },
}));

export default function Sidebar({activeListItem}) {
  const classes = useStyles();
  const history = useHistory();

  const signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          selected={activeListItem === 'create-job-post'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/create-job-post');
            })
          }}
          key='CreatePost'
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Creat Job Post" />
        </ListItem>

        <ListItem
          button
          selected={activeListItem === 'global-timeline'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/global-timeline');
            })
          }}
          key='global-timeline'
        >
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Global Timeline" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'profile'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/posts-' + user.username);
            })
          }}
          key='profile'
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          selected={activeListItem === 'UserApplicationsAsCandidate'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/applications-' + user.username);
            })
          }}
          key='UserApplicationsAsCandidate'
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Sent Applications" />
        </ListItem>

        <ListItem
          selected={activeListItem === 'job-applying'}
          key='job-applying'
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Job Applying" />
        </ListItem>

        <ListItem
          selected={activeListItem === 'post-applications'}
          key='post-applications'
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Post Applications" />
        </ListItem>

        <ListItem key='logout'>
          <ListItemText primary={
            <Button
              variant="outlined"
              onClick={signOut}
              fullWidth
            >
              Logout
            </Button>
          } />
        </ListItem>
      </List>
    </Drawer>
  )
}