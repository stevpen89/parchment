// DEPENDENCIES

const //CONTROLLERS
      auth0Controller  = require('./controllers/auth0Controller' ),
      //NODE MODULES
      express          = require('express'        ),
      session          = require('express-session'),
      bodyParser       = require('body-parser'    ),
      massive          = require('massive'        )
                         require('dotenv').config();

//SERVER SETUP
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

//MIDDLEWARE
app.use (express.static(`${__dirname}/../build`));
app.use (bodyParser.json());
app.use (session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));

//AUTH0 ENDPOINTS
app.get    ('/auth/callback',       auth0Controller.auth  );
app.get    ('/api/user-data',       auth0Controller.user  );
app.get    ('/api/logout',          auth0Controller.logout);

//RUN THE SERVER
massive(CONNECTION_STRING).then(db => {
  app.set    ('db', db);
  app.listen (SERVER_PORT, () => console.log(`server started on port ${ SERVER_PORT }`));
});