import { useEffect, useState, useContext } from "react";

import * as userService from "../services/userService";

import UserListItem from './UserListItem';
import CreateUserModal from "./CreateUserModal";
import UserInfoModal from "./UserInfoModal";
import UserDeleteModal from "./UserDeleteModal";
import Spinner from "./Spinner";
import EditUserModal from "./EditUserModal";
import { UserContext } from "../contexts/UsersContext";

// const itemsOnPage = 5;

const UserListTable = () => {
    // const [users, setUsers] = useState([]);
    const { users, setUsers, filteredNames, searchedField } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsOnPage, setItemsOnPage] = useState(5);

    let totalPages = Math.ceil(users.length / itemsOnPage);
    let pagesCountAfterFilter = Math.ceil(filteredNames.length / itemsOnPage);
    const startIdx = (currentPage - 1) * itemsOnPage;
    const endIdx = startIdx + itemsOnPage;
    const displayedUsers = users.slice(startIdx, endIdx);

    const handlePageChange = (newPage) => {
        console.log(currentPage)
        setCurrentPage(newPage);
    };

    const handleSelectChange = (e) => {
        const selectedItemsPerPage = parseInt(e.target.value);
        setItemsOnPage(selectedItemsPerPage);
        console.log(itemsOnPage);
        setCurrentPage(1);
    };

    // useEffect(() => {
    //     setIsLoading(true);

    //     userService.getAll()
    //         .then(result => setUsers(result))
    //         .catch(err => console.log(err))
    //         .finally(() => setIsLoading(false));
    // }, []);



    const createUserClickHandler = () => {
        setShowCreate(true);
    };

    const hideCreateUserModal = () => {
        setShowCreate(false);
    };

    const userCreateHandler = async (e) => {
        // Stop page from refreshing
        e.preventDefault();

        // Get data from form data
        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log(data);

        // Create new user at the server
        const newUser = await userService.create(data);

        // Add newly created user to the local state
        setUsers(state => [...state, newUser]);

        // Close the modal
        setShowCreate(false);
    };

    const editUserClickHandler = (userId) => {
        setSelectedUser(userId)
        setShowEdit(true);
    };


    const userEditHandler = async (e) => {

        e.preventDefault();
        const data = Object.fromEntries(new FormData(document.getElementById("forma")));

        const editedUser = await userService.edit(selectedUser, data);


        console.log(selectedUser);
        setUsers(prevUsers => prevUsers.map(user =>
            user._id === editedUser._id ? editedUser : user
        ));
        setShowEdit(false);

    };

    const userInfoClickHandler = async (userId) => {
        setSelectedUser(userId);
        setShowInfo(true);

    };

    const deleteUserClickHandler = (userId) => {
        setSelectedUser(userId);
        setShowDelete(true);
    }

    const deleteUserHandler = async () => {
        // Remove user from server
        await userService.remove(selectedUser);

        // Remove user from state
        setUsers(state => state.filter(user => user._id !== selectedUser));

        // Close the delete modal
        setShowDelete(false);
    };

    return (
        <div className="table-wrapper">
            {showCreate && (
                <CreateUserModal
                    onClose={hideCreateUserModal}
                    onCreate={userCreateHandler}
                />
            )}

            {showEdit && (
                <EditUserModal
                    onClose={() => setShowEdit(false)}
                    userId={selectedUser}
                    onEdit={userEditHandler}
                />
            )}

            {showInfo && (
                <UserInfoModal
                    onClose={() => setShowInfo(false)}
                    userId={selectedUser}
                />
            )}

            {showDelete && (
                <UserDeleteModal
                    onClose={() => setShowDelete(false)}
                    onDelete={deleteUserHandler}
                />
            )}

            {isLoading && <Spinner />}

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Created
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(searchedField.length > 0 ? filteredNames : displayedUsers).map(user => (
                        <UserListItem
                            key={user._id}
                            userId={user._id}
                            createdAt={user.createdAt}
                            email={user.email}
                            firstName={user.firstName}
                            imageUrl={user.imageUrl}
                            lastName={user.lastName}
                            phoneNumber={user.phoneNumber}
                            onEditClick={editUserClickHandler}
                            onInfoClick={userInfoClickHandler}
                            onDeleteClick={deleteUserClickHandler}
                        />
                    ))}
                </tbody>
            </table>
            
            <div className="pagination center limit">
                <div>Items per page
                    <select value={itemsOnPage} onChange={handleSelectChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <button className="btn-add btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    &larr;
                </button>
                <span className="pages">{` Page ${currentPage} of ${ filteredNames.length > 0 
                    ? pagesCountAfterFilter 
                    : totalPages} `}</span>
                <button className="btn-add btn"
                    disabled={currentPage === totalPages || filteredNames.length <= itemsOnPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    &rarr;
                </button>
            </div>
            <button className="btn-add btn" onClick={createUserClickHandler}>Add new user</button>
        </div>
    );
};

export default UserListTable;