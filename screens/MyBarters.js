import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'
import { RFValue } from "react-native-responsive-fontsize";

export default class MyBarterScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allBarters : [],
       
     }
     this.requestRef= null
   }


   getAllBarters =()=>{
     this.requestRef = db.collection("all_Barters").where("donor_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allDonations = snapshot.docs.map(document => document.data());
       this.setState({
        allBarters : allBarters,
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.book_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
          /* <TouchableOpacity style={[styles.button,{backgroundColor:item.request_status=== "Book Sent" ? "green": "#ff5722"  }]}
            onPress={()=>{  this.sendBook(item) }} >
*/
<TouchableOpacity style={styles.button}>
             <Text style={{color:'#ffff'}}>Exchange</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )

   /*
   getDonorDetails=(donorId)=>{
    db.collection("users").where("email_id","==", donorId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          "donorName" : doc.data().first_name + " " + doc.data().last_name
        })
      });
    })
  }
   sendNotification=(bookDetails,requestStatus)=>{
    var requestId = bookDetails.request_id
    var donorId = bookDetails.donor_id
    db.collection("all_notifications").where("request_id","==",requestId)
    .where("donor_id","==",donorId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var message = ""
      if(requestStatus==="Book Sent"){
          message=this.state.donorName+" sent you Book"
        }
        else{
          message=this.state.donorName+" has shown interest in donating the book"
        }
        db.collection("all_notifications").doc(doc.id).update({
          "message":message,
          "date":firebase.firestore.FieldValue.serverTimestamp(),
          "notification_status":"unread"
        })
      })
    })
   }
   sendBook=(bookDetails)=>{
     if(bookDetails.request_status==="Book Sent"){
      var requestStatus="Donor Interested"
      db.collection("all_notifications").doc(bookDetails.doc_id).update({
        "request_status":"Donor Interested"
      })
      this.sendNotification(bookDetails,requestStatus)
     }else{
      var requestStatus="Book Sent"
      db.collection("all_notifications").doc(bookDetails.doc_id).update({
        "request_status":"Book Sent"
      })
      this.sendNotification(bookDetails,requestStatus)
     
     }
   }
    */
   componentDidMount(){
     this.getAllBarters()
    //  this.getDonorDetails(this.state.donorId)
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Donations"/>
         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: RFValue(20)}}>List of all Barters</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allBarters}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize:RFValue(20),
    justifyContent:'center',
    alignItems:'center'
  }
})
