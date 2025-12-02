// Fake users array (later you can connect to DB)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// GET all users
const getUsers = (req, res) => {
  res.json(users);
};

// POST new user
const createUser = (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getUsers, createUser };
