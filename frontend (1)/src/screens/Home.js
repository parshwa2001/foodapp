import React from "react";
import FoodList from "../components/FoodList";

const Home = () => {
  return (
    <>
      <div className="container-fluid p-5">
        <div className="main_background mb-4">
          <div className="text-content text-center">
            <h2 className="thai_bold_font">THAI BUDDA</h2>
            <h2 className="medium_font text-white my-4">
              Experience the Exquisite FLavors of Thailand, Right at Your Table!
            </h2>
            <a href="#menu" style={{ textDecoration: "none" }}>
              <div className="border_btn w-50 mx-auto text-white py-3" style={{ borderColor: "#fff" }}>
                View Today's Menu
              </div>
            </a>
          </div>
        </div>
        <FoodList />
      </div>
    </>
  );
};

export default Home;
