"use client"
import { useState } from "react"
import '../globals.css'
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
const AddItem = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [isAddingItem, setIsAddingItem] = useState(false)
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setIsAddingItem(true)
            await addDoc(collection(db,'items'),{
                name: name,
                quantity: Number(quantity),
                expiryDate: expiryDate
            })
            setName('')
            setQuantity('')
            setExpiryDate('')
            setIsAddingItem(false)
        } catch (error) {
            console.log(error);
            setIsAddingItem(false)
            
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
      <h1 style={{fontSize:'30px',textAlign:'center',color:'crimson'}}>Add Item Form</h1>
        <input type="text" value={name} placeholder="Enter item name" onChange={(e)=>setName(e.target.value)} required/>
        <input type="number" value={quantity} placeholder="Enter Quantity" onChange={(e)=>setQuantity(e.target.value)} required/>
        <input type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} required/>
        <button type="submit">{isAddingItem ? 'Adding Item...' : 'Add Item'}</button>
      </form>
    </div>
  )
}

export default AddItem
