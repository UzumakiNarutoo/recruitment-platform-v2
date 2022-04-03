/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
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
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
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
