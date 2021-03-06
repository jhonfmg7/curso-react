import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

// Material UI Components
import { Dialog, DialogContent, DialogTitle, MenuItem, Select } from "@material-ui/core"
import { useEffect } from "react";

const ModalAddSale = ({ setReload, openModalSale, setOpenModalSale }) => {

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
    const [ products, setProducts ] = useState([]);
    const [ idToReduce, setIdToReduce ] = useState(0);
    const [ quantityToValidate, setQuantityToValidate ] = useState(0)

    // Function to handle change
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    } 

    // UseEffect for load products
    useEffect(() => {
        const query = async() => {
            const response = await axios.get('http://localhost:4000/products');
            setProducts(response.data);
        }

        query();
    }, []);

    useEffect(() => {
        if(info.product !== '') {
            const response = products.filter( item => item.name === info.product);
            if(response.length > 0) {
                setInfo({
                    ...info,
                    cost: response[0].cost,
                    price: response[0].price,
                    productId: response[0].id
                });
                setIdToReduce(response[0].id);
                setQuantityToValidate(Number(response[0].quantity))
            }
        }
    }, [info.product])

    // Function to Handle Submit
    const onSubmit = async(e) => {
        e.preventDefault();

        const total = info.price * info.quantity;
        
        const obj = {
            ...info,
            total: total,
            gain: total - (info.quantity * info.cost)
        }

        try {
          const response = await axios.post('http://localhost:4000/sales', obj);
          if (Object.keys(response.data).length > 0) {

            const result = await axios.get(`http://localhost:4000/products/${ idToReduce }`)

            const objEdit = {
                name: result.data.name,
                quantity: result.data.quantity - info.quantity,
                price: result.data.price,
                cost: result.data.cost
            }
            
            await axios.put(`http://localhost:4000/products/${ idToReduce }`, objEdit);

              setOpenModalSale(false);
              setReload(true);
              enqueueSnackbar('Se registr?? correctamente la venta', { variant: 'success' })
          }
        } catch (error) {
            enqueueSnackbar('No se logro registrar la venta', { variant: 'error' })
        }
    }

    return (
        <Dialog
            open={ openModalSale }
            onClose={ () => setOpenModalSale(false) }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={ 'lg' }
            fullWidth
        >
            <DialogTitle className="text-center text-success">Agregar Venta</DialogTitle>
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
                                    <option value="">Seleccione una opci??n</option>
                                    { products.map( item => (
                                        <option value={ item.name }>{ item.name }</option>
                                    ) ) }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Cantidad</label>
                                <select name="quantity" value={ info.quantity } onChange={ handleChange } className="form-control">
                                    <option value="">Seleccione la cantidad</option>
                                    { [...Array(quantityToValidate).keys()].map( item => (
                                        <option value={ item + 1 }>{ item + 1 }</option>
                                    ) ) }
                                </select>
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
                            <button className="btn btn-outline-success" type="submit" onClick={ (e) => onSubmit(e) }>Registrar Venta</button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddSale
