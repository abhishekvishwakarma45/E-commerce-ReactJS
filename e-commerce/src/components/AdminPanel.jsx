import React, { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { IoIosArrowRoundForward } from "react-icons/io";
const AdminPanel = () => {
  const { state, updateSelectValue, setAdminData } = useAdminContext();
  const { selectedValue, adminData } = state;

  const [editedProducts, setEditedProducts] = useState({});
  const [imageFiles, setImageFiles] = useState({});
  const [editMode, setEditMode] = useState({});

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    company: "",
    colors: [],
    rating: 0,
    featured: false,
    images: [],
  });

  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/ecommerce/user/get");
        const data = await res.json();
        setAllUsers(data.body);
        console.log(data.body);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const [orderdata, setOrderData] = useState();
  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await fetch("/ecommerce/cart/get");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrderData(data.body);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    getOrderData();
  }, []);

  useEffect(() => {
    updateSelectValue("dashboard");
  }, []);

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    updateSelectValue("dashboard");
  }, []);

  const handleEdit = (id, field, value) => {
    setEditedProducts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleFileChange = (event, id) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setImageFiles((prev) => ({ ...prev, [id]: files }));
    }
  };

  const handleSave = async (id) => {
    const oldData = adminData.find((product) => product.id === id) || {};
    const editedData = editedProducts[id] || {};
    const finalData = { ...oldData, ...editedData };

    if (!finalData.id) {
      console.error("Error: Product ID is missing!");
      return;
    }

    const formData = new FormData();
    Object.entries(finalData).forEach(([key, value]) => {
      if (key !== "image" && key !== "existingImage") {
        formData.append(key, value);
      }
    });

    if (finalData.color) {
      finalData.color.forEach((color) => formData.append("colors", color));
    }

    if (imageFiles[id] && imageFiles[id].length > 0) {
      imageFiles[id].forEach((file) => {
        formData.append("images", file);
      });
    } else if (oldData.image && oldData.image.length > 0) {
      oldData.image.forEach((image) => {
        formData.append("existingImage", image);
      });
    }

    try {
      const response = await fetch(
        `ecommerce/product/${finalData.id ? "update" : "add"}/${id}`,
        {
          method: finalData.id ? "POST" : "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      console.log("Product updated successfully!");
      setEditMode((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEditClick = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`ecommerce/product/remove/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const updatedAdminData = adminData.filter((product) => product.id !== id);
      setAdminData(updatedAdminData);

      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleSaveNewProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.id) {
      console.error("Error: Product ID is required!");
      return;
    }

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (key !== "images" && value) {
        formData.append(key, value);
      }
    });

    if (newProduct.images.length > 0) {
      newProduct.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await fetch("ecommerce/product/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      console.log("New product added successfully!");
      setAdminData((prevData) => [...prevData, newProduct]);

      setNewProduct({
        id: "",
        name: "",
        price: 0,
        stock: 0,
        category: "",
        description: "",
        company: "",
        colors: [],
        rating: 0,
        featured: false,
        images: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleNewProductFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewProduct((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };

  const handleUserDelete = async (id) => {
    let response = await fetch(`ecommerce/user/delete/${id}`, {
      method: "DELETE",
    });
    if (!response) {
      throw new Error("unable to delete user");
    }
  };

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <button onClick={() => updateSelectValue("dashboard")}>
            Dashboard
          </button>
          <button onClick={() => updateSelectValue("addnewproduct")}>
            Add new product
          </button>
          <button onClick={() => updateSelectValue("manageproducts")}>
            Manage Products
          </button>
          <button onClick={() => updateSelectValue("orders")}>Orders</button>
          <button
            onClick={() => {
              updateSelectValue("users");
            }}
          >
            Users
          </button>
        </ul>
      </aside>

      <main className="content">
        <header>
          <h1>Welcome,Admin</h1>
        </header>

        {selectedValue === "dashboard" && (
          <div className="dashboard-container">
            <div className="dashboard-card">
              <span role="img" aria-label="users">
                👥
              </span>
              <p>Total Users</p>
              <h2>{allUsers?.length || 0}</h2>
            </div>
            <div className="dashboard-card">
              <span role="img" aria-label="orders">
                📦
              </span>
              <p>Total Orders</p>
              <h2>{orderdata?.length || 0}</h2>
            </div>
          </div>
        )}

        <div className="user-table-container">
          {selectedValue === "users" && (
            <>
              <h1
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                Admin <IoIosArrowRoundForward /> Manage users
              </h1>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthdate</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.map((curr, idx) => (
                    <tr key={idx}>
                      <td>{curr.id}</td>
                      <td>{curr.username}</td>
                      <td>{curr.firstname || "N/A"}</td>
                      <td>{curr.lastname || "N/A"}</td>
                      <td>{curr.birthdate || "N/A"}</td>
                      <td>{curr.mobile || "N/A"}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleUserDelete(curr.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="user-table-container">
          {selectedValue === "orders" && (
            <>
              <h1
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                Admin <IoIosArrowRoundForward /> Check orders
              </h1>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Cart ID</th>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Items Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderdata?.map((order, idx) => {
                    const matchedUser = allUsers?.find(
                      (user) => user.id === order.userId
                    );
                    const fullName =
                      (matchedUser?.firstname || "") +
                      " " +
                      (matchedUser?.lastname || "");
                    return (
                      <tr key={idx}>
                        <td>{order.cartId}</td>
                        <td>{order.userId}</td>
                        <td>{fullName.trim() || "N/A"}</td>
                        <td>{order.items?.length || 0}</td>
                        <td>
                          <button className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>

        {selectedValue === "addnewproduct" && (
          <div className="add-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSaveNewProduct}>
              <div>
                <label>Product ID</label>
                <input
                  type="text"
                  name="id"
                  value={newProduct.id}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Colors (comma separated)</label>
                <input
                  type="text"
                  name="colors"
                  value={newProduct.colors}
                  onChange={(e) =>
                    handleNewProductChange({
                      target: {
                        name: "colors",
                        value: e.target.value.split(","),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={newProduct.rating}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={newProduct.company}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div>
                <label>Featured</label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={newProduct.featured}
                  onChange={(e) =>
                    handleNewProductChange({
                      target: { name: "featured", value: e.target.checked },
                    })
                  }
                />
              </div>
              <div>
                <label>Product Images</label>
                <input type="file" multiple onChange={handleNewProductFiles} />
              </div>
              <button type="submit">Save Product</button>
            </form>
          </div>
        )}
        {selectedValue === "manageproducts" && (
          <>
            <h1
              style={{
                color: "red",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              Admin <IoIosArrowRoundForward /> Manage Products
            </h1>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price ($)</th>
                  <th>Stock</th>
                  <th>Images</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminData.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="text"
                        value={editedProducts[product.id]?.name || product.name}
                        onChange={(e) =>
                          handleEdit(product.id, "name", e.target.value)
                        }
                        readOnly={!editMode[product.id]}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={
                          editedProducts[product.id]?.price || product.price
                        }
                        onChange={(e) =>
                          handleEdit(product.id, "price", e.target.value)
                        }
                        readOnly={!editMode[product.id]}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={
                          editedProducts[product.id]?.stock || product.stock
                        }
                        onChange={(e) =>
                          handleEdit(product.id, "stock", e.target.value)
                        }
                        readOnly={!editMode[product.id]}
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e, product.id)}
                        disabled={!editMode[product.id]}
                      />
                      {product.image?.length > 0 && !imageFiles[product.id] && (
                        <div>
                          {product.image.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Product Image ${idx + 1}`}
                              width="50"
                            />
                          ))}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          editedProducts[product.id]?.category ||
                          product.category
                        }
                        onChange={(e) =>
                          handleEdit(product.id, "category", e.target.value)
                        }
                        readOnly={!editMode[product.id]}
                      />
                    </td>
                    <td>
                      {!editMode[product.id] ? (
                        <>
                          <button onClick={() => handleEditClick(product.id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(product.id)}>
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          className="save"
                          onClick={() => handleSave(product.id)}
                        >
                          Save
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
