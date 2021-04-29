import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import axios from "axios";

const ModalEditSale = ({ idToEdit, setReload, openModalEditSale, setOpenModalEditSale }) => {
    
    // Date Instance
    const date = new Date();
    const day =
        date.getDate() > 9
            ? `${ date.getDate().toString() }`
            : `0${ date.getDate().toString() }`;
    const month =
        date.getMonth() > 8
            ? `${ (date.getMonth() + 1).toString() }`
            : `0${ (date.getMonth() + 1).toString() }`;
    const year = date.getFullYear().toString();

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    // Local State
    const [ info, setInfo ] = useState({
        date: `${ year }-${ month }-${ day }`,
        quantity: 0,
        product: '',
        productId: 0,
        ref: '',
        price: 0,
        cost: 0
    });

    // Function to handle change
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    } 

    useEffect(() => {
        const query = async() => {
            const response = await axios.get(`http://localhost:4000/sales/${ idToEdit }`);
            setInfo(response.data);
        }

        if(idToEdit !== 0) {
            query();
        }
    }, [ idToEdit ]);

    // Function to Submit Info
    const onSubmit = async(e) => {
        e.preventDefault();

        const total = info.price * info.quantity;
        
        const obj = {
            ...info,
            total: total,
            gain: total - (info.quantity * info.cost)
        }

        try {
            const response = await axios.put(`http://localhost:4000/sales/${ idToEdit }`, obj);
            if(Object.keys(response.data).length > 0) {
                setReload(true);
                setOpenModalEditSale(false);
                enqueueSnackbar('Se logró editar la Venta', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar('No se logró editar la Venta', { variant: 'danger' });
        }
    }
    
    return (
        <Dialog
            open={ openModalEditSale }
            onClose={ () => setOpenModalEditSale(false) }
            maxWidth={ 'md' }
            fullWidth
        >
            <DialogTitle>Editar Venta { idToEdit }</DialogTitle>
            <DialogContent>
                <form>
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Fecha</label>
                                <input type="date" name="date" value={ info.date } onChange={ handleChange } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Producto</label>
                                <select className="form-control" name="product" value={ info.product } onChange={ handleChange }>
                                    <option value="">Seleccione una opción</option>
                                    <option value="S21">Samsung Galaxy S21 Ultra</option>
                                    <option value="Celular Huawei Y7">Huawei Y7</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Cantidad</label>
                                <input type="number" name="quantity" value={ info.quantity } onChange={ handleChange } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 my-3">
                            <div className="form-group">
                                <label>Referencia</label>
                                <input type="text" name="ref" value={ info.ref } onChange={ handleChange } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 my-3">
                            <div className="form-group">
                                <label>Precio</label>
                                <input type="number" name="price" value={ info.price } onChange={ handleChange } className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 my-3">
                            <div className="form-group">
                                <label>Costo</label>
                                <input type="number" name="cost" value={ info.cost } onChange={ handleChange } className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-10"></div>
                        <div className="col-md-2 col-sm-12">
                            <button className="btn btn-outline-success" type="submit" onClick={ (e) => onSubmit(e) }>Editar Venta</button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalEditSale
