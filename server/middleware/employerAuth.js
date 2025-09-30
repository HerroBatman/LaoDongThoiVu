import jwt from 'jsonwebtoken'
import { Employer } from '../models/employer.model.js'

export const requireEmployer = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.token) {
      token = req.cookies.token
    }
    if (!token) return res.status(401).json({ success: false, message: 'Not authorized, no token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== 'employer') {
      return res.status(403).json({ success: false, message: 'Forbidden: employer only' })
    }

    const doc = await Employer.findById(decoded.userId).select('_id name email status')
    if (!doc || doc.status === false) return res.status(401).json({ success: false, message: 'Account not available' })

    req.user = { userId: doc._id, role: 'employer' }
    req.employer = doc
    return next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized' })
  }
}


