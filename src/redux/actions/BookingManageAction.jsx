import * as types from '../constants/BookingManageConstant';
import axios from 'axios';
import { settings } from '../../config/settings'

export const createLichChieuAction = (lichChieu) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyDatVe/TaoLichChieu',
            method: 'POST',
            data: {
                MaPhim: lichChieu.MaPhim,
                NgayChieuGioChieu: lichChieu.NgayChieuGioChieu,
                MaRap: lichChieu.MaRap,
                GiaVe: lichChieu.GiaVe
            }
        }).then(result => {
            console.log("createLichChieuAction", result);
            dispatch({
                type: types.CREATE_LICH_CHIEU,
                createLCResult: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const getLichChieuListAction = () => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyDatVe/LayDanhSachLichChieu',
            method: 'GET'
        }).then(result => {
            console.log("getLichChieuListAction", result);
            dispatch({
                type: types.GET_LIST_LICH_CHIEU,
                lichChieuArray: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const bookingSeatAction = (gheDuocChon, maLichChieu) => {
    return {
        type: types.DAT_GHE,
        gheDuocChon,
        maLichChieu
    }
}

export const putDataInvokeAction = (objectDsGheDangChon) => {
    return {
        type: types.PUT_DANH_SACH_GHE_DANG_DAT,
        objectDsGheDangChon,
    }
}

// Admin
export const chonGheAdminAction = (gheDuocChonAd) => {
    return {
        type: types.CHON_GHE_ADMIN,
        gheDuocChonAd
    }
}


export const getChiTietPhongVeAction = (maLichChieu) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
            method: 'GET',
        }).then(result => {
            console.log("layChiTietPhongVeAction", result.data);
            dispatch({
                type: types.GET_CHI_TIET_PHONG_VE,
                danhSachGhe: result.data.DanhSachGhe,
                thongTinPhim: result.data.ThongTinPhim
            })
        }).catch(errors => {
            console.log(errors.response.data);
        })
    }
}

export const bookingTicketAction = (objectDatVe) => {
    console.log(objectDatVe);
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/DatVe`,
            method: 'POST',
            data: objectDatVe,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(settings.token)
            }
        }).then(result => {
            dispatch({
                type: types.DAT_VE,
                datVeResult: result.data
            })
            // swal.fire('Thông báo', result.data, 'success').then(resultdata => {
            //     window.location.reload()
            // });
        }).catch(errors => {
            // console.log(errors.response.data);
        })
    }
}


export const cancelTicketAction = (objectHuyVe) => {
    console.log(objectHuyVe);
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/HuyVe?maThanhToan=${objectHuyVe.maThanhToan}&mucHoanTien=${objectHuyVe.mucHoanTien}`,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result);
            dispatch({
                type: types.HUY_VE,
                objectHuyVe: objectHuyVe,
                cancelTicket: result.data
            })
        }).catch(errors => {
            // console.log(errors.response.data);
        })
    }
}

// Put danh sách ghế đang đặt
export const putListGheDangDatAction = (objectGheDangDat) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/PutDanhSachVeDangDat`,
            method: 'POST',
            data: objectGheDangDat
        }).then(result => {
            console.log("putListGheDangDatAction", result.data);
            dispatch({
                type: types.PUT_DANH_SACH_GHE_DANG_DAT,
                resultPutDSGheDangDat: result.data
            })
        }).catch((errors) => {
            // console.log(errors.response.data);
        })
    }
}

