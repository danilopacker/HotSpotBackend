const { Router } = require('express');
const AccessController = require('./app/controllers/AccessController');

const router = Router();

router.get('/access', AccessController.index);
router.get('/access/:id', AccessController.show);
router.delete('/access/:id', AccessController.delete);
router.post('/access', AccessController.store);
router.put('/access/:id', AccessController.update);

module.exports = router;
