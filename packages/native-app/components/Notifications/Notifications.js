import PushNotification from 'react-native-push-notification';
import React from 'react';
import {Button, View} from 'react-native';

export default class PushNotifications extends React.Component{

    localNotifications = () => {
        // PushNotification.localNotification({
        //     /* iOS and Android properties */
        //     title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        //     message: "My Notification Message", // (required)
        //     playSound: false, // (optional) default: true
        //     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //     number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //     repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        //     actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        // });
    }

    render(){
        return (
            <View>
                <Button title="Notify" onPress={this.localNotifications} />
            </View>
        )
    }
}



// PushNotification.configure({
//
//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function(token) {
//         console.log( 'TOKEN:', token );
//     },
//
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function(notification) {
//         console.log( 'NOTIFICATION:', notification );
//     },
//
//
//     // IOS ONLY (optional): default: all - Permissions to register.
//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true
//     },
//
//     // Should the initial notification be popped automatically
//     // default: true
//     popInitialNotification: true,
//
//     /**
//      * (optional) default: true
//      * - Specified if permissions (ios) and token (android and ios) will requested or not,
//      * - if not, you must call PushNotificationsHandler.requestPermissions() later
//      */
//     requestPermissions: true,
// });
