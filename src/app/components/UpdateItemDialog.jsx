import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

function UpdateItemDialog({editDialogOpen,handleDialogClose, currentItem,handleChange, handleSaveItem}) {
  return (
    <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Item</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name="name"
            label="Item name"
            type="text"
            fullWidth
            value={currentItem?.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Item quantity"
            type="number"
            fullWidth
            value={currentItem?.quantity || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="expiryDate"
            label="Item expiry date"
            type="date"
            fullWidth
            value={currentItem?.expiryDate || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveItem}>Save</Button>
        </DialogActions>
      </Dialog>
  )
}
export default UpdateItemDialog