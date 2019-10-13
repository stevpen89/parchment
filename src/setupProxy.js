const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy("/api", {target: "http://localhost:3035"}))
	app.use(proxy("/s3", {target: "http://localhost:3035"}))
	app.use(proxy("/cards", {target: "http://localhost:3035"}))
	app.use(proxy("/products", {target: "http://localhost:3035"}))
	app.use(proxy("/orders", {target: "http://localhost:3035"}))
	app.use(proxy("/auth/callback", {target: "http://localhost:3035"}))
};