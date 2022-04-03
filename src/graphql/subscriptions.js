/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($recruiter: String) {
    onCreatePost(recruiter: $recruiter) {
      type
      id
      recruiter
      content
      timestamp
      applications {
        items {
          type
          id
          candidate
          resume
          timestamp
          postApplicationsId
          createdAt
          updatedAt
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
      type
      id
      recruiter
      content
      timestamp
      applications {
        items {
          type
          id
          candidate
          resume
          timestamp
          postApplicationsId
          createdAt
          updatedAt
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
      type
      id
      recruiter
      content
      timestamp
      applications {
        items {
          type
          id
          candidate
          resume
          timestamp
          postApplicationsId
          createdAt
          updatedAt
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
      type
      id
      candidate
      resume
      timestamp
      post {
        type
        id
        recruiter
        content
        timestamp
        applications {
          nextToken
        }
        createdAt
        updatedAt
      }
      postApplicationsId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication($candidate: String) {
    onUpdateApplication(candidate: $candidate) {
      type
      id
      candidate
      resume
      timestamp
      post {
        type
        id
        recruiter
        content
        timestamp
        applications {
          nextToken
        }
        createdAt
        updatedAt
      }
      postApplicationsId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication($candidate: String) {
    onDeleteApplication(candidate: $candidate) {
      type
      id
      candidate
      resume
      timestamp
      post {
        type
        id
        recruiter
        content
        timestamp
        applications {
          nextToken
        }
        createdAt
        updatedAt
      }
      postApplicationsId
      createdAt
      updatedAt
    }
  }
`;
