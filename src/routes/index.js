const mainRoutes = require("express").Router();
const eventRoutes = require("./eventRoutes");
const authRoutes = require("./authRoutes");
const commentRoutes = require("./commentRoutes");

mainRoutes.use("/event", eventRoutes);
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/comment", commentRoutes);

module.exports= mainRoutes;