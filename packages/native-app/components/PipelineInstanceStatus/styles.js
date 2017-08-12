import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    text1: {
        height: 20,
        fontWeight: 'bold',
    },
    text2: {
        height: 20
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    icon: {
        alignItems: 'center',
        display: 'flex',
        marginRight: 20,
    },
    pipelineItem: {
        flex: 1,
    },
});
