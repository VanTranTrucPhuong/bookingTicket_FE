import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRapListAction } from '../../../redux/actions/TheaterSystemManageAction'
import { Table } from 'antd';

class RapManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maCumRap: this.props.match.params.MaCumRap
        }

    }

    componentDidMount() {
        this.props.getRapList(this.state.maCumRap)
    }

    columns = [
        {
            title: 'Mã rạp',
            dataIndex: 'MaRap',
        },
        {
            title: 'Tên rạp',
            dataIndex: 'TenRap',
        },
        {
            title: 'Số ghế',
            dataIndex: 'SoGhe',
        },
    ];

    render() {
        return (
            <div>
                <Table
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: event => { this.props.history.push('/admin/ghemanage/' + record.MaRap) }, // double click row                      
                        };
                    }}
                    title={() => 'DANH SÁCH CÁC RẠP CỦA CỤM RẠP ' + this.props.thongTinCumRap.TenCumRap} rowKey={record => record.MaRap} columns={this.columns} dataSource={this.props.danhSachRap} size="middle" bordered />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        danhSachRap: state.TheaterSystemManageReducer.danhSachRap,
        thongTinCumRap: state.TheaterSystemManageReducer.thongTinCumRap,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRapList: (maCumRap) => {
            dispatch(getRapListAction(maCumRap))
        }
    }
}

export default (withRouter)(connect(mapStateToProps, mapDispatchToProps)(RapManage));