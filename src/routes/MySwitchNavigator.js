import React, { Component } from 'react';
import { Platform, StatusBar, View, DeviceEventEmitter } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import colors from '../utils/colors';
import NavigationServices from '../utils/NavigationServices';
import MyLoader from '../components/MyLoader';
import DashboardStack from './DashboardStack';

class MySwitchNavigator extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const SwitchNavigator = createAppContainer(
            createSwitchNavigator({
                DashboardStack,
            }, {
                initialRouteName: "DashboardStack"
            })
        );
        return (
            <View style={{ flex: 1, backgroundColor: colors.colorBackground }}>
                <StatusBar barStyle="light-content" />
                <SwitchNavigator ref={navigatorRef => {
                    NavigationServices.setTopLevelNavigator(navigatorRef);
                }} />
                <MyLoader />
            </View>
        )


    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MySwitchNavigator)
