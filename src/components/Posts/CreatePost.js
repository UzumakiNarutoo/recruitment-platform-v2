import React from 'react';
import Sidebar from '../Sidebar';

import {
  Button,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';


import {API, graphqlOperation } from 'aws-amplify';

import { createPost } from '../../graphql/mutations';

const MAX_POST_CONTENT_LENGTH = 1000;


export default function CreatePost() {
    const [value, setValue] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');

    const onPost = async () => {
        const res = await API.graphql(graphqlOperation(createPost, { input: {
          type: 'post',
          content: value,
          timestamp: Math.floor(Date.now() / 1000),
        }})); 
        console.log('the created post');
        console.log(res)
        setValue('');
    }

    const handleChange = event => {
        setValue(event.target.value);
        if (event.target.value.length > MAX_POST_CONTENT_LENGTH) {
          setIsError(true);
          setHelperText(MAX_POST_CONTENT_LENGTH - event.target.value.length);
        } 
        else {
          setIsError(false);
          setHelperText('');
        }
    };

    
    return (
        <React.Fragment>
            <Sidebar 
                activeListItem='create-job-post'
            />
            <ListItem key='post-input-field'>
                <ListItemText primary={
                    <TextField
                        error={isError}
                        helperText={helperText}
                        id="post-input"
                        label="Type your post!"
                        multiline
                        rowsMax="50"
                        variant="filled"
                        value={value}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                } />
            </ListItem>
            <ListItem key='post-button'>
                <ListItemText primary={
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isError}
                        onClick={onPost}
                        fullWidth
                    >
                    Post
                    </Button>
                } />
            </ListItem>
        </React.Fragment>
    );
}