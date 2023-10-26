import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import pic from "../assets/images/colourful.webp";
import pic1 from "../assets/images/house.jpg";
import pic2 from "../assets/images/wedding.jpg";
const LeftOver = () => {
  const navigate = useNavigate();
  return (
    <div>
      <br />
      <div style={{textAlign:'center',fontSize:'large',marginBottom:'1.5rem',fontWeight:'bold'}}>LeftOver</div>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginLeft: "10rem",
        }}
      >
        <div className="card" style={{ width: "60rem", height: "15rem" }}>
          <div className="card-body" style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{ position: 'relative'}}>
              <h4>Here we provide leftover food from our restuarant at discounted price to the needies. We believe in zero wastage and consuming as much as food we can.</h4>
              <button onClick={()=>navigate('/leftovermodal')} style={{position: 'absolute', top: '80%', padding:'.5rem',color:'black', borderRadius:'.5rem', backgroundColor: '#ffc107'}}>My Kitchen</button>
            </div>
            <div>
              <img src={pic} style={{width:'20rem', height: '12rem', borderRadius:'1rem'}} alt="" />
            </div>
          </div>
        </div>
        <br />
        <div className="card" style={{ width: "60rem", height: "15rem" }}>
          <div className="card-body" style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{ position: 'relative'}}>
              <h4>During the wedding season, we see a lot of wastage of food. We take a step forward to send these food to the hungry people.</h4>
              <button onClick={()=>navigate('/leftovermodal')} style={{position: 'absolute', top: '80%', padding:'.5rem',color:'black', borderRadius:'.5rem', backgroundColor: '#ffc107'}}>Wedding</button>
            </div>
            <div>
              <img src={pic2} style={{width:'20rem', height: '12rem', borderRadius:'1rem'}} alt="" />
            </div>
          </div>
        </div>
        <br />
        <div className="card" style={{ width: "60rem", height: "15rem" }}>
          <div className="card-body" style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{ position: 'relative'}}>
              <h4>In the Birthday parties or other ceremoney, we see lot of food that is left. So we think of sending these food whoever in need locally at nominal cost.</h4>
              <button onClick={()=>navigate('/leftovermodal')} style={{position: 'absolute', top: '80%', padding:'.5rem',color:'black', borderRadius:'.5rem', backgroundColor: '#ffc107'}}>Party</button>
            </div>
            <div>
              <img src={pic1} style={{width:'20rem', height: '12rem', borderRadius:'1rem'}} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftOver;
