module.exports = (router) => {
	require('./user')(router);
	require('./chat')(router);
	router.get('/', (req, res) => res.json({ message: 'Server Worker' }));
	return router;
};
