import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import CardView from 'react-native-cardview'
import Images from '../utils/Images'
import colors from '../utils/colors'
import { addToDO, markToDO, removeToDo, unMarkToDO } from '../redux/actions'

class ToDoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            addModal: false,
            markedActive: false
        }
    }


    hideAddModel = () => {
        this.setState({ addModal: false, text: "" })
    }


    renderFab = () => {
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={25}
                style={styles.cardFab}  >
                <TouchableOpacity onPress={() => this.setState({ addModal: true })} style={styles.btnFab}>
                    <Image style={styles.imgFab} source={Images.ic_add} />
                </TouchableOpacity>
            </CardView>
        )
    }

    renderAddModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.addModal}
                onRequestClose={() => this.hideAddModel()} >
                <View style={styles.modelContainer}>
                    <CardView
                        cardElevation={3}
                        cardMaxElevation={3}
                        cornerRadius={10}
                        style={styles.cardModelContainer}>
                        <View style={styles.viewModelContainer}>
                            <View style={styles.mainView}>
                                <Text style={styles.textToDo}>Add TODO</Text>
                                <TouchableOpacity onPress={this.hideAddModel} style={styles.btnClose}>
                                    <Image source={Images.ic_close} style={styles.imgClose} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={(text) => this.setState({ text })}
                                    value={this.state.text} numberOfLines={1}
                                    placeholder={'Enter TODO'}
                                    style={styles.input} />
                            </View>
                            <View style={styles.btnContainer} >
                                <TouchableOpacity
                                    style={[styles.btnCancel]} onPress={() => this.setState({ addModal: false, text: "", })} >
                                    <Text style={styles.cancelBtnText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btnCancel, { backgroundColor: colors.colorGreen }]}
                                    onPress={() => {
                                        if (!this.state.text || this.state.text == '') {
                                            alert("Please Enter TODO")
                                            return
                                        }
                                        let id = 1;
                                        let list = this.props.toDoList
                                        if (list.length > 0) {
                                            id = list[list.length - 1].id + 1
                                        }
                                        this.props.addToDo({ id, text: this.state.text, marked: false })
                                        this.hideAddModel()
                                    }} >
                                    <Text style={styles.cancelBtnText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CardView>
                </View>
            </Modal>
        )
    }

    renderToDoItem = ({ item, index }) => {
        const { id, text, marked } = item
        const { markedActive } = this.state
        if (marked == markedActive) {
            return (
                <CardView
                    style={styles.cardItem}
                    cardElevation={1}
                    cardMaxElevation={2}
                    cornerRadius={0} >
                    <View style={styles.itemContainer}>
                        <View style={styles.rowItem}>
                            <View style={styles.viewText} >
                                <Text style={styles.textItem}>{text}</Text>
                            </View>
                            <View style={styles.viewItemButtons} >
                                <TouchableOpacity onPress={() => {
                                    Alert.alert(
                                        "Confirm Delete",
                                        '' + "Are you sure you want to Mark " + (markedActive ? "Incomplete" : "Complete") + " this item ? " + '',
                                        [{ text: 'Mark', onPress: () => markedActive ? this.props.unMarkToDO(index) : this.props.markToDO(index) },
                                        { text: 'Cancel' }
                                        ], { cancelable: false }
                                    )
                                }} style={[styles.btnDelete, { backgroundColor: colors.colorGreen }]}>
                                    <Text style={{ color: colors.colorWhite, fontSize: 12, }}>{markedActive ? "Mark Incomplete" : "Mark Complete"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    Alert.alert(
                                        "Confirm Delete",
                                        '' + "Are you sure you want to delete this item?" + '',
                                        [{ text: 'Delete', onPress: () => this.props.deleteToDo(index) },
                                        { text: 'Cancel' }
                                        ], { cancelable: false }
                                    )
                                }} style={styles.btnDelete}>
                                    <Text style={{ color: colors.colorWhite, fontSize: 12, }}>{"Delete"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </CardView>
            )
        }

    }

    render() {
        const { markedActive } = this.state
        return (
            <View style={styles.container} >
                {this.renderFab()}
                {this.renderAddModal()}
                <SafeAreaView />
                <View style={styles.toolbar} >
                    <Text style={styles.toolbarText}>To Do List</Text>
                </View>
                <View style={styles.separator}></View>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.setState({ markedActive: false })} style={[styles.btnHeader, { backgroundColor: !markedActive ? colors.colorGreen : colors.colorLightGrey }]}>
                        <Text style={{ color: markedActive ? 'grey' : colors.colorWhite, fontSize: 14, }}>{"Unmarked List"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ markedActive: true })} style={[styles.btnHeader, { backgroundColor: markedActive ? colors.colorGreen : colors.colorLightGrey }]}>
                        <Text style={{ color: !markedActive ? 'grey' : colors.colorWhite, fontSize: 14, }}>{"Marked List"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.marginedContainer}>
                    <FlatList
                        data={this.props.toDoList}
                        renderItem={this.renderToDoItem}
                        extraData={this.state}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        toDoList: state.toDoReducer
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToDo: (data) => dispatch(addToDO(data)),
        deleteToDo: (data) => dispatch(removeToDo(data)),
        markToDO: (data) => dispatch(markToDO(data)),
        unMarkToDO: (data) => dispatch(unMarkToDO(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBackground
    },
    toolbar: {
        flexDirection: 'row',
        width: '100%', paddingVertical: 10,
        backgroundColor: colors.colorsPrimary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbarText: {
        flex: 1,
        fontSize: 20,
        color: colors.colorWhite,
        textAlign: 'center',
    },
    cardFab: {
        position: 'absolute',
        bottom: 40,
        right: 30, zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, width: 50,
        borderRadius: 25
    },
    btnFab: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.colorsPrimary,
        padding: 15
    },
    imgFab: {
        resizeMode: 'contain',
        width: '100%', height: '100%',
        tintColor: colors.colorWhite
    },
    modelContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    cardModelContainer: { width: "80%", backgroundColor: colors.colorBackground, },
    separator: { height: 1, backgroundColor: colors.colorBackground, },
    viewModelContainer: { backgroundColor: colors.colorWhite, borderRadius: 10, overflow: 'hidden' },
    mainView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
    textToDo: { color: colors.colorBlack, fontSize: 14, },
    btnClose: { flexDirection: 'row', alignItems: 'center' },
    imgClose: { height: 18, width: 18, resizeMode: 'contain', },
    inputContainer: {
        overflow: 'hidden', borderRadius: 10, justifyContent: 'center', height: 40,
        borderColor: colors.colorBlack, borderWidth: 1,
        backgroundColor: 'white',
        marginHorizontal: 10, marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 34,
        margin: 4,
        fontSize: 13,
        padding: 4,
    },
    btnHeader: { flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center' },
    btnContainer: { flexDirection: 'row', justifyContent: 'space-evenly', width: '70%', alignSelf: 'center', marginTop: 5, marginBottom: 15 },
    btnCancel: { alignItems: 'center', justifyContent: 'center', width: 70, paddingVertical: 10, backgroundColor: colors.colorsPrimary, borderRadius: 5 },
    cancelBtnText: { color: colors.colorWhite, fontSize: 14, },
    cardItem: { backgroundColor: colors.colorWhite, marginBottom: 10 },
    itemContainer: { borderRadius: 0, overflow: 'hidden', flex: 1 },
    rowItem: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5, flex: 1 },
    viewText: { justifyContent: 'center', flex: 1 },
    textItem: { color: colors.colorBlack, fontSize: 14, },
    viewItemButtons: { alignItems: 'flex-end', paddingVertical: 10, justifyContent: 'center' },
    btnDelete: { alignItems: 'center', justifyContent: 'center', marginVertical: 4, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 100, backgroundColor: colors.colorsPrimary }

}
)