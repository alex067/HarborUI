import React, { Component } from 'react'
import {connect} from 'react-redux'

class Dashboard extends Component {
    render() {
        return (
            <div>
                yes
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        jobs: state.jobs
    }
}

export default connect(mapStateToProps)(Dashboard)