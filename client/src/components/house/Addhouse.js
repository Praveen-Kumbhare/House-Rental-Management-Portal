// Addhouse.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import Address from "../address/Address";
import "./css/house.css";

const Addhouse = ({ idProof }) => {
  const { user, dispatch } = useContext(Context);
  const history = useHistory();
  const [itemName, setItemName] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [area, setArea] = useState("");
  const [desc, setDesc] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemTypesOptions, setItemTypesOptions] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [addressData, setAddressData] = useState({});
  const [addr, setAddr] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:7070/House_Rent_Service/user/getAllItemType")
      .then((response) => {
        setItemTypesOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item types:", error);
      });
  }, []);

  useEffect(() => {
    if (addr) {
      const AddHouse = async () => {
        axios
          .post("http://localhost:7070/House_Rent_Service/user/adminHouse", {
            houseLocationId: addr,
            houseTypeId: itemType,
            userIdProofId: idProof.id,
            itemName: itemName,
            pricePerUnit: priceUnit,
            desc: desc,
            areaInSqFt: area,
            unit: quantity,
            userId: user.id,
          })
          .then((response) => {
            console.log(response.data);
            dispatch({ type: "UPDATE_SUCCESS", payload: updatedUser });
            const p = response.data.id;
            const newFileName = p + ".jpeg";
            const formData = new FormData();
            formData.append("image", selectedImage1, newFileName);
            axios
              .post(
                "http://localhost:7070/House_Rent_Service/file/uploadImage",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then(() => {
                setIsLoading(false);
                history.push("/Landlord");
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      };
      AddHouse();
    }
  }, [addr]);
  const handleAddressChange = (data) => {
    setAddressData(data);
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const updatedUser = {
    ...storedUser,
    role: "LANDLORD",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      debugger;
      const res = await axios.post(
        "http://localhost:7070/House_Rent_Service/user/area",
        addressData
      );
      setAddr(res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1 style={{ textAlign: "center" }}>Add House</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            placeholder="Enter item name"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="priceUnit">Price Unit</label>
          <input
            type="text"
            id="priceUnit"
            placeholder="Enter price unit"
            value={priceUnit}
            onChange={(event) => setPriceUnit(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="area">Area (square feet)</label>
          <input
            type="number"
            id="area"
            placeholder="Enter area in square feet"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="itemType">Item Type</label>
          <select
            id="itemType"
            value={itemType}
            onChange={(event) => setItemType(event.target.value)}
          >
            <option value="">Select item type</option>
            {itemTypesOptions.map((itemType) => (
              <option key={itemType.id} value={itemType.id}>
                {itemType.typeName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="houseDescription">House Description</label>
          <textarea
            id="houseDescription"
            rows="3"
            placeholder="Enter house description"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <Address
          onInputChange={handleAddressChange}
          addressData={addressData}
        />
        <div className="input-group">
          <label htmlFor="image">Upload Image 1</label>
          <input
            type="file"
            onChange={(e) => setSelectedImage1(e.target.files[0])}
          />
          {selectedImage1 && (
            <img
              className="img"
              src={URL.createObjectURL(selectedImage1)}
              alt="selected"
            />
          )}
        </div>
        <div className="button-container">
          <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Add House"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addhouse;
