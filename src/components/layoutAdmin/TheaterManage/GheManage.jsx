import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getGheListAction } from '../../../redux/actions/TheaterSystemManageAction'
import { Spin } from 'antd'
import Ghe from './Ghe'

class GheManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maRap: this.props.match.params.MaRap,
            danhSachGhe: [],
        }
    }


    componentDidMount() {
        this.props.getGheList(this.state.maRap);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("nextProps", nextProps);
        // console.log("prevState", prevState);
        return {
            ...prevState, danhSachGhe: nextProps.danhSachGhe
        }
    }

    renderDanhSachGhe = () => {
        return this.state.danhSachGhe.map((ds, index) => {
            return (
                <div className="d-flex" key={index}>
                    <span className="tenHang__admin">{ds.TenHang}</span>
                    {
                        ds.DanhSachGheTheoHang.map((ghe, i) => {
                            return <Ghe className="ghe__admin" ghe={ghe} index={i + 1} tenHang={ghe.TenHang} key={i} />
                        })
                    }
                </div>
            )
        })
    }

    render() {
        if (this.state.danhSachGhe.length === 0) {
            return (
                <div className="spinner" style={{ textAlign: "center" }}>
                    <Spin size="large"></Spin>
                </div>)
        }
        return (
            <div>
                <div>
                    {this.renderDanhSachGhe()}
                </div>
                <div className="infor__ghe">

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        danhSachGhe: state.TheaterSystemManageReducer.danhSachGhe,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGheList: (maRap) => {
            dispatch(getGheListAction(maRap))
        }
    }
}

export default (withRouter)(connect(mapStateToProps, mapDispatchToProps)(GheManage)) 