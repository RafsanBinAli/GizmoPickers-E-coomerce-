import { Link, useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
       
        localStorage.clear();
        // Navigate to '/'
        window.location.href = '/';
    };

    return (
        <>
            <div className="my-account-box-main">
                <div className="container">
                    <div className="my-account-page">
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <div className="account-box">
                                    <Link to="/my-orders" className="service-box">
                                        <div className="service-icon">
                                            <i className="fa fa-gift"></i>
                                        </div>
                                        <div className="service-desc">
                                            <h4>Your Orders</h4>
                                            <p>Track, return, or buy things again</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="account-box">
                                    <Link to="/my-profile" className="service-box">
                                        <div className="service-icon">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <div className="service-desc">
                                            <h4>Login &amp; security</h4>
                                            <p>Edit login, name, and mobile number</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="account-box">
                                <Link className="service-box" onClick={handleLogout}>
                                        <div className="service-icon">
                                            <i className="fa fa-location-arrow"></i>
                                        </div>
                                        <div className="service-desc">
                                            <h4>Log Out</h4>
                                            <p>See you next time!</p>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="account-box">
                                    <div className="service-box">
                                        <div className="service-icon">
                                            <a href="#"> <i className="fa fa-credit-card"></i> </a>
                                        </div>
                                        <div className="service-desc">
                                            <h4>Payment options</h4>
                                            <p>Edit or add payment methods</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="account-box">
                                    <div className="service-box">
                                        <div className="service-icon">
                                            <a href="#"> <i className="fab fa-paypal"></i> </a>
                                        </div>
                                        <div className="service-desc">
                                            <h4>PayPal</h4>
                                            <p>View benefits and payment settings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="account-box">
                                    <div className="service-box">
                                        <div className="service-icon">
                                            <a href="#"> <i className="fab fa-amazon"></i> </a>
                                        </div>
                                        <div className="service-desc">
                                            <h4>Amazon Pay balance</h4>
                                            <p>Add money to your balance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
export default MyAccount