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

import 
{ 
  deletePost as deletePostMutation 
} 
from '../../graphql/mutations';

import {Auth } from 'aws-amplify';

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

export default function PostList({ isLoading, posts, getAdditionalPosts, listHeaderTitle, listHeaderTitleButton }) {
  console.log('api');
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
          {posts.map(post => (
            <span>
              <PostItem post={post} />
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
                <Button variant='outlined' onClick={() => getAdditionalPosts()} className={classes.maxWidth}> Read More </Button>
              }
            />
          </ListItem>
        </List>
      }
    </div>
  )
}

function PostItem({ post }) {
  const [value, setValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const classes = useStyles();
  const history = useHistory();
  const now = moment();
  console.log(now)

  const calcTimestampDiff = (timestamp) => {
    const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

    for (let i=0; i < scales.length; i++){
      const scale = scales[i];
      const diff = moment(now).diff(timestamp * 1000, scale);
      if( diff > 0) return diff + scale.charAt(0)
    }

    return 0 + scales[scales.length - 1].charAt(0)
  }

  const deletePost = async ({ id }) => {
    console.log('here');
    console.log(id);
    const res = await API.graphql({ query:deletePostMutation, variables: {input: { id }}});
    console.log('done');
    console.log(res)
    setValue('');
  }
  return (
    <ListItem alignItems='flex-start' key={post.id}>
      <ListItemAvatar>
        <div className={classes.clickable} onClick={() => history.push('/posts-' + post.recruiter)}>
          <Avatar alt={post.recruiter} src='/' />
        </div>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {post.recruiter}
            <Typography
              color='textSecondary'
              display='inline'
            >
              {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(post.timestamp)}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <Typography
            color='textPrimary'
          >
            {post.content}
            <div>
              {API.Auth.user.username === post.recruiter ?
                (
                    <List>
                      <ListItemText primary={
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={isError}
                          fullWidth
                          
                          onClick={() => {
                            Auth.currentAuthenticatedUser().then((user) => {
                              console.log(post.id);
                              console.log(user.username);
                              console.log('here app');

                              history.push('/received-applications-' + user.username + '-' + post.id);
                            })
                          }}
                          >
                          Received Applications
                        </Button>
                    } />

                    <ListItemText primary={
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isError}
                        onClick={() => deletePost(post)}
                        fullWidth
                        >
                        Delete Post
                      </Button>
                    } />
                  </List>
                  
                ) : (
                  <ListItemText primary={
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isError}
                      fullWidth
                      
                      onClick={() => {
                        Auth.currentAuthenticatedUser().then((user) => {
                          console.log(post.id);
                          console.log(user.username);
                          console.log('here app');

                          history.push('/apply-' + user.username + '-' + post.id);
                        })
                      }}
                      >
                      Apply
                    </Button>
                  } />
                )
              }
            </div>
          </Typography>
        }
      />
    </ListItem>
  )
}