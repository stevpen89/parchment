// DEPENDENCIES

const //CONTROLLERS
      auth0Controller = require ( './controllers/auth0Controller' ),
      // s3Controller    = require ( './controllers/s3Controller'    ),
      cardsController = require ( './controllers/cardsController' )
      //NODE MODULES
      express         = require ( 'express'         ),
      session         = require ( 'express-session' ),
      bodyParser      = require ( 'body-parser'     ),
      massive         = require ( 'massive'         )
                        require ( 'dotenv' ).config();

//SERVER SETUP
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

//MIDDLEWARE
app.use ( express.static(`${__dirname}/../build`) );
app.use ( bodyParser.json() );
app.use ( session ({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }) );

//AMAZON S3
// s3Controller.bucket();

//AUTH0 ENDPOINTS
app.get ( '/auth/callback', auth0Controller.auth   );
app.get ( '/api/user-data', auth0Controller.user   );
app.get ( '/api/logout',    auth0Controller.logout );

//CARD ENDPOINTS
app.get    ( '/cards/:tree_id', cardsController.read   );
app.post   ( '/cards/:user_id', cardsController.create );
app.put    ( '/cards/:card_id', cardsController.edit   );
app.delete ( '/cards/:card_id', cardsController.delete );

//RUN THE SERVER
massive(CONNECTION_STRING).then(db => {
  app.set    ( 'db', db) ;
  app.listen ( SERVER_PORT, () => console.log(`server started on port ${ SERVER_PORT }`) );
});