
import bannerImage2 from "../../../assets/images/cover.png";
import { Link } from 'react-router-dom';
import "./slider.css"


const Slider = () => {
    return (
        <>
            <div className="image-container position-relative">
                <img src={bannerImage2} alt=" " className="banner-image" />
                <div className="overlay-text">
                    <h1 className="m-b-20"><strong>Welcome To <br /> Gizmo Pickers</strong></h1>
                    <p className="m-b-40">See how your users experience your website in realtime or view <br /> trends to see any changes in performance over time.</p>
                    <p>
                        <Link to="/shop" className="btn hvr-hover">Shop New</Link>
                    </p>
                </div>
            </div>



        </>
    )
}
export default Slider;