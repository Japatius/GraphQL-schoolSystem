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
          return grades.filter(s => s.studentId === args.studentId && s.courseId === args.courseId);
      },
      grades: (parents, args, context, info) => {
          return grades; 
      },
      
    },

    Mutation: {
        createStudent: (parent, args, context, info) => { 
          let newStudent = {
            id: ((students.length)+1).toString(),
            email: args.email,
            name: args.name,
            class: args.class,
            birthday: args.birthday,
            alias: args.alias
          };
          students.push(newStudent);
          return { success: true}
        },
        updateStudent: (parents, args, context, info) => {
            let updatedStudent = students.findIndex(sId => sId.id === args.id);
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
        updateCourse: (parent, args, context, info) => {
            let updatedCourse = courses.findIndex(cId => cId.id === args.id);
            if (updatedCourse >= 0) {
                courses[updatedCourse] = args;
                return {
                    success: true
                };
            } else {
                return {
                    success: false
                };
            }
        },
        createGrading: (parents, args, context, info) => {
            let newGrading = {
                id: ((grades.length)+1).toString(),
                points: args.points,
                student: students.find(x => x.id === args.studentId),
                course: courses.find(x => x.id === args.courseId)
            };
            grades.push(newGrading);
            return {success: true};
        },
        updateGrading: (parents, args, context, info) => {
            let points = grades.find(g => g.id === args.id);
            grades.points = args.points;
            return {
                success: true
            };

        }
    },
};

module.exports = resolvers;