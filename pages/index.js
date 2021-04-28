import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import ModalAddSale from "../components/sales/ModalAddSale";
import ModalDeleteSale from "../components/sales/ModalDeleteSale";

export default function Home() {

  // Snackbar Instance
  const { enqueueSnackbar } = useSnackbar();

  // Local State
  const [ data, setData ] = useState([]);
  const [ idToDelete, setIdToDelete ] = useState(0);
  const [ reload, setReload ] = useState(true);
  const [ openModalSale, setOpenModalSale ] = useState(false);
  const [ openModalDeleteSale, setOpenModalDeleteSale ] = useState(false);

  // Function for launch notification
  const handleClick = () => {
    enqueueSnackbar('Esta es una notificación de prueba', { variant: 'success' })
  }

  // Function to handle Delete Sale
  const handleDelete = (id) => {
    setOpenModalDeleteSale(true);
    setIdToDelete(id);
  }

  // UseEffect for load Data
  useEffect(() => {
    const query = async() => {
      const response = await axios.get('http://localhost:4000/sales');
      setData(response.data.reverse());
    }
    if(reload) {
      query();
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <ModalAddSale setReload={ setReload } openModalSale={ openModalSale } setOpenModalSale={ setOpenModalSale }/>
      <ModalDeleteSale idToDelete={ idToDelete } setReload={ setReload } openModalDeleteSale={ openModalDeleteSale } setOpenModalDeleteSale={ setOpenModalDeleteSale } />

      <div className="mt-5 container">
        <div className="row">
          <div className="col-6">
            <h3 className="text-success">Registro de Ventas</h3>
          </div>
          <div className="col-6">
            <form className="d-flex mb-3">
              <input type="text" className="form-control"/>
              <button className="btn btn-outline-success"><i className="fas fa-search"></i></button>
            </form>
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Producto</th>
              <th scope="col">Ref de Venta</th>
              <th scope="col">Precio de Venta</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Costo</th>
              <th scope="col">Total</th>
              <th scope="col">Ganancia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            { data.length > 0 ? (
              data.map( (item, i) => (
                <tr key={ item.id }>
                  <th scope="row">{ item.id }</th>
                  <td>{ item.date }</td>
                  <td>{ item.product }</td>
                  <td>{ item.ref }</td>
                  <td className="text-success">{ item.price }</td>
                  <td>{ item.quantity }</td>
                  <td className="text-danger">{ item.cost }</td>
                  <td className="text-success">{ item.total }</td>
                  <td className="text-warning">{ item.gain }</td>
                  <td>
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-4 icon-button bg-success">
                        <i className="fas fa-edit"></i>
                      </div>
                      <div className="col-4 icon-button bg-danger" onClick={ () => handleDelete(item.id) }>
                        <i className="fas fa-trash"></i>
                      </div>
                      <div className="col-2"></div>
                    </div>
                  </td>
                </tr>
              ) )
            ) : (
              <p>...loading</p>
            ) }
            
          </tbody>
        </table>
        <button className="btn btn-success btn-add" type="button" onClick={ () => setOpenModalSale(true) }>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </>
  );
}
