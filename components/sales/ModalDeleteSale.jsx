import axios from "axios";
import { useSnackbar } from "notistack";

// Material UI Components
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";

const ModalDeleteSale = ({ idToDelete, setReload, openModalDeleteSale, setOpenModalDeleteSale }) => {

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    // Function to delete Sale
    const deleteSale = async() => {
        try {

            // Query
            await axios.delete(`http://localhost:4000/sales/${ idToDelete }`);

            // Message
            enqueueSnackbar('Se elimininó la venta', { variant: 'success' });
            setReload(true);
            setOpenModalDeleteSale(false);

        } catch (error) {
            enqueueSnackbar('No se logro eliminar la venta', { variant: 'error' });
        }
    }

    return (
        <Dialog
            open={ openModalDeleteSale }
            onClose={ () => setOpenModalDeleteSale(false) }
            maxWidth={ 'sm' }
            fullWidth
        >
            <DialogTitle>Eliminar { idToDelete }</DialogTitle>
            <DialogContent>
                <Typography variant="body1">El elemento Eliminado no podrá ser recuperado</Typography>
            </DialogContent>
            <DialogActions>
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-outline-success" onClick={ () => setOpenModalDeleteSale(false) }>Cancelar</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-outline-danger" onClick={ () => deleteSale() }>Eliminar</button>
                    </div>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default ModalDeleteSale
