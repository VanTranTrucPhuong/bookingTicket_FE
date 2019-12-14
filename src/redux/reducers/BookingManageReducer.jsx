import * as types from '../constants/BookingManageConstant';
import { showMessageAlert, showMessageAlertEvent } from '../../templates/SweetAlert';
import { sendMailConfirmCancel } from '../../common/common';
import { connection } from '../../index'
import { settings } from '../../config/settings';
const initialState = {
    createLCResult: {},
    lichChieuArray: [],
    danhSachGhe: [],
    thongTinPhim: {},
    danhSachGheDaDat: [],
    gheAdmin: {},
    cancelTicket: {},
    objectHuyVe: {},
    datVeResult: {},
    resultPutDSGheDangDat: '',
    objectDsGheDangChon: []
}

export const BookingManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_LICH_CHIEU: {
            state.createLCResult = action.createLCResult;
            if (action.createLCResult === "Thêm lịch chiếu thành công !"){
                showMessageAlertEvent("Notification", "Thêm lịch chiếu thành công !", "success")
            }
            else {
                showMessageAlert("Warning", action.createLCResult.Content, "warning")
            }
            return { ...state }
        }
        case types.GET_LIST_LICH_CHIEU: {
            state.lichChieuArray = action.lichChieuArray;
            return { ...state }
        }
        case types.GET_CHI_TIET_PHONG_VE: {
            state.thongTinPhim = action.thongTinPhim;
            state.danhSachGhe = action.danhSachGhe;
            return { ...state }
        }
        case types.DAT_GHE: {
            //Tìm trong mảng ghế đang đặt 
            // if (state.danhSachGheDaDat.length <= 10) {
            if (action.gheDuocChon.DangDat) {
                state.danhSachGheDaDat = [...state.danhSachGheDaDat, action.gheDuocChon]
            } else {
                state.danhSachGheDaDat = [...state.danhSachGheDaDat.filter(ghe => ghe.MaGhe != action.gheDuocChon.MaGhe)]
            }
            let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan;
            console.log("state.danhSachGheDaDat", state.danhSachGheDaDat);
            connection.invoke("SendListGhe", taiKhoan, JSON.stringify(state.danhSachGheDaDat), action.maLichChieu).catch(err => console.error(err.toString()));;   

            return { ...state }
        }
        // admin
        case types.CHON_GHE_ADMIN: {
            state.gheAdmin = action.gheDuocChonAd
            return { ...state }
        }
        // Đặt vé
        case types.DAT_VE: {
            state.datVeResult = action.datVeResult;
            if (action.datVeResult.Content === "Tài khoản người dùng không tồn tại!" || action.datVeResult.Content === "Tài khoản người dùng không tồn tại!"){
                showMessageAlert('Warning', action.datVeResult.Content, 'warning')
            }
            else {
                showMessageAlertEvent('Notification', 'Hãy kiểm tra email của bạn!', 'success')
            }
        }
        // Hủy vé
        case types.HUY_VE : {
            state.cancelTicket = action.cancelTicket
            state.objectHuyVe = action.objectHuyVe
            if (action.cancelTicket === "Yêu cầu hủy vé được chấp nhận!"){
                // console.log("action.objectHuyVe", action.objectHuyVe);
                sendMailConfirmCancel( action.objectHuyVe.maThanhToan,  action.objectHuyVe.mucHoanTien);
                showMessageAlertEvent("Notification", "Hãy kiểm tra Email của bạn!","success");               
            }
            else{
                showMessageAlert("Notification", "Hủy vé thất bại","warning");
            }
            return { ...state }
        }
        //PUT danh sách ghế đang đặt
        case types.PUT_DANH_SACH_GHE_DANG_DAT : {
            state.objectDsGheDangChon = action.objectDsGheDangChon
            return { ...state }
        }

        default:
            return state;
    }
}
