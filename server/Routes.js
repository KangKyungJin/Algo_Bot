const controller = require('../Controller');
const path = require('path');

module.exports = app => {
    app.get('/api/algos', controller.allAlgos);
    app.get('/api/algos/:id', controller.oneAlgo);
    app.post('/api/algos', controller.createAlgo);
    app.put('/api/algos/:id', controller.editAlgo);
    app.delete('/api/algos/:id', controller.deleteAlgo);
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
}