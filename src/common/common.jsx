import moment from 'moment'

export const sendMailConfirmBooking = (danhSachGheDaDat, thongTinPhim, maThanhToan) => {
    const templateId = 'bookingticket';
    let stringGhe = '';
    let tongTien = 0;
    danhSachGheDaDat.map((ghe, index) => {
        let string = ghe.TenGhe + '-' + ghe.GiaVe;
        stringGhe = stringGhe + string + ', ';
        return tongTien += ghe.GiaVe;
    })
    setTimeout(() => {
        const templateParams = {
            to_mail: 'vantrantrucphuong@gmail.com',
            maThanhToan: maThanhToan,
            tenPhim: thongTinPhim.TenPhim,
            ngayChieu: thongTinPhim.NgayChieu,
            gioChieu: thongTinPhim.GioChieu,
            cumRap: thongTinPhim.TenCumRap,
            tenRap: thongTinPhim.TenRap,
            danhSachGhe: stringGhe,
            tongTien: tongTien
        }
        console.log(templateParams.maThanhToan);
        const userID = 'user_EhyaWsARPVawgX7Jf5dIu'
        sendFeedback('moviestar_gmail_com', templateId, templateParams, userID)
    }, 2000);
}

export const sendMailConfirmCancel = (maThanhToan, mucHoanTien) => {
    const templateId = 'confirmcancel';
    const templateParams = {
        to_mail: 'vantrantrucphuong@gmail.com',
        maThanhToan: maThanhToan,
        mucHoanTien: mucHoanTien
    }
    const userID = 'user_EhyaWsARPVawgX7Jf5dIu'
    sendFeedback('moviestar_gmail_com', templateId, templateParams, userID)
}


export const sendFeedback = (serviceID, templateID, templateParams, userID) => {
    window.emailjs.send(
        serviceID, templateID,
        templateParams,
        userID
    ).then(res => {
        console.log('Email successfully sent!')
    })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
}

export const dateDiff = (startDate, endDate) => {
    var startDateF = moment(startDate, "DD.MM.YYYY");
    var endDateF = moment(endDate, "DD.MM.YYYY");

    console.log(startDateF, endDateF);

    var duration = endDateF.diff(startDateF, 'days');
    return duration;
}

// Disable date less than current
export const disabledDate = (current) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
}
