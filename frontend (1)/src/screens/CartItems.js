import React, { useState, useEffect } from 'react';
import { Button, List, Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBin6Line, RiEBike2Fill } from 'react-icons/ri';
import { HiShoppingBag } from 'react-icons/hi';
import { IoCalendar } from 'react-icons/io5';
import food from '../assets/2.jpeg';
import Pickup from '../components/Pickup';
import Delivery from '../components/Delivery';
import BookTable from '../components/BookTable';
import { apiBaseUrl } from '../constants/constants';
import { REMOVE_ITEM } from "../redux/slice/cartSlice";

const CartItems = () => {
  const dispatch = useDispatch()
  const cartData1 = useSelector((state) => state?.cart?.cartData);
  const token = localStorage.getItem('user_token');
  const navigate = useNavigate();
  const [serviceModal, setServiceModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeBtn, setActiveBtn] = useState('pickup');
  const [quantities, setQuantities] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);


  useEffect(() => {
    const initialQuantities = cartData1.map(item => 1);
    setQuantities(initialQuantities);
  }, [cartData1]);

  const increaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  }

  const decreaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  }

  const handleActive = (val) => {
    setActiveBtn(val)
  }

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteModal(true);
  }

  const handleConfirmDelete = () => {
    if (deleteItemId !== null) {
      dispatch(REMOVE_ITEM(deleteItemId));
      setDeleteItemId(null);
    }
    setDeleteModal(false);
  }

  const shipingCost = 40;
  const totalPrice = cartData1.reduce((total, item) => total + (item.price), 0);

  return (
    <>
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='col-md-12 col-lg-7'>
            {cartData1.map((item, index) => (
              <div className="shop_cart" key={index}>
                <div className="d-flex">
                  <img src={`${apiBaseUrl}/uploads/${item.itemImg}`} alt="pic" className='cart_img_height img-thumbnail' />
                  <div className="mx-2">
                    <h2 className='small_font'>{item.name}</h2>
                    <div className="quantity-buttons">
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-column">
                  <Button className='del_btn' onClick={() => handleDelete(item._id)}>
                    <RiDeleteBin6Line />
                  </Button>
                  <h2 className='small_font pt-4'>{`$${item.price}`}</h2>
                </div>
              </div>
            ))}
          </div>

          {cartData1.length > 0 ? (
            <div className='col-md-12 col-lg-5'>
              <div className='cart_card p-3'>
                <div className='text-center sub_total_div'>
                  <List>
                    <List.Item style={{ borderBottom: "none" }}>
                      <Typography className='small_font' style={{ fontWeight: "400" }}>Sub Total</Typography>
                      <Typography className='small_font'>$ {totalPrice}</Typography>
                    </List.Item>
                    {true == true ? (
                      <List.Item style={{ borderBottom: "none" }}>
                        <Typography className='small_font' style={{ fontWeight: "400" }}>Shipping Cost</Typography>
                        <Typography className='small_font'>${shipingCost}</Typography>
                      </List.Item>
                    ) : null}
                    <List.Item>
                      <Typography className='big_font'>Total Amount</Typography>
                      <Typography className='big_font'>${totalPrice + shipingCost}</Typography>
                    </List.Item>
                  </List>
                </div>
              </div>
            </div>
          ) : (
            <h2 className='text-center'>Nothing in the cart</h2>
          )}
        </div>
        {cartData1.length > 0 ? (
          <div className='mb-5 mt-4 text-center'>
            <button onClick={() => token ? setServiceModal(true) : navigate('/login')} className='border_btn2'>Proceed to checkout</button>
          </div>
        ) : ""}
      </div>

      {/* Modal */}
      <Modal open={serviceModal} closable={false} footer={null}>
        <div className='common_flexing'>
          <div onClick={() => handleActive('pickup')} className={activeBtn == 'pickup' ? 'service_btn' : 'service_btn2'}>
            <HiShoppingBag size={window.innerWidth < 460 ? 30 : 50} />
            <h2 className='small_font'>Pickup</h2>
          </div>
          <div onClick={() => handleActive('delivery')} className={activeBtn == 'delivery' ? 'service_btn' : 'service_btn2'}>
            <RiEBike2Fill size={window.innerWidth < 460 ? 30 : 50} />
            <h2 className='small_font'>Delivery</h2>
          </div>
          <div onClick={() => handleActive('book_table')} className={activeBtn == 'book_table' ? 'service_btn' : 'service_btn2'}>
            <IoCalendar size={window.innerWidth < 460 ? 30 : 50} />
            <h2 className='small_font'>Book Table</h2>
          </div>
        </div>
        {activeBtn == 'pickup' ? <Pickup serviceModal={setServiceModal} /> : activeBtn == 'delivery' ? <Delivery serviceModal={setServiceModal} /> : <BookTable serviceModal={setServiceModal} />}
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModal} closable={false} onCancel={() => setDeleteModal(false)} onOk={handleConfirmDelete}>
        <h2 className='small_font'>Are you sure you want to delete this item</h2>
      </Modal>
    </>
  )
}

export default CartItems;
