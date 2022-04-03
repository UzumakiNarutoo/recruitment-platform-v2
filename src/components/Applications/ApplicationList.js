import React from 'react';
import {API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useHistory } from 'react-router';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
    wordBreak: 'break-all',
    overflow: 'scroll',
    borderRight: '1px solid #37444C',
  },
  alignCenter: {
    textAlign: 'center',
  },
  loader: {
    textAlign: 'center',
    paddingTop: 20,
  },
  maxWidth: {
    width: '100%',
  },
  listHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    backgroundColor: '#15202B',
    borderBottom: '1px solid #37444C',
  },
  clickable: {
    cursor: 'pointer',
  }
}));

export default function ApplicationList({ isLoading, applications, getAdditionalApplications, listHeaderTitle, listHeaderTitleButton }) {
  console.log('api application');
  console.log(API.Auth.user.username);
  const classes = useStyles();
  return (
    <div className={classes.listRoot}>
      {isLoading ?
        <div className={classes.loader}>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          <ListItem
            alignItems="flex-start"
            className={classes.listHeader}
          >
            <Typography
              variant='h5'
              fontWeight="fontWeightBold"
              maxWidth
            >
              {listHeaderTitle}
              {listHeaderTitleButton && listHeaderTitleButton}
            </Typography>
          </ListItem>
          {applications.map(application => (
            <span>
              <ApplicationItem application={application} />
              <Divider component="li" />
            </span>
          ))}
          <ListItem
            alignItems="flex-start"
            className={classes.alignCenter}
            key='loadmore'
          >
            <ListItemText
              primary={
                <Button variant='outlined' onClick={() => getAdditionalApplications()} className={classes.maxWidth}> Read More </Button>
              }
            />
          </ListItem>
        </List>
      }
    </div>
  )
}

function ApplicationItem({ application }) {
  const [value, setValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  
  const classes = useStyles();
  const history = useHistory();
  const now = moment();
  console.log(now)

  const resumeLink = application.resume;

  const calcTimestampDiff = (timestamp) => {
    const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

    for (let i=0; i < scales.length; i++){
      const scale = scales[i];
      const diff = moment(now).diff(timestamp * 1000, scale);
      if( diff > 0) return diff + scale.charAt(0)
    }

    return 0 + scales[scales.length - 1].charAt(0)
  }

  return (
    <ListItem alignItems='flex-start' key={application.id}>
      <ListItemAvatar>
        <div className={classes.clickable} onClick={() => history.push('/applications-' + application.candidate)}>
          <Avatar alt={application.candidate} src='/' />
        </div>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {application.candidate}
            <Typography
              color='textSecondary'
              display='inline'
            >
              {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(application.timestamp)}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <Typography
            color='textPrimary'
          >
            <ListItemText primary={
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isError}
                  fullWidth
                      
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = resumeLink;  
                }}
                >
                  Download Resume
                </Button>
            } />

            <h3>The Job Post</h3>
            <ListItem alignItems='flex-start' key={application.post.id}>
            <ListItemAvatar>
              <div className={classes.clickable} onClick={() => history.push('/posts-' + application.post.recruiter)}>
                <Avatar alt={application.post.recruiter} src='/' />
              </div>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  {application.post.recruiter}
                  <Typography
                    color='textSecondary'
                    display='inline'
                  >
                    {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(application.post.timestamp)}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <Typography
                  color='textPrimary'
                >
                  {application.post.content}
                </Typography>
              }
            />
          </ListItem>

          </Typography>
        }
      />
    </ListItem>
  )
}