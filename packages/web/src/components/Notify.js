import React, {Component} from 'react';

class Notify extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.builds && nextProps.builds.length > 0;
    }

    componentWillUpdate(nextProps) {
        nextProps.builds
            .forEach(this.notify);
        console.log(nextProps.builds);
        nextProps.markNotified(nextProps.builds.map(build => build.instanceId));
    }

    notify = (build) => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
            this.notify(build);
            return;
        }
        const notification = new Notification('Failed Build', {
            icon: '',
            body: `Failed Pipeline ${build.name}`,
        });

        notification.onclick = function() {
            window.open(build.url);
        };
    };

    render() {
        return null;
    }
}

export default Notify;
