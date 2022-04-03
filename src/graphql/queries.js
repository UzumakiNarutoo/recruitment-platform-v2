/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
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
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        postApplicationsId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPostsSortedByTimestamp = /* GraphQL */ `
  query ListPostsSortedByTimestamp(
    $type: String!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByTimestamp(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSpecificPostById = /* GraphQL */ `
  query GetSpecificPostById(
    $id: ID!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    GetSpecificPostById(
      id: $id
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPostsBySpecificOwner = /* GraphQL */ `
  query ListPostsBySpecificOwner(
    $recruiter: String!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsBySpecificOwner(
      recruiter: $recruiter
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listApplicationsBySpecificCandidate = /* GraphQL */ `
  query ListApplicationsBySpecificCandidate(
    $candidate: String!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplicationsBySpecificCandidate(
      candidate: $candidate
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        postApplicationsId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listApplicationsBySpecificPost = /* GraphQL */ `
  query ListApplicationsBySpecificPost(
    $postApplicationsId: ID!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplicationsBySpecificPost(
      postApplicationsId: $postApplicationsId
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        postApplicationsId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
