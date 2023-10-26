import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import pic from "../assets/images/banner4.jpg";
import vid from "../assets/Designer.mp4";
import pic2 from "../assets/images/spices.jpg";
import pic3 from "../assets/images/burgerill.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNewArrivals } from "./../redux/actions/filterActions";
import { showLoading } from "./../helpers/loading";
import CardOne from "./CardOne";
const Home = () => {
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((state) => state.filters);
  const { loading } = useSelector((state) => state.loading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);
  return (
    <section className="home-page">
      <Carousel className="banner-image">
        <Carousel.Item className="item">
          <img className="d-block w-100" src={pic} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item className="item">
          <img className="d-block w-100" src={pic2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item className="item">
          <img className="d-block w-100" src={pic3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <br></br>
      <video width="320" height="240" autoPlay loop playsinline muted>
        <source src={vid} type="video/mp4" />
      </video>
      <a style={{ textAlign: 'center', display: 'flex', width:'80vw', margin:'auto', justifyContent: 'center', backgroundColor:'orange'}}
        href="./LeftOver.jsx"
        className="btn btn-primary" 
      >
       <b style={{fontWeight: 'bold', fontSize: '30px', fontFamily:'revert-layer'}}> Left Over Food</b>
      </a>
      <div>
        {loading ? (
          <div className="text-center">{showLoading()}</div>
        ) : (
          <>
            <div className="container">
              <div className="row my-5">
                <div className="col d-flex justify-content-center flex-wrap">
                  {newArrivals &&
                    newArrivals.map((newArrival) => (
                      // <Card key={newArrival._id} product={newArrival} homePage={true} />
                      <CardOne
                        key={newArrival._id}
                        product={newArrival}
                        homePage={true}
                      />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
