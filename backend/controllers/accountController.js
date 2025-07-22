// controller/account
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  getAllAccounts: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id_user", "email", "role", "created_at", "updated_at"],
        order: [["id_user", "DESC"]],
      });

      if (!users.length) {
        return res.status(204).json({ message: "No account data found", data: [] });
      }

      res.status(200).json({
        message: "Accounts fetched successfully",
        data: users,
      });
    } catch (error) {
      console.error("getAllAccounts error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updatePassword: async (req, res) => {
    const { id_user } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    try {
      const user = await User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await user.update({ password: hashedPassword });

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("updatePassword error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
