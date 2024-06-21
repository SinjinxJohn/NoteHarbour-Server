const pageModel = require("../Models/pageModel");
const projectModel = require("../Models/projectModel");

const checkRole = (roles) => {
  // Ensure roles is an array. If a single role is provided, convert it to an array.
  const roleArray = Array.isArray(roles) ? roles : [roles];

  return async (req, res, next) => {
    const { pageId } = req.params;
    const userId = req.user._id;

    try {
      let isAuthorized = false;

      // Find the page by its ID
      const page = await pageModel.findById(pageId);

      if (page) {
        // Check if the user has a role that is included in the roleArray
        isAuthorized = page.members.some(
          (member) =>
            member.user.toString() === userId.toString() &&
            roleArray.includes(member.role)
        );
      }

      if (!isAuthorized) {
        return res
          .status(403)
          .json({ error: "Member does not have access to this" });
      }

      // If authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error encountered", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = { checkRole };
