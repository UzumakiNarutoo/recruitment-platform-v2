import React, { useState, useEffect } from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react'
import { API, Storage } from 'aws-amplify';
import { listPosts, listApplications } from './graphql/queries';
import { 
  createPost as createPostMutation, 
  deletePost as deletePostMutation, 
  createApplication as createApplicationMutation,
} from './graphql/mutations';

const post_initialFormState = { 
  content: '' 
}
const application_initialFormState = { 
  resume: '' ,
}

function App() {
  const [posts, setPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [post_formData, setPost_formData] = useState(post_initialFormState);
  const [application_formData, setApplication_formData] = useState(application_initialFormState);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchPosts() {
    const apiData = await API.graphql({ query: listPosts });
    setPosts(apiData.data.listPosts.items);
  }
  async function fetchApplications() {
    const apiData = await API.graphql({ query: listApplications });
    const applicationsFromAPI = apiData.data.listApplications.items;
    await Promise.all(applicationsFromAPI.map(async application => {
      if (application.resume) {
        const resume = await Storage.get(application.resume);
        application.resume = resume;
      }
      return application;
    }))
    setApplications(apiData.data.listApplications.items);
  }

  async function createPost() {
    if (!post_formData.content) return;
    await API.graphql({ query: createPostMutation, variables: { input: post_formData } });
    setPosts([ ...posts, post_formData ]);
    setPost_formData(post_initialFormState);
  }

  async function createApplication(post) {
    if (!application_formData.resume) return;
    console.log('create app');
    console.log(application_formData);
    console.log(application_formData);
    await API.graphql({ query: createApplicationMutation, variables: { input: {
      postApplicationsId: post.id,
      resume: application_formData.resume
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

  async function deletePost({ id }) {
    const newPostsArray = posts.filter(post => post.id !== id);
    setPosts(newPostsArray);
    await API.graphql({ query: deletePostMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setApplication_formData({ ...application_formData, resume: file.name });
    await Storage.put(file.name, file);
    fetchApplications();
  }

  return (
    <div className="App">
      <Authenticator>
            {({ signOut, user }) => (
              <div className="Auth">
                  Hi {user.username}
                  <button onClick={signOut}>Sign out</button>

                  <input
                  onChange={e => setPost_formData({ ...post_formData, 'content': e.target.value})}
                  placeholder="content"
                  value={post_formData.name}
                />
                <button onClick={createPost}>Create Post</button>

                <div style={{marginBottom: 30}}>
                  {
                    posts.map(post => (
                      <div key={post.id}>
                        <h2>{post.recruiter}</h2>
                        <p>{post.id}</p>
                        <p>{post.content}</p>
                        <input
                          type="file"
                          onChange={onChange}
                        />
                        <button onClick={() => createApplication(post)}>Apply</button>
                        <button onClick={() => deletePost(post)}>Delete Post</button>
                      </div>
                    ))
                  }
                </div>

                <div style={{marginBottom: 30}}>
                  {
                    applications.map(application => (
                      <div key={application.id}>
                        <h2>{application.candidate}</h2>
                        <p>{application.resume}</p>
                        <div style={{marginBottom: 30}}>
                        {
                          posts.filter(post => post.id === application.postApplicationsId).map(post => (
                            <div key={post.id}>
                              <p>{post.recruiter}</p>
                              <p>{post.content}</p>
                            </div>
                          ))
                        }
                        </div>
                      </div>
                    ))
                  }
                </div>


              </div>
            )}
        </Authenticator>
    </div>
  );
}

export default App;