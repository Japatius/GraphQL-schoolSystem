const { gql } = require('apollo-server-express');

const schemas = gql`
  type Mutation {    
    createStudent(
      email: String!,
      name: iName!,
      addressStreet: String!,
      addressCity: String!,
      addressCountry: String!,
      addressPostNumber: String!
      birthday: String!,
      alias: String!       
      ): NewStudentResponse!

    createCourse(
      description: String!,
      teacher: String!,
      amountOfCredits: Float!,
      deadline: String
      ): NewCourseResponse!

    createGrading(
        studentId: Float!,
        courseId: Float!,
        gradingDate: String!,
        points: Float,
    ): NewGradingResponse!

    updateStudent(
      id: ID!,
      email: String!,
      name: iName!,
      addressStreet: String,
      addressCity: String,
      addressCountry: String,
      addressPostNumber: String,
      birthday: String,
      alias: String   
      ): UpdateResponse!
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
    grade(id: ID!): Grade!,
    grades: [Grade!]!,
    gradeByStudent(studentId: Float!, courseId: Float!): [Grade!]!
  }

  type Student {
    id: ID!,
    email: String!,
    name: Name!,
    address: Address!,
    birthday: String,
    alias: String #nickname
  }

  type Name {
      firstName: String!,
      familyName: String!
  }

  input iName {
      firstName: String!,
      familyName: String!
  }

  type Address {
      street: String!,
      city: String!,
      postalCode: Int
      country: String!
  }

  type Course {
      id: ID!,
      description: String!,
      teacher: String!
      amountOfCredits: Float!,
      deadline: String
  }

  type Grade {
      id: ID!,
      gradingDate: String!,
      points: Float,
      studentId: Float!,
      courseId: Float!,
  }
`;

module.exports = schemas;