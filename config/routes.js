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
  'get /upload/:uri': {
      controller: 'FileController',
      action: 'get'
  },
  'get /advertisement/:id/prize': {
    view: 'prize'
  },
  'get /advertisement/:id/quiz': {
    controller: 'AdvertisementController',
    action: 'quiz'
  },
  'get /advertisement/json': {
      controller: 'AdvertisementController',
      action: 'getJSON'
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
  'post /advertisement/remove-device': {
      controller: 'AdvertisementController',
      action: 'removeDevice'
  },
  'post /advertisement/:id/device': {
      controller: 'AdvertisementController',
      action: 'addDevice'
  },
  'get /advertisement/removeDeviceMonitor': {
      controller: 'AdvertisementController',
      action: 'removeOldDeviceMonitor'
  },
  'post /device/:id/pushmsg': {
      controller: 'DeviceController',
      action: 'pushmsg'
  }
  /*,
  'post /device/add-advertisement': {
      controller: 'DeviceController',
      action: 'addAdvertisement'
  }*/
  ,
  'get /data/access': {
      controller: 'DataController',
      action: 'access'
  },
  'get /data/access-region': {
      controller: 'DataController',
      action: 'accessRegion'
  },
  'get /data/access-category': {
      controller: 'DataController',
      action: 'accessCategory'
  },
  'get /data/category-compare': {
      controller: 'DataController',
      action: 'categoryCompare'
  },
  'get /data/access-region/client': {
      controller: 'DataController',
      action: 'accessRegionClient'
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
      action: 'prizeStock'
  },
  'get /advertisement/client': {
      controller: 'AdvertisementController',
      action: 'client'
  },
  'get /user_client/client': {
      controller: 'User_clientController',
      action: 'client'
  },
  'get /data/prize-winner': {
      controller: 'DataController',
      action: 'prizeWinner'
  },
  'get /data/AppUser': {
      controller: 'DataController',
      action: 'appUser'
  },
  'get /data/prize-winner': {
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
  'post /advertisement/:id/publish': {
      controller: 'AdvertisementController',
      action: 'publish'
  },
  'post /advertisement/:id/image': {
      controller: 'AdvertisementController',
      action: 'advertisementImage'
  },
  'post /advertisement/:id/shareImage': {
      controller: 'AdvertisementController',
      action: 'shareImage'
  },
  'post /generateYesterdayData': {
      controller: "DashboardController",
      action: 'generateYesterdayData'
  },
  'get /client/:id/balance': {
      controller: 'ClientController',
      action: 'balance'
  },
  'post /client/:id/image': {
      controller: 'ClientController',
      action: 'clientImage'
  },
  'post /client/:id/addToBalance': {
      controller: 'ClientController',
      action: 'addToBalance'
  },
  'post /ProbabilityDraw': {
      controller: 'ProbabilityDrawController',
      action: 'create'
  },
  'get /advertisement/expired-date-reminder': {
      controller: 'AdvertisementController',
      action: 'expiredDateReminder'
  },
  'get /client/balance-reminder': {
      controller: 'ClientController',
      action: 'balanceReminder'
  },
  'get /client/click-ranking': {
      controller: 'ClientController',
      action: 'clickRanking'
  },
  'get /DeviceMonitor/fault-device-reminder': {
      controller: 'DeviceMonitorController',
      action: 'faultDeviceReminder'
  },
  'get /DeviceMonitor/verified-ok': {
      controller: 'DeviceMonitorController',
      action: 'verifiedOK'
  },

  'get /dashboard/message': {
      controller: 'DashboardController',
      action: 'message'
  },
  'get /dashboard/topup-request':{
      controller: 'DashboardController',
      action: 'topupRequest'
  },
  'get /message/find-from-dashboard': {
      controller: 'MessageController',
      action: 'findFromDashboard'
  },
  'get /TopupRequest/find-from-dashboard': {
      controller: "TopupRequestController",
      action: 'findFromDashboard'
  },
  'get /TopupRequest/update-status': {
      controller: "TopupRequestController",
      action: "updateStatus"
  },
  'get /message/update-status': {
      controller: "MessageController",
      action: "updateStatus"
  },
  'get /request/update-status': {
      controller: "RequestController",
      action: "updateStatus"
  },
  'get /data/AppUser-statistics': {
      controller: 'DataController',
      action: 'appUserStatistics'
  },
  'get /street/import': {
    controller: 'StreetController',
    action: 'import'
  },
  'post /street/import': {
    controller: 'StreetController',
    action: 'importAction'
  }


};
