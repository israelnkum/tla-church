import React from 'react'
import {connect} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {FiEdit2} from "react-icons/fi";

function TlaEdit ({ link, data, text, icon, activeRoles }) {
    const location = useLocation()
    return (
        // activeRoles.includes('Admin') &&
        <Link title={"Edit"} to={link} state={{
            background: location,
            data: data
        }}>
            {icon && <FiEdit2/>} {text}
        </Link>
    )
}

TlaEdit.defaultProps = {
    text: '',
    type: 'text',
    icon: false
}
TlaEdit.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
    activeRoles: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})

export default connect(mapStateToProps)(TlaEdit)
