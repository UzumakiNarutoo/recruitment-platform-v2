/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($recruiter: String) {
    onCreatePost(recruiter: $recruiter) {
      id
      recruiter
      content
      status
      applications {
        items {
          id
          candidate
          resume
          createdAt
          updatedAt
          postApplicationsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($recruiter: String) {
    onUpdatePost(recruiter: $recruiter) {
      id
      recruiter
      content
      status
      applications {
        items {
          id
          candidate
          resume
          createdAt
          updatedAt
          postApplicationsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($recruiter: String) {
    onDeletePost(recruiter: $recruiter) {
      id
      recruiter
      content
      status
      applications {
        items {
          id
          candidate
          resume
          createdAt
          updatedAt
          postApplicationsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication($candidate: String) {
    onCreateApplication(candidate: $candidate) {
      id
      candidate
      resume
      post {
        id
        recruiter
        content
        status
        applications {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      postApplicationsId
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication($candidate: String) {
    onUpdateApplication(candidate: $candidate) {
      id
      candidate
      resume
      post {
        id
        recruiter
        content
        status
        applications {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      postApplicationsId
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication($candidate: String) {
    onDeleteApplication(candidate: $candidate) {
      id
      candidate
      resume
      post {
        id
        recruiter
        content
        status
        applications {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      postApplicationsId
    }
  }
`;
