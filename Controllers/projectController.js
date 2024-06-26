const notesModel = require("../Models/notesModel");
const pagemodel = require("../Models/pageModel");
const pageModel = require("../Models/pageModel");
const projectModel = require("../Models/projectModel");
const userModel = require("../Models/userModel");
const { myCache } = require("../cacheStorage");

module.exports.getProjects = async function (req, res) {
  try {
    const userId = req.user._id;
    const cacheKey = `userproject:${userId}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      console.log("Returning project from cache");
      res.status(200).json({
        messageType: "success",
        message: JSON.parse(cachedData),
      });
    } else {
      const projects = await projectModel.find({ user: userId });
      if (!projects) {
        return res.status(404).json({
          messageType: "Error",
          message: "No projects exist for user",
        });
      } else {
        myCache.set(cacheKey, JSON.stringify(projects), 3600);
        res.status(200).json({
          messageType: "success",
          message: projects,
        });
      }
    }
  } catch (err) {
    console.error("Error getting projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.addProject = async function (req, res) {
  try {
    const { name } = req.body;
    const userId = req.user._id;
    const project = projectModel.create({ name: name, creator: userId });
    res.status(200).json({
      messageType: "success",
      message: project,
    });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.addPage = async function (req, res) {
  try {
    const projectId = req.params.projectId;
    const userId = req.user._id;
    // Create a new page
    const { name, description } = req.body;
    const newPage = await pageModel.create({
      name,
      description,
      project: projectId,
      members: [{ user: userId, role: "page_admin" }],
    });
    const pageId = newPage._id;

    // Find the project by its ID
    const project = await projectModel.findById(projectId);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({
        messageType: "error",
        message: "Project not found",
      });
    }

    // Push the pageId into the pages array of the project
    project.page.push(pageId);

    // Save the updated project
    await project.save();

    // Respond with success message
    res.status(200).json({
      messageType: "success",
      message: project,
    });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.addPageMembers = async function (req, res) {
  try {
    const projectId = req.params.projectId;
    const pageId = req.params.pageId;

    // Find the project by ID
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({
        messageType: "Error",
        message: "Project not found",
      });
    }

    // Find the page within the project by ID
    const page = await pageModel.findById(pageId);
    if (!page) {
      return res.status(404).json({
        messageType: "Error",
        message: "Page not found in the project",
      });
    }

    // Ensure page.members is initialized
    if (!page.members) {
      console.log("no member");
    }

    const { members } = req.body;

    // Check if members array is provided and is not empty
    if (Array.isArray(members) && members.length > 0) {
      for (const member of members) {
        // Find user by ID
        const user = await userModel.findById(member.user);
        if (!user) {
          return res
            .status(404)
            .json({ error: `User with ID ${member.user} not found` });
        }

        // Check if user is already a member of the page
        if (
          !page.members.some(
            (pageMember) => pageMember.user.toString() === member.user
          )
        ) {
          // Add user to the members array
          page.members.push({
            user: member.user,
            role: member.role || "page_member",
          });
        }
      }

      // Save the updated page
      await page.save();

      res.status(200).json({
        messageType: "success",
        message: "Members added to page successfully",
        page,
      });
    } else {
      return res.status(400).json({
        messageType: "error",
        message: "No members provided or the members array is empty",
      });
    }
  } catch (error) {
    console.error("Error adding members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.addPageNote = async function (req, res) {
  try {
    const projectId = req.params.projectId;
    const pageId = req.params.pageId;

    const { title, description, due, status, startTime, endTime } = req.body;
    const userId = req.user._id;

    // Create a new note
    const newNote = await notesModel.create({
      title,
      description,
      due: new Date(due),
      status,
      startTime: startTime,
      endTime: endTime,
      user: userId,
    });

    // Get the ID of the newly created note
    const noteId = newNote._id;

    // Log the noteId for debugging
    console.log("New Note ID:", noteId);

    // Find the project by its ID
    const project = await projectModel.findById(projectId);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({
        messageType: "Error",
        message: "Project not found",
      });
    }

    // Find the page within the project by its ID
    const page = project.page.find((p) => p._id == pageId);
    const pages = await pagemodel.findById(page);

    // Check if the page exists
    if (!pages) {
      return res.status(404).json({
        messageType: "Error",
        message: "Page not found in the project",
      });
    }
    // console.log(page)
    // Initialize the notes array if it doesn't exist
    // if (!page.notes) {
    //     page.notes = [];
    // }

    // Push the noteId into the notes array of the page
    pages.notes.push(noteId);

    // Save the updated project
    await pages.save();
    // await project.save();

    // Respond with success message
    res.status(200).json({
      messageType: "success",
      message: pages,
    });
  } catch (err) {
    console.error("Error adding note to page:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
