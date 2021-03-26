var express = require('express');
var router = express.Router();

var userRouter = require('./user.router');
/** 
    this page contrain all the roots of routes, which will directed to the details roots of the main roots.
    the presentation of the roots schema is below:
    ├───security.routes
    │   ├───inscrire
    |   ├───login In
    ├───user.routes (recherche/filter)
    │   ├───public
    |   ├───privée
    ├───match.routes
    │   ├───profiles photos
    |   ├───filter
    ├───notification.routes
    │   ├───*profiles photos
    |   ├───*filter
        ├───*user.routes
    │   ├───*public
    |   ├───*privée
    ├───chat.routes(fixe sur footer chaque page) 
    │   ├───*profiles photos
    |   ├───*filter
    *: not defined yet

*/

router.use('/', securityRoutes);

router.use('/users',userRouter);

router.use('/match', matchRouter);

router.use('/notification', notificationRouter);

router.use('/chat', chatRouter);


module.exports = router;