import { useState } from "react";
import UserCard from "../UserCard";
import UserDeleteModal from "../UserDeleteModal";

const ListView = ({ usersList, onDeleteConfirm, onEditConfirm }) => {
  const [expandedUser, setExpandedUser] = useState(-1);
  const [editUser, setEditUser] = useState(-1);
  const [deleteUser, setDeleteUser] = useState(-1);

  const onShowClick = (i) => {
    setExpandedUser(expandedUser === i ? -1 : i);
  };

  const onEdit = (i) => {
    setEditUser(i);
  };

  const onDelete = (i) => {
    setDeleteUser(i);
  };

  return (
    <>
      <div className="d-flex flex-column gap-2 mt-3">
        {usersList.map((user, i) => (
          <UserCard
            user={user}
            index={i}
            show={expandedUser === i}
            editMode={editUser === i}
            onShowClick={onShowClick}
            onDelete={onDelete}
            onEdit={onEdit}
            onEditCancel={() => onEdit(-1)}
            onEditConfirm={(editedUser) => {
              onEditConfirm(editUser, editedUser);
              onEdit(-1);
              setExpandedUser(-1);
            }}
          />
        ))}
      </div>
      <UserDeleteModal onConfirm={() => {
        onDeleteConfirm(deleteUser);
        onDelete(-1);
        setExpandedUser(-1) ; 
      }} open={deleteUser !== -1} />
    </>
  );
};
export default ListView;
