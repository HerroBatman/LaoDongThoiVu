const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Enable CORS for all routes
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Custom login endpoint
server.post('/api/v1/nhatuyendung/login', (req, res) => {
  const { email, password } = req.body
  
  // Find user in database
  const user = router.db.get('users').find({ email, password }).value()
  
  if (user) {
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token: 'mock-jwt-token-' + Date.now(),
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Email hoặc mật khẩu không đúng'
    })
  }
})

// Custom register endpoint
server.post('/api/v1/nhatuyendung/register', (req, res) => {
  const { email, password, name } = req.body
  
  // Check if user already exists
  const existingUser = router.db.get('users').find({ email }).value()
  
  if (existingUser) {
    res.status(400).json({
      success: false,
      message: 'Email đã được sử dụng'
    })
    return
  }
  
  // Create new user
  const newUser = {
    id: Date.now(),
    email,
    password,
    name,
    role: 'recruiter'
  }
  
  router.db.get('users').push(newUser).write()
  
  res.json({
    success: true,
    message: 'Đăng ký thành công'
  })
})

server.use('/api/v1', router)

const PORT = 8080
server.listen(PORT, () => {
  console.log(`Mock API server is running on http://localhost:${PORT}`)
  console.log('Available endpoints:')
  console.log('- POST /api/v1/nhatuyendung/login')
  console.log('- POST /api/v1/nhatuyendung/register')
  console.log('- GET /api/v1/users')
  console.log('- GET /api/v1/jobs')
  console.log('- GET /api/v1/contracts')
  console.log('- GET /api/v1/notifications')
})
