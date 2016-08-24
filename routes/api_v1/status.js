module.exports = function(router, passport) {
	
	var authUtil = require('./authUtil');
	var Status = require('../../models/status');
	var Beat = require('../../models/beat');
	
	router.get('/status', function(req, res) {
		
		// TODO
		// case 1: waiting for # more votes until next generation, you have voted for this, 
		//		   create a mutation in advance, or play around in sandbox mode
		// case 2: not enough mutations in generation #, please create one here!'
		
		Status.findOne({}, {}, { sort: { 'created' : -1 } }, function(err, status) {
			
			if (!status) {
				console.log('no status')
				status = new Status({}).save(function(err, status) {
					getVariantCount(status);
				});
			} else {
				getVariantCount(status);
			}
			
			function getVariantCount(status) {
				
				var currentVersion = status.version;
				
				console.log('currVersion: ' + currentVersion);
				
				Beat.find({version: currentVersion}, function(err, beats) {
					
					var variantCount = beats.length;
					
					console.log('variantCount: ' + variantCount);
					
					
					res.json({version: currentVersion, variantCount: variantCount});
					
				});
				
				
			}
		
			
			
		});
		
		
		
	});
	
};