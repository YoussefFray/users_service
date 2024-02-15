const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
require("dotenv").config();

const userRoutes = require("./routers/user-routes");
const companyRoutes = require("./routers/company-routes");
const userCompanyRoutes = require("./routers/userCompany-routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api", userCompanyRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
