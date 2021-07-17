import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from "framer-motion"


const Alert = ({ alerts }) => {
      // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }
    return (
        <div className="alert-container">
            {alerts !== null && alerts.length > 0 && alerts.map(alert => (
                <motion.div key={alert.id} className='alert'    
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: .5, repeat: 1, repeatDelay: 3, repeatType: "reverse",}}
                >
                    {alert.alertType === "success" ? <i className="fas fa-check-circle"></i> : <i className="fas fa-exclamation-circle"></i>}
                    <small>{ alert.msg }</small>
                </motion.div>
            ))}
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);