const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
require("dotenv").config();

// Import route files for users, companies, and user-company relations
const userRoutes = require("./routers/user-routes");
const companyRoutes = require("./routers/company-routes");
const userCompanyRoutes = require("./routers/userCompany-routes");

// Import route files for taxis and taxi drivers
const taxiRoutes = require("./routers/taxi-routes");
const taxiDriverRoutes = require("./routers/taxiDriver-routes");

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount routes for users, companies, and user-company relations
app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api", userCompanyRoutes);

// Mount routes for taxis and taxi drivers
app.use("/api", taxiRoutes);
app.use("/api", taxiDriverRoutes);

// Synchronize database and start the server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
