import axios from 'axios';
import { useEffect, useState } from 'react';

const inventory = () => {

    // Local State
    const [ products, setProducts ] = useState([]);

    // UseEffect for load products
    useEffect(() => {
        const query = async() => {
            const response = await axios.get('http://localhost:4000/products');
            setProducts(response.data);
        }

        query();
    }, [])

    return (
        <div className="mt-5 container">
            <h3 className="text-success mb-3">Inventario</h3>
            <table className="table table-striped table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre de Producto</th>
                        <th scope="col">Cantidad Disponible</th>
                        <th scope="col">Precio de Venta</th>
                        <th scope="col">Costo de Producto</th>
                        <th scope="col">Ganancia de Producto</th>
                        <th scope="col" className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length > 0 ? (
                        products.map( item => (
                            <tr key={ item.id }>
                                <th>{ item.id }</th>
                                <td>{ item.name }</td>
                                <td>{ item.quantity }</td>
                                <td className="text-success">{ item.price }</td>
                                <td className="text-danger">{ item.cost }</td>
                                <td className="text-warning">{ item.price - item.cost }</td>
                                <td></td>
                            </tr>
                        ))
                    ) : (
                        <p>...loading</p>
                    ) }
                </tbody>
            </table>
            <button className="btn btn-success btn-add" type="button" onClick={ () => setOpenModalSale(true) }>
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
}

export default inventory;
