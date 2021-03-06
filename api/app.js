"use strict";

// load modules
const express = require("express");
const morgan = require("morgan"); //request logger that prints stuff out about your server request for you
const Sequelize = require("sequelize"); //importing sequelize
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const authenticateUser = async (req, res, next) => {
    let message = null;

    // Get the user's credentials from the Authorization header.
    const credentials = auth(req);

    if (credentials) {
      console.log(credentials);
      // Look for a user whose `username` matches the credentials `name` property.
      const user = await User.findOne({
        where : {
          emailAddress : credentials.name
        }
      }).then(user => {
        if (user) {
          const authenticated = bcryptjs
          .compareSync(credentials.pass, user.password);

          if (authenticated) {
            console.log(`Authentication successful for user with email Address: ${user.emailAddress}`);

            if (req.originalUrl.includes('users')) {
            req.body.id = user.id;
          } else if (req.originalUrl.includes('courses')) {
            req.body.userId = user.id;
          }
          next();
        } else {
          console.log(`Authentication failure for user: ${user.emailAddress}`);
          res.status(401).json({ message: 'Access Denied' });
        }
      } else {
        console.log( `User not found: ${credentials.name}`);
        res.status(401).json({ message: 'Access Denied' });
      }
      })
    } else {
    //If the header is missing, return a response with a 401
    //Unauthorized HTTP status code.
    console.log('Auth header not found');
    res.status(401).json({ message: 'Access Denied' });
  }
  };

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./fsjstd-restapi.db"
});

//Allows SERVER to understand the body you are sending

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use(cors());

//Define Your Sequelize Models

class User extends Sequelize.Model {} //creates a User class
User.init(
  {
    //initializes the model object
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true //properties of the user
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your first name',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your last name',
        },
      },
    },
    emailAddress: {
      type: Sequelize.STRING, //key, value
    allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email address',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password',
        },
      },
  },
},
  { sequelize, modelName: "user" }
);

class Course extends Sequelize.Model {} //creates a Course class
Course.init(
  {
    //initializes the model object
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, //properties of the user
      allowNull: false,
      autoIncrement: true,

    },
    title: {
      type: Sequelize.STRING, //properties of the course
      allowNull: false,
      validate: {
        len: {
          msg: 'Please enter the course title',
          args: 1
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: {
          msg: 'Please enter the course description',
          args: 1
        },
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: "user",
      referencesKey: "id",
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "course" }
);

//Define associations between your models
// Within your Course model, define a BelongsTo association
//between your Course and User models (i.e. a "Course" belongs to a single "User").
//Define associations between your models Within your User model,
//define a HasMany association between your User and Course models
//(i.e. a "User" has many "Courses").

Course.belongsTo(User);
User.hasMany(Course);


Course.deleteCourse = async function(courseId) {
return Course.destroy({where:{id:courseId}})
}

sequelize.authenticate().then(function(err) {
  console.log("Connection successful");
});

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!"
  });
});

//Create the user routes
//GET /api/users 200 - Returns the currently authenticated user
app.get("/api/users", authenticateUser, async (req, res) => {
  const user = await User.findByPk(req.body.id);
  res.status(200).json({
    user
  });
});

//Create the course routes
//GET /api/courses 200 - Returns a list of courses (including the user that owns each course)

app.get("/api/courses", async (req, res) => {
    console.log("we got all courses")
    const courses = await Course.findAll({include:[{
      model:User,
      as: "user",
      attributes: ['id','firstName','lastName']
    }]
  });
      res.status(200).json({
        courses
      });
});

    // ADD OWNER OF THE COURSE
    //GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID

app.get("/api/courses/:id", async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include:[{
      model:User,
      as: "user",
      attributes: ['id','firstName','lastName']
    }]
  });

  if (course === null) {
    res.status(404).json({message: "This course does not exist"});
  } else {
    res.status(200).json(course);
  }
});

    //POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content

app.post("/api/courses", authenticateUser, async (req, res, next) => {
  const course = req.body
  try{
    const courseWithId = await Course.create(course)
    res.location(`/api/courses/${courseWithId.id}`);
    console.log(courseWithId)
    res.status(201).end()
  }catch(err){
    if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
      const response = err.errors.map(error=>{return error.message})
      res.status(400).json({error: response})
    } else {
      return next(err);
    }
  }
})

//PUT /api/courses/:id 204 - Updates a course and returns no content

app.put("/api/courses/:id", authenticateUser, async (req, res, next) => {

  try{
    //Need to explicitly check with a conditional statement that req.body.title &&
    //req.body.description exist, and only then can the course be updated.
    /* if (req.body.title && req.body.description) {
    Happy path--update course
  } else {
  send 400 status (Bad request -- Please include title and description)
}*/
  const course = await Course.findByPk(req.params.id);
   if (req.body.title && req.body.description) {
     if (course === null) {
       res.status(404).json({ message: 'This course does not exist'})
     } else {
       await course.update(req.body);
       res.status(204).end(); 
     }
   } else if (!req.body.title && !req.body.description) {
     res.status(500).send({ error: ['Please include a title and description!']})
   } else if (!req.body.title){
     res.status(500).send({error: ['Please include a title!']})
   } else if (!req.body.description){
     res.status(500).send({error: ['Please include a description!']})
   }
  } catch(err) {
    //res.status(400).send({
      next(err);
     // error: err
   // })
  }
});

//Create the course route
//DELETE /api/courses/:id 204 - Deletes a course and returns no content

app.delete("/api/courses/:id", authenticateUser, async (req, res) => {
  try{
    const course = await Course.findByPk(req.params.id);
    course.destroy(); 
    res.location('/');
    res.status(204).end();
  } catch(err) {
    console.log(err)
    res.status(400).send({
      error: err
    })
  }
})

//Create the user routes
//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
app.post("/api/users", async (req, res, next) => {
  try {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let emailAddress = req.body.emailAddress
  let password = req.body.password 
  
  let errors=[]
  if(!firstName){
    errors.push ("Please provide your first name")
  }
  if(!lastName){
    errors.push ("Please provide your last name")
  }
  if(!emailAddress){
    errors.push ("Please provide a valid email address")
  }
  if(!password){
    errors.push ("Please provide your password")
  }
   // Get the user from the request body. 
    if (firstName && lastName && emailAddress && password) {
      password = bcryptjs.hashSync(password);
      let updatedUser = {
        "firstName": firstName,
        "lastName": lastName,
        "emailAddress": emailAddress,
        "password": password
      }
    await User.create(updatedUser);
    res.location('/');
    res.status(201).end();
    } else {
      res.status(400).json({errors:errors})
    }
       
} catch(err){
  if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
  res.status(400).json({error: err.message})
} else {
  return next(err);
}
}
})

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

