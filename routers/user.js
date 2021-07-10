const {registration} = require("../controlers/user")

module.exports = router => {
    router.route('/registration').post(registration);
}