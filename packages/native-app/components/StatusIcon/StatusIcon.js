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
              source={imageSrc}
            />
        );
    }
}

const getIconFromStatus = (status) => {
    switch (status) {
      case "pending":
      case 1:
        return require("../../images/ic_access_time.png");
      case "error":
      case 3:
        return require("../../images/ic_error.png");
      case "success":
      case 2:
        return require("../../images/ic_check_circle.png");
      default:
        return require("../../images/ic_error.png");
    }
}
