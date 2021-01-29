import { useEffect, useState } from "react";
import axios from "axios";

import Card from "./components/Card/card";
import Footer from "./components/Footer/footer";
import Search from "./components/Search/search";
import Filter from "./components/Filter/filter";
import Loading from "./components/LoadingIndicator/loadingIndicator";
import "./App.css";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [display, setDisplay] = useState([]);
  const [filteredProfile, setFilteredProfile] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getRecords() {
      try {
        const { data } = await axios.get(
          "https://api.enye.tech/v1/challenge/records"
        );
        setLoaded(true);
        setProfiles(data.records.profiles);
        setFilteredProfile(data.records.profiles);
      } catch (e) {
        setError("Oops, An Error Occured");
        console.log(e);
      }
    }
    getRecords();
  }, []);
  return loaded ? (
    <>
      <Search profiles={profiles} setProfiles={setFilteredProfile} />
      <Filter profiles={profiles} setProfiles={setFilteredProfile} />
      <div className="container">
        <div className="tiles">
          {display.map((profile, index) => (
            <div key={index} className="tile">
              <Card>
                <h4
                  style={{ textAlign: "center" }}
                >{`${profile.FirstName} ${profile.LastName}`}</h4>
                <p>{`Gender: ${profile.Gender}`}</p>
                <p>{`Email: ${profile.Email}`}</p>
                <p>{`Phone Number: ${profile.PhoneNumber}`}</p>
                <p>{`Username: ${profile.UserName}`}</p>
                <p>{`Location: ${profile.Latitude}, ${profile.Longitude}`}</p>
                <p>{`DomainName: ${profile.DomainName}`}</p>
                <p>{`MacAddress: ${profile.MacAddress}`}</p>
                <p>{`URL: ${profile.URL}`}</p>
                <p>{`Payment Method: ${profile.PaymentMethod}`}</p>
                <p>{`Credit Card Type: ${profile.CreditCardType}`}</p>
                <p>{`Credit Card Number: ${profile.CreditCardNumber}`}</p>
                <p>{`Last Login: ${profile.LastLogin}`}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer
        size={filteredProfile.length}
        totalProfiles={filteredProfile}
        setFunction={setDisplay}
      />
    </>
  ) : (
    <div className="indicator">{error ? <h5>{error}</h5> : <Loading />}</div>
  );
};

export default App;
