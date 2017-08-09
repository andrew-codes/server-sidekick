import React, {Component} from 'react';

class BrowserTabFavicon extends Component {
    constructor(...rest) {
        super(...rest);
        this.changeFavicon = this.changeFavicon.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.src !== this.props.src;
    }
    componentDidMount() {
        this.changeFavicon(this.props.src);
    }

    componentWillUpdate(nextProps) {
        this.changeFavicon(nextProps.src);
    }

    changeFavicon(src) {
        const head = document ? (document.head || document.getElementsByTagName('head')[0]) : null;
        if (!src || !document) {
            return;
        }
        const link = document.createElement('link');
        const oldLink = document.getElementById('favicon');
        link.id = 'favicon';
        link.rel = 'shortcut icon';
        link.href = src;
        if (oldLink) {
            head.removeChild(oldLink);
        }
        head.appendChild(link);
    }

    render() {
        return null;
    }
}

export default BrowserTabFavicon;
