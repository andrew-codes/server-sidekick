import PushNotification from 'react-native-push-notification';
import React, {Component} from 'react';

class Notify extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.builds && nextProps.builds.length > 0;
    }

    componentWillUpdate(nextProps) {
        nextProps.builds
            .forEach(this.notify);
        nextProps.markNotified(nextProps.builds.map(build => build.instanceId));
    }

    notify = (build) => {
        PushNotification.localNotification({
            title: `Build Failed`,
            message: `${build.name} - ${build.pipelineName}`,
            playSound: true,
            soundName: 'default',
            number: 0,
        });
    };

    render() {
        return null;
    }
}

export default Notify;
