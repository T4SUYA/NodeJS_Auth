const router = require('express').Router()

const User = require('../model/User')

const jwt = require('jsonwebtoken')

const validation = require('../validation');

const bcrypt = require('bcryptjs')


router.post('/register', async (req,res) => {

    const {error} = await validation.registerValidation(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})

    if (emailExists) return res.status(400).send("This email already exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    
      const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      })
      try {
          savedUser = await user.save()
          res.send({user: user._id})
      } catch (error) {
          res.status(400).send(error)
      }
})

router.post("/login", async (req,res) => {
    const {error} = await validation.loginValidation(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    
    if (!user) return res.status(400).send("This email or passoword is wrong")

    const validPass = await bcrypt.compare(req.body.password,user.password)

    if (!validPass) return res.status(400).send("This email or passoword is wrong")

    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET)
    
    res.header("auth-token", token).send(token)
})



module.exports = router