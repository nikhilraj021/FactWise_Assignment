import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import "./index.css";
import { useState } from "react";

const UserCard = ({
  user,
  show,
  index,
  editMode,
  onShowClick,
  onDelete,
  onEdit,
  onEditCancel,
  onEditConfirm
}) => {
  const [editedUser, setEditedUser] = useState(user);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${show ? '' : 'collapsed'}`}
            type="button"
            onClick={() => {
                if (editMode) return;
                onShowClick(index);
            }}
            ariaExpanded={show}
          >
            <div className="d-flex align-items-center gap-3">
              <img
                className="rounded-circle"
                src={user.picture}
                alt="user profile"
              />
              {!editMode ? (
                <strong>{user.fullName}</strong>
              ) : (
                <input
                  className="form-control form-control-md"
                  value={editedUser.fullName}
                  onChange={(e) => setEditedUser(u => ({...u, fullName: e.target.value}))}
                />
              )}
            </div>
          </button>
        </h2>
        <div className={`accordion-collapse collapse ${show ? "show" : ""}`}>
          <div className="accordion-body">
            <div className="my-1">
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-1 align-items-start">
                    <span className="text-secondary">Age</span>
                    {!editMode ? (
                      <span>{user.age} years</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control form-control-md"
                        value={editedUser.age+'years'}
                        onChange={(e) => setEditedUser(u => ({...u, age: e.target.value}))}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-1 align-items-start">
                    <span className="text-secondary">Gender</span>
                    {!editMode ? (
                      <span>{user.gender}</span>
                    ) : (
                      <select
                        type="text"
                        className="form-select"
                        value={editedUser.gender}
                        onChange={(e) => setEditedUser(u => ({...u, gender: e.target.value}))}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-1 align-items-start">
                    <span className="text-secondary">Country</span>
                    {!editMode ? (
                      <span>{user.country}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control form-control-md"
                        value={editedUser.country}
                        onChange={(e) => setEditedUser(u => ({...u, country: e.target.value}))}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex flex-column gap-1 align-items-start">
                    <span className="text-secondary">Description</span>
                    {!editMode ? (
                      <span className="text-start">{user.description}</span>
                    ) : (
                      <textarea
                        className="form-control form-control-md"
                        value={editedUser.description}
                        onChange={(e) => setEditedUser(u => ({...u, description: e.target.value}))}
                      ></textarea>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                {!editMode ? (
                  <>
                    <span
                      className="text-danger fs-4 cursor-pointer"
                      onClick={() => onDelete(index)}
                      data-bs-toggle="modal"
                    >
                      <RiDeleteBinLine />
                    </span>
                    <span
                      className="text-primary fs-4 cursor-pointer"
                      onClick={() => onEdit(index)}
                    >
                      <MdOutlineEdit />
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="text-danger fs-4 cursor-pointer"
                      onClick={() => onEditCancel(index)}
                    >
                      <MdOutlineCancel />
                    </span>
                    <span
                      className="text-success fs-4 cursor-pointer"
                      onClick={() => onEditConfirm(editedUser)}
                    >
                      <MdCheckCircleOutline />
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
