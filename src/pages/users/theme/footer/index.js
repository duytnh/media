import React from 'react'

function Footer() {
    return (
        <div className="w-100 h-50 bg-dark py-5 px-5">
            <div className="container border-bottom">
                <ul className="d-flex w-100 justify-content-center flex-wrap flex-sm-row">
                    <li className="pe-auto list-group-item my-2 px-4"><a href=""><i className="fs-5 text-white fa-brands fa-instagram"></i></a></li>
                    <li className="pe-auto list-group-item my-2 px-4"><a href=""><i className="fs-5 text-white fa-brands fa-facebook"></i></a></li>
                    <li className="pe-auto list-group-item my-2 px-4"><a href=""><i className="fs-5 text-white fa-brands fa-linkedin"></i></a></li>
                    <li className="pe-auto list-group-item my-2 px-4"><a href=""><i className="fs-5 text-white fa-brands fa-github"></i></a></li>
                    <li className="pe-auto list-group-item my-2 px-4"><a href=""><i className="fs-5 text-white fa-brands fa-twitter"></i></a></li>
                </ul>
            </div>

            <h4 className="text-center my-4 text-white">
                Geeks Help
            </h4>

            <div className="w-100 d-flex flex-wrap justify-content-between">

                <div className="m-2 flex-item" style={{ width: '20rem' }}>
                    <h4 className="heading" style={{ color: '#e65b00' }}>Geeks Help</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">Geeks Help is an independent website, especially for Web Developers, Programming Beginners, BCA and Computer Science Students. We provide programming, web development content with free pdf and web development projects.</a></li>
                        </ul>
                    </div>
                </div>

                <div className="m-2 flex-item">
                    <h4 className="heading" style={{ color: '#e65b00' }}>Products</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">HTML</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">CSS</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">JavaScript</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">Bootstrap</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">ReactJS</a></li>
                        </ul>
                    </div>
                </div>

                <div className="m-2 flex-item">
                    <h4 className="heading" style={{ color: '#e65b00' }}>Useful Links</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">Help</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">Pricing</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">Settings</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">Order Details</a></li>
                        </ul>
                    </div>
                </div>

                <div className="m-2 flex-item">
                    <h4 className="heading" style={{ color: '#e65b00' }}>Contact Us</h4>
                    <div className="content">
                        <ul className="px-0">
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">XYZ, ABC, India</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">contact@geekshelp@gmail.com</a></li>
                            <li className="my-2 list-group-item"><a className="text-white text-decoration-none my-2" href="">+91 1234567890</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer
