import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
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
    justifyContent: 'space-between',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
