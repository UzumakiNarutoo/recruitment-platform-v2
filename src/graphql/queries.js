/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
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
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        candidate
        resume
        post {
          id
          recruiter
          content
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        postApplicationsId
      }
      nextToken
    }
  }
`;
