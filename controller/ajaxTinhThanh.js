var dataTinhHuyen = require("./dataTinhHuyen.json");
var fs = require("fs");
exports.getAllTinhTP = function(req, res) {
    var tinh = [];
    dataTinhHuyen.forEach(function(data) {
        tinh.push({ id: data.Item["@id"], value: data.Item["@value"] });
    });
    res.json(JSON.parse(JSON.stringify(tinh)));
};
exports.getAllHuyenByTinhID = function(req, res) {
    var idTinh = req.params.id;
    var huyen = [];
    dataTinhHuyen.forEach(function(data) {
        if (data.Item["@id"] == idTinh) {
            data.Item.Item.forEach(function(data2) {
                huyen.push({
                    id: data2["@id"],
                    value: data2["@value"]
                });
            });
        }
    });
    res.json(JSON.parse(JSON.stringify(huyen)));
};

exports.getAllXaByHuyenID = function(req, res) {
    var idHuyen = req.params.id;
    var xa = [];
    dataTinhHuyen.forEach(function(data) {
        data.Item.Item.forEach(function(data2) {
            if (data2["@id"] == idHuyen) {
                data2.Item.forEach(function(data3) {
                    xa.push({
                        id: data3["@id"],
                        value: data3["@value"]
                    });
                });
            }
        });
    });
    res.json(JSON.parse(JSON.stringify(xa)));
};
