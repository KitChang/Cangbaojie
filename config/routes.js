/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    controller: 'DashboardController',
      action: 'dashboard'
  },
  'get /advertisement/:id/prize': {
    view: 'prize'  
  },
  'get /advertisement/:id/quiz': {
    controller: 'AdvertisementController',
    action: 'quiz'  
  },
  'post /advertisement/:id/quiz': {
      controller: 'AdvertisementController',
      action: 'updateQuiz'
  },
  'post /advertisement/:id/prize': {
      controller: "AdvertisementController",
      action: 'updatePrize'
  },
  'get /advertisement/:id/prize': {
      controller: "AdvertisementController",
      action: 'prize'
  },
  'get /advertisement/:id/deploy': {
      controller: 'AdvertisementController',
      action: 'deploy'
  },
  'get /advertisement/:id/device': {
      controller: 'AdvertisementController',
      action: 'device'
  },
  'get /advertisement/:id/device/search': {
      controller: 'AdvertisementController',
      action: 'searchDevice'
  },
  'post /advertisement/:id/device': {
      controller: 'AdvertisementController',
      action: 'addDevice'
  },
  'get /data/access/:id': {
      controller: 'DataController',
      action: 'access'
  },
  'get /data/access': {
      controller: 'DataController',
      action: 'advertisement'
  },
  'get /data/access-region': {
      controller: 'DataController',
      action: 'accessRegion'
  },
  'get /data/access-street': {
      controller: 'DataController',
      action: 'accessStreet'
  },
  'get /data/access-device': {
      controller: 'DataController',
      action: 'accessDevice'
  },
  'get /data/prize-stock': {
      controller: 'DataController',
      action: 'prizeStockAdvertisement'
  },
  'get /advertisement/client': {
      controller: 'AdvertisementController',
      action: 'client'
  },
  'get /user_client/client': {
      controller: 'User_clientController',
      action: 'client'
  },
  'get /data/prize-winner/search': {
      controller: 'DataController',
      action: 'prizeWinnerSearch'
  },
  'get /data/prize-winner/:advertisement': {
      controller: 'DataController',
      action: 'prizeWinner'
  },

  'get /login': {
      view: 'login'
  },
  'post /login': {
      controller: 'UserController',
      action: 'login'
  },
  'get /advertisement/:id/image': {
      view: 'advertisement-image'
  },
  'post /advertisement/:id/image': {
      controller: 'AdvertisementController',
      action: 'advertisementImage'
  },
  'get /PrizeCoupon/advertisement': {
      controller: 'PrizeCouponController',
      action: 'advertisement'
  },
  'post /generateYesterdayData': {
      controller: "DashboardController",
      action: 'generateYesterdayData'
  },
  'get /client/:id/balance': {
      controller: 'ClientController',
      action: 'balance'
  },
  'post /client/:id/addToBalance': {
      controller: 'ClientController',
      action: 'addToBalance'
  }, 
  'post /ProbabilityDraw': {
      controller: 'ProbabilityDrawController',
      action: 'create'
  }
};
