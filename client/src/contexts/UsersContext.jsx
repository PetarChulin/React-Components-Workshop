import { createContext, useState, useEffect } from "react";
import * as userService from "../services/userService";

export const UserContext = createContext({
    users: [],
    setUsers: () => [],
    filteredNames: [],
    setFilteredNames: () => [],
    searchedField: '',
    setSearchedField: () => ''
});

export const UsersProvider = ({children}) => {

    const [users, setUsers] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    const [searchedField, setSearchedField] = useState('');

    const value = {users, setUsers, filteredNames, setFilteredNames, searchedField, setSearchedField};

    useEffect(() => {

        userService.getAll()
            .then(result => setUsers(result))
            .catch(err => console.log(err));
    }, []);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

};
