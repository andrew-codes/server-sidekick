import React from 'react';
import {Image} from 'react-native';

export default class StatusIcon extends React.Component {
    render() {
        const {
            status
        } = this.props;
        const imageSrc = getIconFromStatus(status);
        return (
            <Image
              source={require("../../images/ic_check_circle.png")}
            />
        );
    }
}

const getIconFromStatus = (status) => {
    switch (status) {
      case "pending":
        return "../images/ic_access_time.png";
      case "error":
        return "../images/ic_error.png";
      case "success":
        return "../../images/ic_check_circle.png";
      default:
        return "../images/ic_access_time.png";
    }
}
