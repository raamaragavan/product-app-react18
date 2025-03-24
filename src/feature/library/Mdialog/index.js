import './Dialog.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../Button';

const MDialog = ({ children, openDialog, onClose, dialogCancel,dialogSuccess, ...props }) => {
    const { title, textContent,actionText,cancelText,dialogAction,dialogSlotProps } = props;
    const cancelProps = { className: 'cancel-btn',id:'mdialaog-cancel-btn' };
    const actionProps = { className: 'action-btn',id:'mdialaog-subscribe-btn' };

    return (
        <Dialog className="width-100"
        open={openDialog}
        onClose={onClose}
        slotProps={dialogSlotProps}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {textContent}
          </DialogContentText>
          {children}
        </DialogContent>
        {dialogAction ? <DialogActions>
          <Button {...cancelProps} onClick={dialogCancel}>{cancelText}</Button>
          <Button {...actionProps} onClick={dialogSuccess}>{actionText}</Button>
        </DialogActions> : null}
        
      </Dialog>
    )
}

export default MDialog;