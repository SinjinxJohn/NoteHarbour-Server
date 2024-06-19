const express = require("express");
const {
  addProject,
  addPage,
  addPageNote,
  getProjects,
} = require("../Controllers/projectController");
const projectRouter = express.Router();

projectRouter.use(express.json());

projectRouter.get("/getprojects/:projectId", getProjects);
projectRouter.post("/addproject", addProject);
projectRouter.post("/projects/:projectId/addpages", addPage);
projectRouter.post("/projects/:projectId/pages/:pageId/addnotes", addPageNote);

module.exports = projectRouter;
