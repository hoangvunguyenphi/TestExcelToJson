var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TauSchema = new Schema({
    SoQuanLy: { type: Number },
    SoThuyenVien: { type: Number },
    ChuPhuongTien: { type: String },
    SoDangKy: { type: String },
    TenTau: { type: String },
    CongDung: { type: String },
    TenThietKe: { type: String },
    CoQuanThietKe: { type: String },
    PhieuDuyet: { type: String },
    NgayDuyet: { type: String },
    CoSoDongTau: { type: String },
    KP: { type: String },
    Xa: { type: String },
    Huyen: { type: String },
    L: { type: Number },
    B: { type: Number },
    D: { type: Number },
    RT: { type: Number },
    f: { type: Number },
    d1: { type: Number },
    TocDo: { type: Number },
    VatLieuVo: { type: Number },
    HieuMay: { type: String },
    May: { type: String },
    SoMay: { type: String },
    CongSuat: { type: Number },
    NoiSanXuat: { type: String },
    VongQuay: { type: String },
    NgayDangKy: { type: String },
    LoaiDangy: { type: String },
    LoaiDangKiem: { type: String },
    NoiDong: { type: String },
    NamDong: { type: String },
    NgayGiaHan: { type: String },
    NgayHetHang: { type: String },
    Nghe: { type: String },
    Tuyen: { type: String },
    NghePhu: { type: String }
});

//xuất mô hình
module.exports = mongoose.model("Tau", TauSchema);
