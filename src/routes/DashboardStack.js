
import { createStackNavigator } from 'react-navigation-stack';
import ToDoList from '../screens/ToDoList';

const DashboardStack = createStackNavigator({
  ToDoList: {
    screen: ToDoList
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default DashboardStack


