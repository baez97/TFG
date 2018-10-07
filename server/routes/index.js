const nursesRoutes = require('./nurses_routes');

module.exports = function(app, db) {
	nursesRoutes(app,db);

}