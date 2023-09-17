import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
function Home() {
  const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7070/House_Rent_Service/user/available")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const Submit = (id) => {
    console.log(id);
    history.push({
      pathname: "/idd",
      state: { data: id },
    });
  };
  return (
    <div className="album py-5 bg-blend">
      <div className="container">
        <div className="row">
          {data.map((item) => (
            <div className="col-md-4">
              <div className="card mb-4 box-shadow" key={item.id}>
                <img
                  className="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  style={{ height: "225px", width: "100%", display: "block" }}
                  src={`http://localhost:7070/House_Rent_Service/file/getImage/${item.id}.jpeg`}
                  data-holder-rendered="true"
                />
                <div className="card-body">
                  <p className="card-text fw-bolder text-uppercase">
                    {item.itemName}
                  </p>
                  <p className="card-text fw-lighter">
                    <div>
                      {`${item.houseLocation.state} ${item.houseLocation.city} ${item.houseLocation.areaDesc}`}
                    </div>
                  </p>
                  <p className="card-text fw-lighter">
                    Area(in sqft): {item.areaInSqFt}
                  </p>
                  <p className="card-text fw-lighter">
                    price: {item.pricePerUnit}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          Submit(item.id);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
