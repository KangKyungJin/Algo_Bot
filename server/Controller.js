const Algo = require("../Model");

module.exports = {
    allAlgos: (req, res) => {
        Algo.find()
            .then(data => {
                res.json({message: "success", results: data});
            })
            .catch(err => {
                res.json({message: "error", results: err});
            })
    },
    oneAlgo: (req, res) => {
        Algo.findOne({_id: req.params.id})
            .then(data => {
                res.json({message: "sucess", results: data});
            })
            .catch(err => {
                res.json({message: "error", results: err});
            })
    },
    createAlgo: (req, res) => {
        Algo.create(req.body)
            .then(data => {
                res.json({message: "success", results: data});
            })
            .catch(err => {
                res.json({message:"error", results: err});
            })
    },
    editAlgo: (req, res) => {
        Algo.updateOne({_id: req.params.id}, req.body, {runValidators: true})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({message: "error", results: err});
            })
    },
    deleteAlgo: (req, res) => {
        Algo.findOneAndDelete({_id: req.params.id})
            .then(data => {
                res.json({message: "success", results: data});
            })
            .catch(err => {
                res.json({message: "error", results: err});
            })
    }
}