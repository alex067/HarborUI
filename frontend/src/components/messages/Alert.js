import React from 'react';

const Alert = ({message, severity}) => {
    let className = "alert__message--success";
    
    if(severity === 500){
        className = "alert__message--critical"
    }
    else if (severity === 400){
        className = "alert__message--error"
    }
    console.log(className)
    return(
        <div className="alert">
            <h3 className={'alert__message ' + className}>{message}</h3>
        </div>
    )
}

export default Alert;