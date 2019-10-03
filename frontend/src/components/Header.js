import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(){
        super()
    }
 
    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <span className="navbar-brand__logo">
                           &nbsp;
                        </span>
                        <span className="navbar-brand__title">Cron<span className="navbar-brand__title__sub">UI</span></span>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {user: state.user}
}

export default connect(mapStateToProps)(Header);