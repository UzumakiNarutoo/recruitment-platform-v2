import React, { useState, useEffect, useReducer } from 'react';

import {API, graphqlOperation, Storage } from 'aws-amplify';
import { useParams } from 'react-router';

import { listApplicationsBySpecificPost } from '../../graphql/queries';
import { onCreateApplication } from '../../graphql/subscriptions';

import ApplicationList from './ApplicationList';
import Sidebar from '../Sidebar';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.applications;
    case ADDITIONAL_QUERY:
      return [...state, ...action.applications]
    case SUBSCRIPTION:
      return [action.application, ...state]
    default:
      return state;
  }
};

export default function ApplicationsBySpecifiedUser() {
  const { userId, postId } = useParams();

  const [applications, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = async (type, nextToken = null) => {
    const res = await API.graphql(graphqlOperation(listApplicationsBySpecificPost, {
        postApplicationsId: postId,
        sortDirection: 'DESC',
        limit: 20,
        nextToken: nextToken,
    }));
    const applicationsFromAPI = res.data.listApplicationsBySpecificPost.items;
    await Promise.all(applicationsFromAPI.map(async application => {
      if (application.resume) {
        const resume = await Storage.get(application.resume);
        application.resume = resume;
      }
      return application;
    }))
    console.log('get app:');
    console.log(res);
    dispatch({ type: type, applications: res.data.listApplicationsBySpecificPost.items })
    setNextToken(res.data.listApplicationsBySpecificPost.nextToken);
    setIsLoading(false);
  }

  const getAdditionalApplications = () => {
    if (nextToken === null) return; //Reached the last page
    getApplications(ADDITIONAL_QUERY, nextToken);
  }


  useEffect(() => {
    console.log('useEffect');
    console.log(userId);
    getApplications(INITIAL_QUERY);

    const subscription = API.graphql(graphqlOperation(onCreateApplication)).subscribe({
      next: (msg) => {
        const application = msg.value.data.OnCreateApplication;
        if (application.candidate !== userId) return;
        dispatch({ type: SUBSCRIPTION, application: application });
      }
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <React.Fragment>
      <Sidebar 
        activeListItem='post-applications'
      />
      <ApplicationList
        isLoading={isLoading}
        applications={applications}
        getAdditionalApplications={getAdditionalApplications}
        listHeaderTitle={userId}
      />
    </React.Fragment>
  )
}