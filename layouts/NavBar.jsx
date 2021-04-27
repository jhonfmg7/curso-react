import React from 'react';
import Link from 'next/link';

const NavBar = ({ children }) => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="row mx-auto">
                    <div className="col-md-4 col-sm-12 text-center">
                        <Link href="/">
                            <a>Curso React contabilidad</a>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-12  text-center">
                        <Link href="/example">
                            <a>Example</a>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-12 text-center">
                        <a href="#">tercero</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
