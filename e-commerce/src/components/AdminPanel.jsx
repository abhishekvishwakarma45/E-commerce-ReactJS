import React, { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";

const AdminPanel = () => {
  const { state, updateSelectValue, setAdminData } = useAdminContext(); // Extract setAdminData properly
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

  useEffect(() => {
    updateSelectValue("dashboard");
  }, []);

  // Handle new product form input change
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle new product form file change
  const handleNewProductFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewProduct((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };

  // Handle save new product
  const handleSaveNewProduct = async (e) => {
    e.preventDefault(); // Prevent page refresh

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

    // Append image files to FormData
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

      // Optionally: Update the admin data after successful addition
      console.log("New product added successfully!");
      setAdminData((prevData) => [...prevData, newProduct]); // Update admin data state
      // Optionally clear the form if needed
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

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`ecommerce/product/remove/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const updatedAdminData = adminData.filter((product) => product.id !== id);
      setAdminData(updatedAdminData); // Update admin data correctly

      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle product editing
  const handleEditClick = (id) => {
    setEditMode((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleSave = (id) => {
    // Handle saving the edited product
    const updatedProducts = [...adminData];
    const index = updatedProducts.findIndex((product) => product.id === id);
    if (index !== -1) {
      updatedProducts[index] = {
        ...updatedProducts[index],
        ...editedProducts[id],
      };
    }
    setAdminData(updatedProducts);
    setEditMode((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleEdit = (id, key, value) => {
    setEditedProducts((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [key]: value,
      },
    }));
  };

  const handleFileChange = (e, id) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevState) => ({
      ...prevState,
      [id]: files,
    }));
  };

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <button onClick={() => updateSelectValue("dashboard")}>
            Dashboard
          </button>
          <button onClick={() => updateSelectValue("manageproducts")}>
            Manage Products
          </button>
          <button onClick={() => updateSelectValue("orders")}>Orders</button>
          <button onClick={() => updateSelectValue("users")}>Users</button>
          <button onClick={() => updateSelectValue("settings")}>
            Settings
          </button>
          {/* Added the button for adding a new product */}
          <button onClick={() => updateSelectValue("addnewproduct")}>
            Add New Product
          </button>
        </ul>
      </aside>

      <main className="content">
        <header>
          <h1>Welcome, Admin</h1>
        </header>

        {/* Add New Product Form */}
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

        {/* Manage Products Section */}
        {selectedValue === "manageproducts" && (
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
                      value={editedProducts[product.id]?.price || product.price}
                      onChange={(e) =>
                        handleEdit(product.id, "price", e.target.value)
                      }
                      readOnly={!editMode[product.id]}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedProducts[product.id]?.stock || product.stock}
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
                        editedProducts[product.id]?.category || product.category
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
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
