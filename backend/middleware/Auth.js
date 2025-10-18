const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_Secret || "myJwt_secret_1233"

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) return res.status(401).json({ message: "No token provided" })

  try {
    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token
    const decoded = jwt.verify(tokenValue, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      message: "Admin access required",
      error: "FORBIDDEN_ACCESS"
    })
  }
  next()
}

const isCustomer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ 
      message: "Customer access required",
      error: "FORBIDDEN_ACCESS" 
    })
  }
  next()
}

module.exports = { verifyToken, isAdmin, isCustomer }