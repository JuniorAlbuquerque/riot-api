const express = require('express')
const router = express()

const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const memberRouter = require('./memberRouter')
const projectRouter = require('./projectRouter')
const subsystemRouter = require('./subsystemRouter')
const requirementRouter = require('./requirementRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/member', memberRouter)
router.use('/project', projectRouter)
router.use('/sub', subsystemRouter)
router.use('/requirement', requirementRouter)

module.exports = router
