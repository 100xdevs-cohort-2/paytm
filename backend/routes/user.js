const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.router();

// Define a Zod schema for user signup data
const signupBody = zod.object({
  // Username must be a string and a valid email address
  username: zod.string().email(),
  // First name must be a string
  firstName: zod.string(),
  // Last name must be a string
  lastName: zod.string(),
  // Password must be a string
  password: zod.string(),
});

// Define a route for user signup
router.post("/signup", async (req, res) => {
  const body = req.body; // Get the request body

  // Use the Zod schema to parse the request body
  const { success } = signupBody.safeParse(body);

  // If the request body is invalid, return a 400 response with an error message
  if (!success) {
    return res.status(400).json({
      msg: "Invalid inputs or email already taken",
    });
  }

  // Check if a user with the same username already exists
  const existingUser = await User.find({
    username: body.username,
  });

  // If a user with the same username already exists, return a 411 response with an error message
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  // Create a new user with the provided data
  const dbuser = await User.create({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: body.password,
  });

  //creating account for user and assigning random balance
  await Account.create({
    userId: dbuser._id,
    balance : 1 + Math.random() * 10000,
  })

  // Generate a JWT token with the user's ID
  const token = jwt.sign(
    {
      userId: dbuser._id,
    },
    JWT_SECRET
  );

  // Return a 200 response with a success message and the JWT token
  res.json({
    msg: "User created successfully",
    token: token,
  });
});

// Define a Zod schema for the request body of the /signin route
const signinBody = zod.object({
  // Define a required field for the username with a string type and an email format
  username: zod.string().email(),
  // Define a required field for the password with a string type
  password: zod.string(),
});

// Define a route handler for the /signin route
router.post("/signin", async (req, res) => {
  // Try to parse the request body using the signinBody schema
  const { success } = signinBody.safeParse(req.body);

  // If the parsing is not successful, return a 404 response with an error message
  if (!success) {
    res.status(404).json({
      msg: "Invalid inputs",
    });
    return;
  }

  // Try to find a user in the database with the provided username and password
  const user = await User.find({
    username: req.body.username,
    password: req.body.password,
  });

  // If a user is found, generate a JWT token with the user's ID
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    // Return a 200 response with a success message and the JWT token
    res.json({
      msg: "User signed in successfully",
      token: token,
    });
  } else {
    // If no user is found, return a 404 response with an error message
    res.status(404).json({
      msg: "User not found",
    });
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

/**
 * This route handler is responsible for updating a user's information.
 * It first parses the request body using the updateBody schema.
 * If the parsing is not successful, it returns a 411 response with an error message.
 * If the parsing is successful, it updates the user's information in the database
 * using the updateOne method of the User model.
 * Finally, it returns a 200 response with a success message.
 */
router.put("/", authMiddleware, async (req, res) => {
  // Try to parse the request body using the updateBody schema
  const { success } = updateBody.safeParse(req.body);

  // If the parsing is not successful, return a 411 response with an error message
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
    return;
  }

  // Update the user's information in the database using the updateOne method of the User model
  await User.updateOne(
    // The filter for the update operation
    {
      id: req.userId,
    },
    // The update operation
    {
      $set: req.body,
    }
  );

  // Return a 200 response with a success message
  res.json({
    message: "User information updated successfully",
  });
});

/**
 * This route handler is responsible for fetching a list of users based on a search query.
 * The search query is provided as a query parameter named 'filter'.
 * If the 'filter' parameter is not provided, all users are returned.
 * The search query is matched against the 'firstName' and 'lastName' fields of the User model.
 * The results are returned in the response body as an array of objects containing the following fields:
 * - username: the username of the user
 * - firstName: the first name of the user
 * - lastName: the last name of the user
 * - id: the unique identifier of the user
 */
router.get("/bulk", async (req, res) => {
  // Get the search query parameter from the request query
  const filter = req.query.filter || "";

  // Query the database to find all users whose first or last name matches the search query
  const users = await User.find({
    $or: [
      // Match users whose first name matches the search query
      {
        firstName: {
          $regex: filter, // Use a regular expression to match the search query
        },
      },
      // Match users whose last name matches the search query
      {
        lastName: {
          $regex: filter, // Use a regular expression to match the search query
        },
      },
    ],
  });

  // Return a JSON response with the list of users
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    })),
  });
});


module.exports = router;
