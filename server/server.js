// DEPENDENCIES

const //CONTROLLERS
      auth0Controller    = require ( './controllers/auth0Controller' ),
      s3Controller       = require ( './controllers/s3Controller'    ),
      cardsController    = require ( './controllers/cardsController' ),
      productsController = require ( './controllers/productsController' ),
      mailgunController  = require ( './controllers/mailgunController'),
      stripeController  = require ( './controllers/stripeController'),
      //NODE MODULES
      express            = require ( 'express'         ),
      session            = require ( 'express-session' ),
      bodyParser         = require ( 'body-parser'     ),
      massive            = require ( 'massive'         )
                           require ( 'dotenv' ).config();


//SERVER SETUP
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, STRIPE_SECRET_KEY} = process.env;
const app = express();
//STRIPE LIVES!!!
const stripe = require("stripe")(STRIPE_SECRET_KEY);

//MIDDLEWARE
app.use ( express.static(`${__dirname}/../build`) );
app.use ( bodyParser.json() );
app.use ( session ({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }) );

//AUTH0 ENDPOINTS
app.get ( '/auth/callback', auth0Controller.auth   );
app.get ( '/api/user-data', auth0Controller.user   );
app.get ( '/api/logout',    auth0Controller.logout );

//AMAZON S3 ENDPOITNS
app.get ( '/s3/signature', s3Controller.signature );

//CARD ENDPOINTS
app.get    ( '/cards/:type/:user_id', cardsController.read   );
app.post   ( '/cards/:user_id',       cardsController.create );
app.put    ( '/cards/:card_id',       cardsController.edit   );
app.delete ( '/cards/:card_id',       cardsController.delete );

//PRODUCTS ENDPOINTS
app.get  ( '/products',              productsController.readAll     );
app.get  ( '/products/:sku',         productsController.readSingle  );
app.put  ( '/products/journal/:sku', productsController.editJournal );
app.put  ( '/products/search',       productsController.search      );
app.post ( '/products/addtocart',    productsController.addToCart   );
app.put  ( '/products/rewritecart',  productsController.rewriteCart );

//MAILGUN ENDPOINTS
app.post(  '/api/mail', mailgunController.send);

//STRIPE ENDPOINTS
app.post('/api/charge', stripeController.handlePayment);

//RUN THE SERVER
massive(CONNECTION_STRING).then(db => {
  app.set    ( 'db', db) ;
  app.listen ( SERVER_PORT, () => console.log(`server started on port ${ SERVER_PORT }`) );
});