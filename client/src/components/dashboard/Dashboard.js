import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Route, Switch } from "react-router-dom";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Contact from "../../pages/contact/Contact";
import NotFound from "../../pages/not_found/Notfound";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../../context/Context";
import ForgetPassword from "../forgot_password/Forgotpassword";
import Landlord from "../landlord/Landlord";
import UpdateProfile from "../update_profile/Updateprofile";
import AddHouseType from "../house_type/Housetype";
import IDProofForm from "../id_proof/Idproof";
import AddHousePage from "../house/Addhouse";
import Updatehouse from "../house/Updatehouse";
import HouseDetail from "../../pages/house_details/Housedetails";
import PaymentPage from "../payment/Payment";
import RentalForm from "../rental_form/Rentalform";
import Admin from "../admin/Admin";
import axios from "axios";
import { useContext, useState, useEffect } from "react";

function Dashboard() {
  const { user } = useContext(Context);
  const [isVerified, setIsVerified] = useState(false);
  const [idProof, setIdProof] = useState();
  const verifyIdProof = (val) => {
    setIsVerified(val);
  };
  useEffect(() => {
    {
      user &&
        axios
          .get(
            `http://localhost:7070/House_Rent_Service/user/getUserIdDetails/${user?.id}`
          )
          .then((res) => {
            setIdProof(res.data[0]);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [isVerified, user]);
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path={"/"} component={Home}></Route>
        <Route exact path={"/home"} component={Home}></Route>
        <Route exact path={"/about"} component={About}></Route>

        <Route
          exact
          path={"/ForgetPassword"}
          component={ForgetPassword}
        ></Route>
        <Route exact path={"/contact"} component={Contact}></Route>
        <Route exact path={"/login"} component={Login}></Route>
        <Route exact path={"/register"} component={Register}></Route>
        <Route
          path={"/Landlord"}
          component={user?.role === "LANDLORD" ? Landlord : Home}
        ></Route>
        <Route exact path={"/rfo"} component={RentalForm}></Route>
        <Route exact path={"/admin"} component={Admin}></Route>
        <Route exact path={"/UpdateProfile"} component={UpdateProfile}></Route>
        <Route exact path={"/AddHouseType"} component={AddHouseType}></Route>
        <Route exact path={"/ifd"} component={IDProofForm}></Route>
        <Route exact path={"/idd"} component={HouseDetail}></Route>
        <Route exact path={"/iddp"} component={PaymentPage}></Route>

        <Route path="/update-house/:id" component={Updatehouse} />
        <Route
          exact
          path={"/adf"}
          render={() => {
            if (user && idProof) {
              return <AddHousePage idProof={idProof} />;
            } else if (user) {
              return <IDProofForm isIdProofVerified={verifyIdProof} />;
            } else {
              return <Login />;
            }
          }}
        ></Route>
        <Route exact path={"/upf"} component={UpdateProfile}></Route>
        <Route exact path={"*"} component={NotFound}></Route>
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default Dashboard;
