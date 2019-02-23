let express = require('express');
let bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
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

   
    updateStudent(
      email: String!,
      name: iName!,
      addressStreet: String,
      addressCity: String,
      addressCountry: String,
      addressPostNumber: String  
      ): UpdateResponse!
    }

  type NewStudentResponse {
    success: Boolean!    
  }
  
  type NewCourseResponse {
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
    grades: [Grade!]!
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
      points: Int,
      student: Student!,
      course: String!
  }
`;

let students = [
  {
    id: "1",
    email: "motivated@students.fi",
    firstName: "Mr. Motivation",
    familyName: "Agricola",
    addressStreet: "Employmentstreet 1",
    addressPostNumber: "110101",
    addressCity: "Oulu",
    addressCountry: "CD",
    birthday: "2000-12-24",
    alias: "motivationman"
  },
  {
    id: "2",
    email: "bambi@students.us",
    firstName: "Bambi",
    familyName: "Forrester",
    addressStreet: "Deepforest Drive 5",
    addressPostNumber: "0000001",
    addressCity: "Forest City",
    addressCountry: "US",
    birthday: "2000-12-23",
    alias: "bambino"
  },
  {
    id: "3",
    email: "brotherman@students.us",
    firstName: "Brotherman",
    familyName: "Bill",
    addressStreet: "Country road 2",
    addressPostNumber: "012345",
    addressCity: "Southern City",
    addressCountry: "US",
    birthday: "1969-07-14",
    alias: "yeehaw"
  },
  {
    id: "4",
    email: "gordo@students.co.uk",
    firstName: "Dimitri",
    familyName: "Gordo",
    addressStreet: "Mealway 1",
    addressPostNumber: "0161",
    addressCity: "Food City",
    addressCountry: "UK",
    birthday: "1992-08-19",
    alias: "grekler"
  },
];

let grades = [
  {
    id: "1",
    gradingDate: "2019-02-20",
    points: null,
    student: "2",
    course: "2"
  },
  {
    id: "2",
    gradingDate: "2019-02-20",
    points: null,
    student: "1",
    course: "4"
  },
  {
    id: "3",
    gradingDate: "2019-02-20",
    points: null,
    student: "3",
    course: "3"
  },
  {
    id: "4",
    gradingDate: "2019-02-20",
    points: 100,
    student: "4",
    course: "1"
  },
];

let courses = [
    {
        id: "1",
        description: "How to Build a Lawnmower",
        teacher: "John Deere",
        amountOfCredits: "5",
        deadline: ""
    },
    {
        id: "2",
        description: "Barbequeing the American Way",
        teacher: "Donald Trump",
        amountOfCredits: "5",
        deadline: ""
    },
    {
        id: "3",
        description: "DIY Tesla car",
        teacher: "Elon Musk",
        amountOfCredits: "5",
        deadline: ""
    },
    {
        id: "4",
        description: "Hacking the CIA",
        teacher: "Elliot Alderson",
        amountOfCredits: "5",
        deadline: ""
    },
];


const resolvers = {
  Query: {
    student: (parent, args, context, info) => {      
        return students.find(u => u.id === args.id);
    },
    students: (parents, args, context, info) => {
        return students;
    },
    course: (parents, args, context, info) => {
        return courses.find(i => i.id === args.id);
    },
    courses: (parents, args, context, info) => {
        return courses;
    },
    grade: (parents, args, context, info) => {
        return grades.find(i => i.id === args.id);
    },
    grades: (parents, args, context, info) => {
        return grades; 
      }
  },

  Mutation: {
    createStudent: (parent, args, context, info) => { 
      let newStudent = {
        id: ((students.length)+1).toString(),
        email: args.email,
        firstName: args.name.firstName,
        familyName: args.name.familyName,
        addressStreet: args.addressStreet,
        addressPostNumber: args.addressPostNumber,
        addressCity: args.addressCity,
        addressCountry: args.addressCountry,
        birthday: args.birthday,
        alias: args.alias
      };
      students.push(newStudent);
      return { success: true}
    },
    createCourse: (parent, args, context, info) => {
      let newCourse = {
        id: ((courses.length)+1).toString(),
        description: args.description,
        amountOfCredits: args.amountOfCredits,
        deadline: args.deadline
      };
      courses.push(newCourse);
      return { success: true }
    },
    updateStudent: (parent, args, context, info) => {
      let studentData = {
        id: args.id,
        email: args.email,
        firstName: args.name.firstName,
        familyName: args.name.familyName,
        addressStreet: args.addressStreet,
        addressPostNumber: args.addressPostNumber,
        addressCity: args.addressCity,
        addressCountry: args.addressCountry,
        birthday: args.birthday,
        alias: args.alias

      }
    }
  },


  Student: {
    name: (parent, args, context, info) =>
    {
      return {
        firstName: parent.firstName,
        familyName: parent.familyName
      }
    },
    address: (parent, args, context, info) => {
      return {
        street: parent.addressStreet,
        postalCode: parent.addressPostNumber,
        city: parent.addressCity,
        country: parent.addressCountry
      }
    },
  },

  Grade: {
    student: (parent, args, context, info) => {
      const student = students.find(u => u.id === parent.student);
      return student;
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});


//Run app, then load http://localhost:port in a browser to see the output.