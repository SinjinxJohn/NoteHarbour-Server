const express = require("express");
const {
  addProject,
  addPage,
  addPageNote,
  getProjects,
  addPageMembers,
} = require("../Controllers/projectController");
const { checkRole } = require("../Middlewares/authRole");
const projectRouter = express.Router();

projectRouter.use(express.json());

projectRouter.get("/getprojects/:projectId", getProjects);
projectRouter.post("/addproject", addProject);
projectRouter.post("/projects/:projectId/addpages", addPage);
projectRouter.post(
  "/projects/:projectId/pages/:pageId/addnotes",
  checkRole(["page_member", "page_admin"]),
  addPageNote
);
projectRouter.post(
  "/projects/:projectId/pages/:pageId/addmembers",
  checkRole("page_admin"),
  addPageMembers
);

module.exports = projectRouter;
