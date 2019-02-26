let students = require('./dummyData/students');
let courses = require('./dummyData/courses');
let grades = require('./dummyData/grades');

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
      },
      gradeByStudent: (parents, args, context, info) => {
          return grades.filter(s => s.studentId === args.studentId && s.courseId === args.courseId);
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
        updateStudent: (parents, args, context, info) => {
            let updatedStudent = students.findIndex(sId => sId.Id === args.id);
            if (updatedStudent >= 0) {
                students[updatedStudent] = args;
                return {
                    success: true
                };
            } else {
                return {
                    success: false
                };
            }
        },
        createCourse: (parent, args, context, info) => {
          let newCourse = {
            id: ((courses.length) + 1).toString(),
            description: args.description,
            teacher: args.teacher,
            amountOfCredits: args.amountOfCredits,
            deadline: args.deadline
          };
          courses.push(newCourse);
          return { success: true }
        },
        createGrading: (parents, args, context, info) => {
            let newGrade = args;
            const findStudent = students.findIndex(s => s.id == args.studentId);
            const findCourse = courses.findIndex(c => c.id == args.courseId);
            newGrade.id = (grades.length + 1).toString();
            if (findCourse >= 0 && findStudent >= 0) {
                grades.push(newGrade);
                return { success: true };
            } else {
                return { success: false };
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
};

module.exports = resolvers;