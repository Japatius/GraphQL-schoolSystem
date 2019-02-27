# GraphQL-schoolSystem

<h4>School system implementation made with using GraphQL and Apollo Server</h4>

## Example code 
Install dependencies
```
npm install
```

Start apollo server with nodemon
```
nodemon schoolServer.js
```

Get all student details and by id
```
{                       
  students {              
    id,                     
    name,                   
    email,                  
    class,                  
    alias,                  
    birthday                
  }                     
}

{
  student(id:1) {
    id,
    name,
    alias,
    class,
    email
  }
}                     
```

Get all course details and by id
```
{                     
  courses {            
    id,                       
    description,           
    teacher,                
    amountOfCredits, 
    deadline                
  }                       
}

{
  course(id:1) {
    teacher,
    amountOfCredits,
    deadline,
    description
  }
}                      
```

Get all grade details and by id
```
{
  grades{                 
    points,                
    student{                   
      name,
      class,
      email,
      alias,
      birthday                                  
    },                    
    course{
      description,
      teacher
      amountOfCredits,
      deadline,
    }
  }
}

{
  grade(studentId: 1, courseId: 1) {
    gradingDate, points 
  }
}
```

Create new student
```
mutation studentCreation {              
    createStudent(
      email:"example@example.exmpl",
      name:"examplestudent",
      class:"exampleclass"
      birthday:"20-20-1992",
      alias:"exampleman"
    )
    { success }
}
```

Update a student 
```
mutation {
  updateStudent(
    id:1,
    email:"santa@korvatunturi.fi",
    name: "Santa Claus",
    class:"Class of Christmas",
    birthday:"unknown",
    alias:"Mr. Christmas"
  ) 
  {success}
}
```

Create new course
```
mutation newCourse {
  createCourse(
    description:"example description",
    amountOfCredits:5,
    deadline:"12-12-2019",
    teacher:"Dr. Example"
  )
  {success}
}
```

Update a course
```
mutation updatedCrs {
  updateCourse(
    id:1,
    description:"Learn to shovel snow",
    teacher:"Mr. Snowman",
    amountOfCredits: 5,
    deadline:"12-12-2019"
  )
  {success}
}
```

Create new grading
```
mutation {
  createGrading(
    studentId: 1,
    courseId: 1,
    gradingDate:"25-02-2019",
    points: 5
  )
  {success}
}
```

Update grading
```
mutation updateGrade {
  updateGrading(
    id: 1
    points: 10,
    gradingDate: "27-2-2019"
  )
  {success}
}
```


