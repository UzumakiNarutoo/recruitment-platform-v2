import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Sidebar from '../Sidebar';

import {
    Button,
    Input,
    ListItem,
    ListItemText,
} from '@material-ui/core';

import { 
    createApplication as createApplicationMutation,
} from '../../graphql/mutations';

import { API, Storage } from 'aws-amplify';

const application_initialFormState = { 
    resume: '' ,
}

export default function CreateApplication() {
    const [application_formData, setApplication_formData] = useState(application_initialFormState);
    const [applications, setApplications] = useState([]);
    const { userId, postId } = useParams();
    console.log("in create app");
    console.log(useParams());

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setApplication_formData({ ...application_formData, resume: file.name });
        await Storage.put(file.name, file);
        //fetchApplications();
    }

    async function createApplication() {
        if (!application_formData.resume) return;
        console.log('create app');
        console.log(application_formData);
        await API.graphql({ query: createApplicationMutation, variables: { input: {
            type:'application',
            candidate: userId,
            postApplicationsId: postId,
            resume: application_formData.resume,
            timestamp: Math.floor(Date.now() / 1000)
        } } });
        console.log('init');
        console.log(application_formData);
        const resume = await Storage.get(application_formData.resume);
        application_formData.resume = resume;
        console.log('here');
        console.log(application_formData);
        setApplications([ ...applications, application_formData ]);
        setApplication_formData(application_initialFormState);
        console.log('done');
    }

    return (
        <React.Fragment>
            <Sidebar 
                activeListItem='job-applying'
            />
            <ListItem key='post-input-field'>
                <Input
                    type="file"
                    onChange={onChange}
                    //error={isError}
                    //helperText={helperText}
                    //value={value}
                    fullWidth
                    //margin="normal"
                />
            </ListItem>
            <ListItem key='post-button'>
                <ListItemText primary={
                    <Button
                        variant="contained"
                        color="primary"
                        //disabled={isError}
                        onClick={createApplication}
                        fullWidth
                    >
                    Post
                    </Button>
                } />
            </ListItem>
        </React.Fragment>
    );
}