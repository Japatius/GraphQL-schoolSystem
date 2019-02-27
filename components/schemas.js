const { gql } = require('apollo-server-express');

const schemas = gql`
  type Mutation {    
    createStudent(
      email: String!,
      name: String!,
      class: String!
      birthday: String!,
      alias: String!       
      ): NewStudentResponse!

    createCourse(
      description: String!,
      teacher: String!,
      amountOfCredits: Int!,
      deadline: String
      ): NewCourseResponse!

    createGrading(
        studentId: ID!,
        courseId: ID!,
        gradingDate: String!,
        points: Int,
    ): NewGradingResponse!

    updateStudent(
      id: ID!,
      email: String!,
      name: String!,
      class: String
      birthday: String,
      alias: String   
      ): UpdateResponse!

    updateCourse(
      id: ID!,
      description: String!
      teacher: String!,
      amountOfCredits: Int!,
      deadline: String
      ):UpdateResponse!

    updateGrading(
      id: ID!,
      gradingDate: String!,
      points: Int!
    ):UpdateResponse!

    }

  type NewStudentResponse {
    success: Boolean!    
  }
  
  type NewCourseResponse {
    success: Boolean!
  }

  type NewGradingResponse {
    success: Boolean!
  }
  
  type UpdateResponse {
    success: Boolean!
  }

  type Query {
    student(id: ID!): Student,
    students: [Student!]!,
    course(id: ID!): Course!,
    courses: [Course!]!,
    grade(studentId: Int!, courseId: Int!): [Grade!]!,
    grades: [Grade!]!,
  }

  type Student {
    id: ID!,
    email: String!,
    name: String!,
    class: String!,
    birthday: String!,
    alias: String #nickname
  }

  type Course {
      id: ID!,
      description: String!,
      teacher: String!
      amountOfCredits: Int!,
      deadline: String
  }

  type Grade {
      id: ID!,
      gradingDate: String!,
      points: Int,
      student: Student,
      course: Course,
  }
`;

module.exports = schemas;