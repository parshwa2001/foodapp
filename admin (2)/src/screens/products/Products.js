import React, { useState, useEffect, useRef } from "react";
import { apiBaseUrl } from "../../constants/constants";
import { Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import * as itemService from "../../services/itemService";
import itemLogo from "../../assets/item.png";

const adminToken = localStorage.getItem("admin_token");

const AddItem = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [itemData, setitemData] = useState([]);
  const [error, setError] = useState([]);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const cuisineData = [
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

  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    price: "",
    type: "",
    itemImg: "",
    description: "",
    cuisine: "",
  });
  const column = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Image",
      dataIndex: "itemImg",
      key: "itemImg",
      render: (itemImg) => <img src={`${apiBaseUrl}/uploads/${itemImg}`} alt="Item" style={{ maxWidth: "100px" }} />,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price ",
    },
    {
      title: "Cuisine",
      dataIndex: "cuisine",
      key: "cuisine ",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type ",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action ",
      render: (text, record) => (
        <span>
          <a onClick={() => handleEditItem(record)}>
            <BiEdit size={20} />
          </a>
          <a onClick={() => showDeleteModal(record)}>
            <RiDeleteBinLine size={20} className="ms-1" />
          </a>
        </span>
      ),
    },
  ];

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const getItem = async () => {
    setLoading(true);
    if (adminToken) {
      const response = await itemService.itemList(adminToken);
      if (response?.status == 200) {
        const sortedItems = response.data.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setitemData(sortedItems);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const showDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedItem) {
      const itemId = selectedItem._id;

      const response = await itemService.deleteItem(itemId, adminToken);

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setItemModal(false);
        getItem();
      } else {
        toast.error("Error deleting item");
      }
    }

    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setItem(item);

    if (item.itemImg) {
      const objectUrl = `${apiBaseUrl}/uploads/${item.itemImg}`;
      setPreview(objectUrl);
    } else {
      setPreview("");
    }

    setItemModal(true);
  };

  useEffect(() => {
    getItem();
  }, [adminToken]);
  const inputChange = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };
  const handleAddItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemImg", item.itemImg);
    formData.append("name", item.name);
    formData.append("price", item.price);
    formData.append("type", item.type);
    formData.append("description", item.description);
    formData.append("cuisine", item.cuisine);

    const Validation = () => {
      let err = {};
      let isValid = true;
      // let num1 = "/^d*.?d*$/";
      // let num2 = /^\d+(\.\d+)?$/;
      // let num3 = /^0*(?:\d+(?:,\d{3})*(?:\.\d{2})?|\.\d{2})$/;
      if (!item.itemImg) {
        err["itemImg"] = "Image is required";
        isValid = false;
      }
      if (!item.name.trim()) {
        err["name"] = "Name is required";
        isValid = false;
      }
      if (!item.description.trim()) {
        err["description"] = "Description is required";
        isValid = false;
      }
      if (!item.cuisine.trim()) {
        err["cuisine"] = "Cuisine is required";
        isValid = false;
      }
      if (!item.type.trim()) {
        err["type"] = "Type is required";
        isValid = false;
      }

      if (!item?.price) {
        err["price"] = "Price is required";
        isValid = false;
      } else if (item?.price === 0) {
        err["price"] = "Price shoud be greater than 0";
        isValid = false;
      }
      setError(err);
      return isValid;
    };

    if (Validation()) {
      if (adminToken) {
        setLoading(true);
        let response;
        if (selectedItem) {
          response = await itemService.editItem({
            id: selectedItem._id,
            ...item,
            adminToken,
          });
        } else {
          response = await itemService.addItem(formData, adminToken);
        }
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          setItemModal(false);
          setError("");
          setPreview("");
          setFile(null);
          setItem({
            name: "",
            price: "",
            type: "",
            itemImg: "",
            description: "",
            cuisine: "",
          });
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          getItem();
          setTimeout(() => {
            navigate("/products");
          }, 3000);
        } else {
          console.log("error");
          setLoading(false);
        }
      }
    }
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setItemModal(false);
    setError("");
    setPreview("");
    setFile(null);
    setItem({
      name: "",
      price: "",
      type: "",
      itemImg: "",
      description: "",
      cuisine: "",
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const file1 = e.target.files[0];

    let allowedExtensions = /[\/.](jpg|jpeg|png)$/i;

    if (!allowedExtensions.exec(file1.type)) {
      toast.error("Invalid file type, Please upload only jpg, png file type!");
      return;
    } else {
      setFile(file1);
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      console.log(objectUrl, "objectUrl");
      setItem({ ...item, itemImg: file1 });

      setPreview(objectUrl);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="table_card">
        <div className="row d-flex align-items-center">
          <div className="col-lg-4">
            <div className="card_div">
              <h2 className="medium_font">
                Total Items <h2 className="small_font">{itemData.length}</h2>
              </h2>
              <img src={itemLogo} width="30%" />
            </div>
          </div>
          <div className="col-lg-3 ms-auto">
            <button onClick={() => setItemModal(true)} className="common_btn">
              <BiAddToQueue size={20} color="#fff" /> Add Item
            </button>
          </div>

          <div className="mt-5">
            <Table
              columns={column}
              dataSource={itemData.map((item, index) => ({
                ...item,
                index: index + 1,
              }))}
              pagination={{
                pageSize: 5,
              }}
            />
          </div>
        </div>
      </div>

      <Modal open={itemModal} closable={false} footer={null} onCancel={(e) => handleCloseModal(e)}>
        <form onSubmit={handleAddItem} className="">
          <h2 className="small_font" onClick={handleUpload}>
            Upload Image
          </h2>
          <input type="file" ref={inputRef} readOnly onChange={handleFileChange} />
          {selectedItem ? (
            <img src={`${apiBaseUrl}/uploads/${item.itemImg}`} style={{ width: 200, height: 100 }} />
          ) : (
            file && <img src={preview} style={{ width: 200, height: 100 }} />
          )}
          <article className="text-danger so_small_font mb-4">{error?.itemImg}</article>
          <h2 className="small_font mt-4">Name</h2>
          <input className="input_fields" onChange={inputChange} name="name" value={item.name} />
          <article className="text-danger so_small_font mb-4">{error?.name}</article>
          <h2 className="small_font">Price</h2>
          <input className="input_fields" type="text" onChange={inputChange} name="price" value={item.price} />
          <article className="text-danger so_small_font mb-4">{error?.price}</article>
          <div className="row">
            <div className="col-lg-6">
              <h2 className="small_font">Cuisine</h2>
              <select className="input_fields" onChange={inputChange} name="cuisine" value={item.cuisine}>
                <option disabled value="">
                  select cuisine----
                </option>
                {cuisineData.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
                {/* <option value="thai">Thai</option>
                <option value="indian">Indian</option>
                <option value="lebanese">Lebanese</option> */}
              </select>
              <article className="text-danger so_small_font">{error?.cuisine}</article>
            </div>
            <div className="col-lg-6">
              <h2 className="small_font">Type</h2>
              <select className="input_fields" onChange={inputChange} name="type" value={item.type}>
                <option disabled value="">
                  select starter----
                </option>
                <option value="starter">Starter</option>
                <option value="main">Main</option>
                <option value="drink">Drink</option>
              </select>
              <article className="text-danger so_small_font">{error?.type}</article>
            </div>
          </div>
          <h2 className="small_font mt-4">Description</h2>
          <textarea
            className="input_fields"
            type="number"
            style={{ minHeight: "100px" }}
            onChange={inputChange}
            name="description"
            value={item.description}
          />
          <article className="text-danger so_small_font">{error?.description}</article>
          <div className="btn_div mt-4 d-flex ">
            <button className="common_btn" type="submit">
              Submit
            </button>
            <button onClick={(e) => handleCloseModal(e)} className="common_btn ms-3" style={{ background: "gray" }}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={deleteModalVisible}
        title="Confirm Delete"
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
};

export default AddItem;
