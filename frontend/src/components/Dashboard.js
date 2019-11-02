import React, { Component } from 'react'
import {connect} from 'react-redux'

const Dashboard = () => {
    const history = useHistory();
    const location = useLocation();
    console.log(history)
    return (
        <div>
            yes
        </div>
    )

}

function mapStateToProps(state){
    return{
        user: state.user,
        jobs: state.jobs
    }
}

export default connect(mapStateToProps)(Dashboard)