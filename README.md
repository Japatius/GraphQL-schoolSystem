# GraphQL-schoolSystem

<h4>School system implementation made with using GraphQL and Apollo Server</h4>

## Example code 
Install dependencies
```
npm install
```

Start apollo server with nodemon
```
nodemon schoolSystem.js
```

Get all the student details
```
{
    students {
        id,
        name { firstName, familyName },
        email,
        address {street, city, postalCode},
        birthday,
        alias
    }
}
```

Create new student
```
mutation studentCreation {
    createStudent(
        email:"example@example.exmpl",
        name: {
            firstName:"fname",
            familyName:"lname"
        },
            addressStreet:"examplestreet 1",
            addressCity:"examplecity",
            addressCountry:"examplecountry",
            addressPostNumber:"00000" 
    )
    { success }
}
```

