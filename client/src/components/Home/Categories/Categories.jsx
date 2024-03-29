import { Link } from 'react-router-dom';


import smartWatch from "../../../assets/images/smartwatch.jpg";
import airpod from "../../../assets/images/airpod.jpg";
import powerbank from "../../../assets/images/powerbank.jpg";
import neckBand from "../../../assets/images/neckband.jpg";
import earPhone from "../../../assets/images/earphone.jpg";
import adapter from "../../../assets/images/adapter.jpg";
const Categories = () => {
    return (
        <>
            <div className="categories-shop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="shop-cat-box" onClick={() => window.location.href = "/shop/Watch/Smart%20Watch"} style={{ cursor: 'pointer' }}>
                                <img className="img-fluid" src={smartWatch} alt="" />
                                <Link className="btn hvr-hover" to="/shop/Watch/Smart%20Watch">
                                    Smart Watch
                                </Link>
                            </div>
                            <div className="shop-cat-box" onClick={() => window.location.href = "/shop/Earphone"} style={{ cursor: 'pointer' }}>
                                <img className="img-fluid" src={earPhone} alt="" />
                                <Link className="btn hvr-hover" to="/shop/Earphone">
                                    Earphone
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="shop-cat-box" onClick={() => window.location.href = "/shop/Earphone/Airpod"} style={{ cursor: 'pointer' }}>
                                <img className="img-fluid" src={airpod} alt="" />
                                <Link className="btn hvr-hover" to="/shop/Earphone/Airpod">Airpods</Link>
                            </div>
                            <div className="shop-cat-box">
                                <img className="img-fluid" src={powerbank} alt="" />
                                <a className="btn hvr-hover" href="#">Power Bank</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="shop-cat-box" onClick={() => window.location.href = "/shop/Earphone/NeckBand"} style={{ cursor: 'pointer' }}>
                                <img className="img-fluid" src={neckBand} alt="" />
                                <Link className="btn hvr-hover" to="shop/Earphone/NeckBand">Neck Band</Link>
                            </div>
                            <div className="shop-cat-box">
                                <img className="img-fluid" src={adapter} alt="" />
                                <a className="btn hvr-hover" href="#">Adapter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;