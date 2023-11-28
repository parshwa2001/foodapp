import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiBaseUrl } from "../constants/constants";
import { SET_CART } from "../redux/slice/cartSlice";
import * as productService from "../services/productService";

const FoodList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const SidebarData = [
    { label: "THAI BUDDA ENTREE", value: "ENTREE" },
    { label: "THAI BUDDA SOUP", value: "SOUP" },
    { label: "THAI BUDDA NOODLE SOUP", value: "NOODLESOUP" },
    { label: "THAI BUDDA CURRY", value: "BUDDACURRY" },
    { label: "THAI BUDDA SIDE DISHES", value: "SIDEDISHES" },
    { label: "THAI BUDDA STIR ON WOK", value: "STIRONWOK" },
    { label: "THAI BUDDA NOODLE STIR ON WOK", value: "NOODLESTIRONWOK" },
    { label: "THAI BUDDA NOODLE FRIED RICE", value: "NOODLEFRIEDRICE" },
    { label: "THAI BUDDA NOODLE CHEF SPECIALS", value: "NOODLECHEFSPECIALS" },
    { label: "INDIAN YUMMY MEAT CURRIES", value: "INDIANYUMMYMEATCURRIES" },
  ];

  const key = "updatable";

  const getItem = async () => {
    setLoading(true);
    const response = await productService.itemList();
    if (response?.status === 200) {
      const sortedItems = response.data.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProductData(sortedItems);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  const handleAddCart = (item) => {
    setLoading(true);
    dispatch(SET_CART(item));
    message.open({ key, type: "loading", content: "Loading..." });
    setTimeout(() => {
      message.open({ key, type: "success", content: "Add to cart Successfully!." });
    }, 1000);
  };
  return (
    <>
      {/* <div className="row gy-4">
        <div className="text-center mb-4 py-2" style={{ borderBottom: "2px solid #222", borderTop: "2px solid #222" }}>
          <h2 className="title_font">Today's Menu</h2>
        </div>
        {productData?.map((item) => (
          <div className="col-lg-3" key={item?.id} id="menu">
            <div className="food_card">
              <div
                className="mb-2"
                style={{
                  backgroundImage: `url(${apiBaseUrl}/uploads/${item?.itemImg})`,
                  height: "200px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "10px 10px 0 0",
                }}
              />
              <div className="food_details px-2">
                <div className="common_flexing">
                  <h2 className="medium_font">{item?.name}</h2>
                  <h2 style={{ background: "#222", padding: "0.3rem", color: "#fff" }} className="small_font">
                    {item.price} $
                  </h2>
                </div>
                <h2 className="small_font text-secondary">{item?.description}</h2>
                <Button type="ghost" onClick={() => handleAddCart(item)} className="cart_btn">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div class="row">
        <div class="col-3">
          <div id="manu" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-start">
            {SidebarData.map((item) => (
              <a class="p-1 rounded border px-3 px-2 text-decoration-none text-black" href={`#${item.value}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div class="col-9">
          <div
            data-bs-spy="scroll"
            data-bs-target="#manu"
            data-bs-offset="0"
            data-bs-smooth-scroll="true"
            class="scrollspy-example"
            tabindex="0"
          >
            {SidebarData.map((id) => (
              <div id={id.value}>
                <div className="row gy-4">
                  <div
                    className="text-center mb-4 py-2"
                    style={{ borderBottom: "2px solid #222", borderTop: "2px solid #222" }}
                  >
                    <h2 className="title_font">{id.label}</h2>
                  </div>
                  {productData
                    ?.filter((item) => item.cuisine === id.value)
                    .map((item) => (
                      <div className="col-lg-3" key={item?.id} id="menu">
                        <div className="food_card">
                          <div
                            className="mb-2"
                            style={{
                              backgroundImage: `url(${apiBaseUrl}/uploads/${item?.itemImg})`,
                              height: "200px",
                              width: "100%",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              borderRadius: "10px 10px 0 0",
                            }}
                          />
                          <div className="food_details px-2">
                            <div className="common_flexing">
                              <h2 className="medium_font">{item?.name}</h2>
                              <h2
                                style={{ background: "#222", padding: "0.3rem", color: "#fff" }}
                                className="small_font"
                              >
                                {item.price} $
                              </h2>
                            </div>
                            <h2 className="small_font text-secondary">{item?.description}</h2>
                            <Button type="ghost" onClick={() => handleAddCart(item)} className="cart_btn">
                              Add to cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                  {SidebarData.map((item) => (
                    <li className="w-100">
                      <a href={`#${item.value}`} className="nav-link px-0">
                        <span className="d-none d-sm-inline">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </ul>
              <hr />
            </div>
          </div>
          <div class="col-8">
            <div
              data-bs-spy="scroll"
              data-bs-target="#menu"
              data-bs-offset="0"
              data-bs-smooth-scroll="true"
              class="scrollspy-example"
              tabindex="0"
            >
              {SidebarData.map((id) => (
                <div id={id.value}>
                  <div className="row gy-4">
                    <div
                      className="text-center mb-4 py-2"
                      style={{ borderBottom: "2px solid #222", borderTop: "2px solid #222" }}
                    >
                      <h2 className="title_font">{id.label}</h2>
                    </div>
                    {productData
                      ?.filter((item) => item.cuisine === id.value)
                      .map((item) => (
                        <div className="col-lg-3" key={item?.id} id="menu">
                          <div className="food_card">
                            <div
                              className="mb-2"
                              style={{
                                backgroundImage: `url(${apiBaseUrl}/uploads/${item?.itemImg})`,
                                height: "200px",
                                width: "100%",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: "10px 10px 0 0",
                              }}
                            />
                            <div className="food_details px-2">
                              <div className="common_flexing">
                                <h2 className="medium_font">{item?.name}</h2>
                                <h2
                                  style={{ background: "#222", padding: "0.3rem", color: "#fff" }}
                                  className="small_font"
                                >
                                  {item.price} $
                                </h2>
                              </div>
                              <h2 className="small_font text-secondary">{item?.description}</h2>
                              <Button type="ghost" onClick={() => handleAddCart(item)} className="cart_btn">
                                Add to cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default FoodList;
