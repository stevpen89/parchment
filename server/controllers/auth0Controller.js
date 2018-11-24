const axios = require('axios')

module.exports = {
  auth: async (req, res) => {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env;

    //creating a new session
    let payload = {
      client_id     : REACT_APP_CLIENT_ID,
      client_secret : CLIENT_SECRET,
      code          : req.query.code,
      grant_type    : 'authorization_code',
      redirect_uri  : `https://${req.headers.host}/auth/callback` ,
      // redirect_uri  : `http://${req.headers.host}/auth/callback`
    }

    //getting data from auth0
    let resWithToken    = await axios.post (`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    let resWithUserData = await axios.get  (`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`);

    //storing data from auth0
    const db = req.app.get('db');
    let { name, email, sub, picture } = resWithUserData.data
    let foundUser = await db.users.find_user([sub]);

    //checking if the user exists
    if (foundUser[0]) {

      //found a user, redirect to home page
      req.session.user = foundUser[0];
      res.redirect('/#/')
    } else {
      
      //no user found, write a new one, and redirect to home page
      let createdUser = await db.users.create_user([name, email, sub, picture]);
      req.session.user = createdUser[0];
      res.redirect('/#/');
    }
  },

  //sends the user session back to write to redux
  user: (req, res) => { req.session.user ? res.status(200).send(req.session.user) : null },

  //destroys the user session
  logout: (req, res) => { return req.session.destroy() }
}