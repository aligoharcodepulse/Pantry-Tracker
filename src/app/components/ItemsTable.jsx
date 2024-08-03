
"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react"
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
import UpdateItemDialog from './UpdateItemDialog'
import '../globals.css'

const ItemsTable = ({ items, setItems, getItems }) => {

    useEffect(() => {
        getItems();
    }, [])

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const [searchPerformed, setSearchPerformed] = useState(false) 

    const handleUpdateItem = (itemId) => {
        const item = items.find((s) => s.id === itemId);
        setCurrentItem(item);
        setEditDialogOpen(true);
    }

    const handleSaveItem = async () => {
        const itemDoc = doc(db, 'items', currentItem.id);
        await updateDoc(itemDoc, {
            name: currentItem.name,
            quantity: currentItem.quantity,
            expiryDate: currentItem.expiryDate,
        });
        setItems(
            items.map((item) =>
                item.id === currentItem.id ? currentItem : item
            )
        );
        handleDialogClose();
    }

    const handleDialogClose = () => {
        setEditDialogOpen(false);
        setCurrentItem(null);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleDeleteItem = async (itemId) => {
        const itemsDoc = doc(db, 'items', itemId)
        await deleteDoc(itemsDoc);
        setItems(items.filter((item) => item.id !== itemId));
    }

    const handleSearch = () => {
        const result = items.find(item =>
            item.name.toLowerCase() === searchTerm.toLowerCase()
        );
        setSearchResult(result);
        setSearchPerformed(true)
    }

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
              <div style={{display:'flex',width:'100%',marginTop:'23px', marginBottom: '10px'}}>
              <input
                    className='searchInput'
                    type="text"
                    placeholder='Search Item'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                className='btn'
                 onClick={handleSearch}>Search</button>
              </div>
                
                {searchPerformed && searchTerm && (
                    <div style={{ marginTop: '10px', fontSize: '16px' }}>
                        {searchResult ? (
                            <div>
                                <strong>Item Found:</strong> {searchResult.name} - Quantity: {searchResult.quantity}, Expiry Date: {searchResult.expiryDate}
                            </div>
                        ) : (
                            <div style={{color:'crimson'}}>Item not found</div>
                        )}
                    </div>
                )}
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                    <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Item Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Expiry Date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell scope="row" align='center'>
                                        {item.name}
                                    </TableCell>
                                    <TableCell scope="row" align='center'>
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell scope="row" align='center'>
                                        {item.expiryDate}
                                    </TableCell>
                                    <TableCell scope="row" align='center'>
                                        <EditIcon
                                            onClick={() => handleUpdateItem(item.id)}
                                            style={{ cursor: 'pointer', marginRight: 10, color: '#007bff' }}
                                        />
                                        <DeleteIcon
                                            onClick={() => handleDeleteItem(item.id)}
                                            style={{ cursor: 'pointer', marginRight: 10, color: 'crimson' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <UpdateItemDialog
                editDialogOpen={editDialogOpen}
                handleDialogClose={handleDialogClose}
                currentItem={currentItem}
                handleChange={handleChange}
                handleSaveItem={handleSaveItem} />

        </>
    )
}

export default ItemsTable

