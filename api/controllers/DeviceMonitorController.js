/**
 * DeviceMonitorController
 *
 * @description :: Server-side logic for managing Devicemonitors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
	deviceOK: function(req, res)
    {
        var deviceId = req.param('device');
        var redirect = req.param('redirect');
        DeviceMonitor.update({device: deviceId}, {accessDate: new Date()}).exec(function(err){
            if(err){
                res.serverError(err);
                return;
            }
            if(redirect=="device")
                res.redirect('/device/'+deviceId);
            else if(redirect=="dashboard")
                res.redirect('/');
            else if(redirect=="deviceMonitor")
                res.redirect('/DeviceMonitor');
        });
    },
    faultDeviceReminder: function(req, res){
        var past30DaysDate = moment().subtract(30, "days").startOf('day').toDate();
        DeviceMonitor.find({accessDate: {'<': past30DaysDate}, verifiedDate: {'<': past30DaysDate}}).exec(function(err, faultDevices){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('fault-device-reminder', {faultDevices: faultDevices, moment: moment});
        });
    },
    verifiedOK: function(req, res){
        var deviceMonitor = req.param('deviceMonitor');
        var today = moment().startOf('day').toDate();
        DeviceMonitor.update({id: deviceMonitor}, {verifiedDate: today}).exec(function(err){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect('/DeviceMonitor/fault-device-reminder');
        });
    }
};

