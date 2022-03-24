import React, { useState, useEffect } from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listPosts } from './graphql/queries';
import { createPost as createPostMutation, deletePost as deletePostMutation } from './graphql/mutations';


const initialFormState = { 
  content: '' 
}

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const apiData = await API.graphql({ query: listPosts });
    setPosts(apiData.data.listPosts.items);
  }

  async function createPost() {
    if (!formData.content) return;
    await API.graphql({ query: createPostMutation, variables: { input: formData } });
    setPosts([ ...posts, formData ]);
    setFormData(initialFormState);
  }

  async function deletePost({ id }) {
    const newPostsArray = posts.filter(post => post.id !== id);
    setPosts(newPostsArray);
    await API.graphql({ query: deletePostMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <Authenticator>
            {({ signOut, user }) => (
              <div className="Auth">
                  Hi {user.username}
                  <button onClick={signOut}>Sign out</button>

                  <input
                  onChange={e => setFormData({ ...formData, 'content': e.target.value})}
                  placeholder="content"
                  value={formData.name}
                />
                <button onClick={createPost}>Create Post</button>
                <div style={{marginBottom: 30}}>
                  {
                    posts.map(post => (
                      <div key={post.id}>
                        <h2>{post.recruiter}</h2>
                        <p>{post.id}</p>
                        <p>{post.content}</p>
                        <button onClick={() => deletePost(post)}>Delete Post</button>
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