import React from 'react';
import Link from 'next/link';

const NavBar = ({ children }) => {
    return (
        <div style={{ width: '100%' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="row container py-4 mx-auto">
                    <div className="col-md-4 col-sm-12 text-center">
                        <Link href="/">
                            <a className="navbar-brand">Curso React contabilidad</a>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-12  text-center">
                        <Link href="/example">
                            <a className="nav-link">Inventario</a>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-12 text-center">
                        <a className="nav-link" href="#">Historico</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
