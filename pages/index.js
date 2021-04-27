import { useSnackbar } from "notistack";
import styles from "../styles/Home.module.css";

export default function Home() {

  // Snackbar Instance
  const { enqueueSnackbar } = useSnackbar();

  // Function for launch notification
  const handleClick = () => {
    enqueueSnackbar('Esta es una notificación de prueba', { variant: 'success' })
  }

  return (
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
          <tr>
            <th scope="row">1</th>
            <td>27/04/2021</td>
            <td>Celular Huawei Y7</td>
            <td>Venta hecha a mi hermano</td>
            <td className="text-success">500000</td>
            <td>2</td>
            <td className="text-danger">350000</td>
            <td className="text-success">1000000</td>
            <td className="text-warning">300000</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success btn-add" type="button">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}
