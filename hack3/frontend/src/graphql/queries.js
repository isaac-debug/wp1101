import { gql } from "@apollo/client";
      // TODO 2 Please modify the query to get more properties

export const GET_TASKS_QUERY = gql`
  query GetTasksQuery {
    tasks {
      id
      title
      content
      dueDate
    }
  }
`;
