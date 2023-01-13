
const users = []

const bcrypt = require("bcryptjs")

module.exports = {

    login: (req, res) => {
      console.log('Logging In User')
      //console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        console.log(username)
        console.log(password)
        const isPWD = bcrypt.compareSync(password, users[i].pwHash)
        const isUser = users[i].username === username

        if (isPWD && isUser) {

          let userObj = users[i]
          delete userObj.pwHash

          console.log(userObj)

          res.status(200).send(userObj)
        } 
      }
      res.status(400).send("User not found.")

    },


    register: (req, res) => {
        console.log('Registering User')

        const {username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const pwHash = bcrypt.hashSync(password, salt)

        let userObj = {
          username,
          email, 
          firstName,
          lastName,
          pwHash
        }

        users.push(userObj)
        console.log(users)
        res.status(200).send(req.body)
    }
}