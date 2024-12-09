import jwt from "jsonwebtoken";

export const protectedRoute = (modelName) => async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const verifiedUser = await modelName.findById(verified._id);
    
    if (!verifiedUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
