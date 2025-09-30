import jwt from 'jsonwebtoken'
import { NhaTuyenDung } from '../models/nhatuyendung.model.js'

export const requireNhaTuyenDung = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.token) {
      token = req.cookies.token
    }
    if (!token) return res.status(401).json({ success: false, message: 'Not authorized, no token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== 'nhatuyendung') {
      return res.status(403).json({ success: false, message: 'Forbidden: nhà tuyển dụng only' })
    }

    const doc = await NhaTuyenDung.findById(decoded.userId)
    if (!doc) return res.status(401).json({ success: false, message: 'Account not found' })

    req.user = { userId: doc._id, role: 'nhatuyendung' }
    req.nhatuyendung = doc
    return next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized' })
  }
}


