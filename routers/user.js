const {registration, login, getUser} = require("../controlers/user")
const {isLogged} = require("../middleware/checkAuth")

module.exports = router => {
    router.route('/registration').post(registration);

    router.route('/login').post(login);

    router.route('/user').get(isLogged, getUser);
}