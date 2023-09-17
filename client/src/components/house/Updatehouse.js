import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Address from "../address/Address";
import axios from "axios";

const Updatehouse = () => {
  const { id } = useParams();
  const history = useHistory();
  const [itemName, setItemName] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [area, setArea] = useState("");
  const [desc, setDesc] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemTypesOptions, setItemTypesOptions] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    `http://localhost:7070/House_Rent_Service/file/getImage/${id}.jpeg`
  );
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [addressData, setAddressData] = useState({});
  const [addr, setAddr] = useState();

  const handleAddressChange = (data) => {
    setAddressData((prevAddressData) => ({
      ...prevAddressData,
      ...data,
    }));
  };
  const handleItemTypeChange = (event) => {
    const selectedType = event.target.value;
    setItemType(selectedType);
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage1(selectedImage);
    setSelectedImageUrl(null);
  };

  useEffect(() => {
    const getHouseByHouseId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/House_Rent_Service/user/getHouseByHouseId/${id}`
        );
        const responseData = response.data;
        setItemName(responseData.itemName);
        setPriceUnit(responseData.pricePerUnit);
        setArea(responseData.areaInSqFt);
        setQuantity(responseData.quantity);
        setDesc(responseData.description);
        setItemType(responseData.houseType.id);
        setAddressData(responseData.houseLocation);
      } catch (error) {
        console.log("Error fetching house data:", error);
      }
    };
    const getAllHouseType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7070/House_Rent_Service/user/getAllItemType"
        );
        setItemTypesOptions(response.data);
      } catch (error) {
        console.error("Error fetching item types:", error);
      }
    };

    getHouseByHouseId();
    getAllHouseType();
  }, []);
  useEffect(() => {
    if (addr) {
      const updateHouseData = async () => {
        try {
          await axios.put(
            `http://localhost:7070/House_Rent_Service/user/updateHouse/${id}`,
            {
              houseLocationId: addr?.id,
              houseTypeId: itemType,
              itemName: itemName,
              pricePerUnit: priceUnit,
              desc: desc,
              areaInSqFt: area,
              unit: quantity,
            }
          );
        } catch (error) {
          console.log(error);
        }
      };
      const updateHouseImage = async () => {
        try {
          const formData = new FormData();
          formData.append("image", selectedImage1);
          await axios.put(
            `http://localhost:7070/House_Rent_Service/file/updateImage/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      };
      updateHouseData();
      updateHouseImage();
      history.push("/landlord");
    }
  }, [addr, id, itemType, itemName, priceUnit, desc, area, quantity, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const addressResponse = await axios.put(
        `http://localhost:7070/House_Rent_Service/user/updateLocation/${addressData?.id}`,
        addressData
      );
      setAddr(addressResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1 style={{ textAlign: "center" }}>Update House</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label for="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            placeholder="Enter item name"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="priceUnit">Price Unit</label>
          <input
            type="text"
            id="priceUnit"
            placeholder="Enter price unit"
            value={priceUnit}
            onChange={(event) => setPriceUnit(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="area">Area (square feet)</label>
          <input
            type="number"
            id="area"
            placeholder="Enter area in square feet"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="itemType">Item Type</label>
          <select
            id="itemType"
            value={itemType}
            onChange={handleItemTypeChange}
          >
            <option value="">Select item type</option>
            {itemTypesOptions.map((itemTypeOption) => (
              <option key={itemTypeOption.id} value={itemTypeOption.id}>
                {itemTypeOption.typeName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label for="houseDescription">House Description</label>
          <textarea
            id="houseDescription"
            rows="3"
            placeholder="Enter house description"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          ></textarea>
        </div>

        <div className="input-group">
          <label for="quantity">Quantity</label>
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
          <label htmlFor="image">Upload Image</label>
          <input type="file" onChange={handleImageChange} />
          {selectedImageUrl && (
            <img className="img" src={selectedImageUrl} alt="selected" />
          )}
          {selectedImage1 && (
            <img
              className="img"
              src={URL.createObjectURL(selectedImage1)}
              alt="selected"
            />
          )}
        </div>
        <div className="button-container">
          <button className="submit-button" type="submit">
            Update House
          </button>
        </div>
      </form>
    </div>
  );
};
export default Updatehouse;
