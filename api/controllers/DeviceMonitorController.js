/**
 * DeviceMonitorController
 *
 * @description :: Server-side logic for managing Devicemonitors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	deviceOK: function(req, res)
    {
        var deviceId = req.param('device');
        var redirect = req.param('redirect');
        DeviceMonitor.update({device: deviceId}, {accessDate: new Date()}).exec(function(err){
            if(redirect=="device")
                res.redirect('/device/'+deviceId);
            else if(redirect=="dashboard")
                res.redirect('/');
            else if(redirect=="deviceMonitor")
                res.redirect('/DeviceMonitor');
        });
    }
};

