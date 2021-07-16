const user = require("../controlers/user")
const {isLogged} = require("../middleware/checkAuth")

module.exports = router => {
    router.route('/registration').post(user.registration);

    router.route('/login').post(user.login);

    router.route('/user').get(isLogged, user.getUser);
    router.route('/user-list').get(isLogged, user.userList);
}