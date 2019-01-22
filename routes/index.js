var express = require("express");
var router = express.Router();
var multer = require("multer");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var ajaxTinhThanh = require("../controller/ajaxTinhThanh");
var tauModel = require("../models/tau");

var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(
            null,
            file.fieldname +
                "-" +
                datetimestamp +
                "." +
                file.originalname.split(".")[
                    file.originalname.split(".").length - 1
                ]
        );
    }
});
var upload = multer({
    //multer settings
    storage: storage,
    fileFilter: function(req, file, callback) {
        //file filter
        if (
            ["xls", "xlsx"].indexOf(
                file.originalname.split(".")[
                    file.originalname.split(".").length - 1
                ]
            ) === -1
        ) {
            return callback(new Error("Wrong extension type"));
        }
        callback(null, true);
    }
}).single("file");

router.post("/upload", function(req, res) {
    var exceltojson;
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if (
            req.file.originalname.split(".")[
                req.file.originalname.split(".").length - 1
            ] === "xlsx"
        ) {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson(
                {
                    input: req.file.path,
                    output: null
                },
                function(err, result) {
                    if (err) {
                        return res.json({
                            error_code: 1,
                            err_desc: err,
                            data: null
                        });
                    }
                    tauModel.insertMany(result, function(error, docs) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json(docs); //just rendering the document i got
                        }
                    });
                }
            );
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    });
});

/* GET home page. */
router.get("/", function(req, res, next) {
    tauModel.find({}, function(err, dulieu) {
        res.send(dulieu);
    });
});

router.get("/TraCuuThongTinTau/page=:page", function(req, res, next) {
    var perPage = 24;
    var page = req.params.page || 1;
    console.log(page);
    tauModel
        .find({})
        .sort({ SoQuanLy: "desc" })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(function(err, docs) {
            tauModel.count().exec(function(err, count) {
                if (err) return next(err);
                console.log(page);
                console.log(perPage);
                res.render("TraCuuThongTinTau", {
                    data: docs,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
});
/* GET home page. */
router.get("/importData", function(req, res, next) {
    res.render("upload");
});

/* GET home page. */
router.get("/TraCuu", function(req, res, next) {
    res.render("TraCuuThongTinTau");
});

router.get("/getAllTinhTP", ajaxTinhThanh.getAllTinhTP);

router.get("/getAllHuyenByTinhID/:id", ajaxTinhThanh.getAllHuyenByTinhID);

router.get("/getAllXaByHuyenID/:id", ajaxTinhThanh.getAllXaByHuyenID);
module.exports = router;
