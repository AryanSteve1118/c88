import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'

export default class Exchange extends Component{

  constructor(){
    super()
    this.state = {
      userName : firebase.auth().currentUser.email,
      itemName : "",
      description : "",
      requestedItemName:'',
      IsExchangeRequestActive : "",
      itemStatus:"",
      requestId:"",
      userDocId: '',
      docId :''
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest = async (itemName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_items').add({
        "user_id": userId,
        "item_name":itemName,
        "description":description,
        "request_id"  : randomRequestId,
        "item_status" : "requested",
         "date"       : firebase.firestore.FieldValue.serverTimestamp()

    })

    await  this.getItemRequest()
    db.collection('users').where("email_id","==",userId).get()
    .then()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        db.collection('users').doc(doc.id).update({
      IsExchangeRequestActive: true
      })
    })
  })

    this.setState({
        itemName :'',
        reasonToRequest : '',
        requestId: randomRequestId
    })

    return Alert.alert("Item Requested Successfully")


  }

  getIsExchangeRequestActive(){
    db.collection('users')
    .where('email_id','==',this.state.userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
          userDocId : doc.id
        })
      })
    })
  }
  
  receivedItems=(itemName)=>{
    var userId = this.state.userId
    var requestId = this.state.requestId
    db.collection('received_items').add({
        "user_id": userId,
        "item_name":itemName,
        "request_id"  : requestId,
        "itemStatus"  : "received",
  
    })
  }
  
  getExchangeRequest =()=>{
    // getting the requested book
  var exchangeRequest=  db.collection('requested_items')
    .where('user_id','==',this.state.userId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.data().book_status !== "received"){
          this.setState({
            requestId : doc.data().request_id,
            requestedBookName: doc.data().book_name,
            bookStatus:doc.data().book_status,
            docId     : doc.id
          })
        }
      })
  })}
  
  componentDidMount(){
    this.getIsExchangeRequestActive()
    this.getExchangeRequest()
  }

  sendNotification=()=>{
    //to get the first name and last name
    db.collection('users').where('email_id','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var name = doc.data().first_name
        var lastName = doc.data().last_name
  
        // to get the donor id and book nam
        db.collection('all_notifications').where('request_id','==',this.state.requestId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var donorId  = doc.data().donor_id
            var itemName =  doc.data().item_name
  
            //targert user id is the donor id to send notification to the user
            db.collection('all_notifications').add({
              "targeted_user_id" : donorId,
              "message" : name +" " + lastName + " received the item " + itemName ,
              "notification_status" : "unread",
              "item_name" : itemName
            })
          })
        })
      })
    })
  }

  updateExchangeRequestStatus=()=>{
    //updating the book status after receiving the book
    db.collection('requested_items').doc(this.state.docId)
    .update({
      item_status : 'recieved'
    })
  
    //getting the  doc id to update the users doc
    db.collection('users').where('email_id','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        //updating the doc
        db.collection('users').doc(doc.id).update({
          IsExchangeRequestActive: false
        })
      })
    })
  
  
  }
  render(){

    if(this.state.IsExchangeRequestActive === true){
      return(

        // Status screen

        <View style = {{flex:1,justifyContent:'center'}}>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text>Item Name</Text>
          <Text>{this.state.requestedItemName}</Text>
          </View>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text> Item Status </Text>

          <Text>{this.state.itemStatus}</Text>
          </View>

          <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
          onPress={()=>{
            this.sendNotification()
            this.updateExchangeRequestStatus();
            this.receivedItems(this.state.requestedItemName)
          }}>
          <Text>I recieved the Item </Text>
          </TouchableOpacity>
        </View>
      )
    }
    else
    {
    return(
      // Form screen
        <View style={{flex:1}}>
          <MyHeader title="Request Item" navigation ={this.props.navigation}/>

          <ScrollView>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter item name"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}
                value={this.state.itemName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{ this.addRequest(this.state.itemName,this.state.reasonToRequest);
                }}
                >
                <Text>Request</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
  }
}
}


const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

})
