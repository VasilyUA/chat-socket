module.exports = router => {
    require('./user')(router)
    require('./chat')(router)
    return router;
}