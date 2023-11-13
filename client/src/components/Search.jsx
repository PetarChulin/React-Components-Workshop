import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/UsersContext";
import UserListItem from "./UserListItem";


const Search = () => {
    const { users, setUsers, filteredNames, setFilteredNames, searchedField, setSearchedField } = useContext(UserContext);
    // const [filteredNames, setFilteredNames] = useState([]);
    // const [searchedField, setSearchedField] = useState('');
    const [selectedValue, setSelectedValue] = useState('First Name');

    const inputRef = useRef();

    useEffect(() => {
        const newFilteredNames = users.filter((item) => {
            switch (selectedValue) {
                case 'First Name':
                    return item.firstName.toLowerCase().includes(searchedField.toLowerCase());
                case 'Last Name':
                    return item.lastName.toLowerCase().includes(searchedField.toLowerCase());
                case 'Email':
                    return item.email.toLowerCase().includes(searchedField.toLowerCase());
                case 'Phone':
                    return item.phoneNumber.toLowerCase().includes(searchedField.toLowerCase());
            }
        });

        setFilteredNames(newFilteredNames);
    }, [users, searchedField]);


    const onSearchChange = (e) => {
        setSearchedField(e.target.value.toLowerCase());
    };

    const handleSelectChange = (event) => {
        // Update the state with the selected value
        setSelectedValue(event.target.value);
        console.log(selectedValue);
    };
    return (
        <>
            <form className="search-form">
                <h2>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                        className="svg-inline--fa fa-user SearchBar_icon__cXpTg" role="img" 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="currentColor"
                            d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z">
                        </path>
                    </svg>
                    <span>Users</span>
                </h2>
                <div className="search-input-container">
                    <input type="search" placeholder="Please, select the search criteria" name="search" ref={inputRef} onChange={onSearchChange} />
                    {/* <!-- Show the clear button only if input field length !== 0 --> */}
                    {/* <button className="btn close-btn">
                        <i className="fa-solid fa-xmark">
                            X
                            </i>
                    </button>

                    <button className="btn" title="Please, select the search criteria">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button> */}
                </div>

                <div className="filter">
                    <span>Search Criteria:</span>
                    <select name="criteria" className="criteria" value={selectedValue} onChange={handleSelectChange}>
                        <option value="First Name">First Name</option>
                        <option value="Last Name">Last Name</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                    </select>
                </div>
            </form>
            {/* <div>
                {searchedField.length > 0 && filteredNames.map((otherProps) =>
                    <UserListItem {...otherProps}
                        key={found._id}
                        userId={found._id}
                        createdAt={found.createdAt}
                        email={found.email}
                        firstName={found.firstName}
                        imageUrl={found.imageUrl}
                        lastName={found.lastName}
                        phoneNumber={found.phoneNumber}
                    onEditClick={editUserClickHandler}
                    onInfoClick={userInfoClickHandler}
                    onDeleteClick={deleteUserClickHandler}
                    />)}
            </div> */}
        </>
    );
};

export default Search;