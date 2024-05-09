import "./App.css";
import ListView from "./Components/ListView";
import { GoSearch } from "react-icons/go";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const App = () => {
  const [usersList, setUsersList] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  // useMemo is used to cache the filteredUsers array
  // it will be re-evaluated only when the usersList or searchedValue changes
  const filteredUsers = useMemo(() => {
    return usersList.filter(u => u.first.includes(searchedValue) || u.last.includes(searchedValue));
  }, [usersList, searchedValue]);

  useEffect(() => {
    const getUsers = async () => {
      // get users from json file
      const resp = await axios.get("celebrities.json");
      setUsersList(resp.data.users.map(u => ({...u, fullName: u.first+' '+u.last, age: calculateAge(u.dob)})));
    };

    getUsers();
  }, []);

  const onNameSearch = (e) => {
    const searched = e.target.value;
    setSearchedValue(searched);
  };

  const onDeleteConfirm = (i) => {
    const user = filteredUsers[i];
    setUsersList(users => users.filter(u => u.fullName !== user.fullName));
  }

  const calculateAge = (dob) => {
    const today = new Date();
    const dobDate = new Date(dob);
    // get difference in milliseconds
    const diff = today.getTime() - dobDate.getTime();
    // return age in years
    return Math.trunc(diff/(365*24*60*60*1000));
  }

  const onEditConfirm = (i, editedUser) => {
    const user = filteredUsers[i];
    // update user in users list
    setUsersList(users => {
      users.forEach(u => {
        if (u.fullName === user.fullName) {
          u.fullName = editedUser.fullName;
          u.country = editedUser.country;
          u.gender = editedUser.gender;
          u.description = editedUser.description;
          u.age = editedUser.age;
        }
      });
      return users;
    });
  }

  return (
    <div className="App container">
      <h1>FactWise Assignment Visual Referance</h1>
      <div className="search mt-3 w-50">
        <GoSearch/>
        <input
          type="search"
          placeholder="Search User"
          onChange={onNameSearch}
          className="search-input form-control"
        />
      </div>
      <ListView usersList={filteredUsers} onDeleteConfirm={onDeleteConfirm} onEditConfirm={onEditConfirm} />
    </div>
  );
};

export default App;


