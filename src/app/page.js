'use client'
import AddItem from "./components/AddItem"
import ItemsTable from "./components/ItemsTable"
import { collection, getDocs } from "firebase/firestore"
import { useState } from "react"
import {db} from './firebase/firebaseConfig'
import './globals.css'
const Page = () => {
  const [items, setItems] = useState([])
  const getItems = async() => {
      try {
          const itemsCollection = collection(db,'items')
          const snapShot = await getDocs(itemsCollection)
          const itemsList = snapShot.docs.map(doc => (
          {
              id: doc.id,
              ...doc.data()
          }
          
      ))
      //console.log('asdf');
      setItems(itemsList)
        }  catch (error) {
         console.log(error);
          
      }
     
  }
  return (
    <div className="appContainer">
      <h1 className="appTitle">Pantry Tracker</h1>
      {/* <AddItem/>
      <ItemsTable items={items} setItems={setItems} getItems={getItems}/> */}
      <div className="parent-container">
      <div className="add-item-container">
        <AddItem setItems={setItems} />
      </div>
      <div className="items-table-container">
        <ItemsTable items={items} setItems={setItems} getItems={getItems} />
      </div>
    </div>
    </div>
  )
}

export default Page
