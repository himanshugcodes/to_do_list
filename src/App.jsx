import "./App.css";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const list = [
  { name: "This is First task " },
  { name: "This is Second task " },
];
function App() {
  const [item, setItem] = useState([...list]);
  const [formData, setFormData] = useState({ name: "" });
  const [userIndex, setUserIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load todo items from localStorage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem("todoItems"));
    if (storedItems) {
      setItem(storedItems);
    }
  }, []);

  useEffect(() => {
    // Save todo items to localStorage whenever the 'item' state changes
    localStorage.setItem("todoItems", JSON.stringify(item));
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddList = (e) => {
    e.preventDefault();
    if (formData.name) {
      if (userIndex !== null) {
        const updatedList = [...item];
        updatedList[userIndex] = formData;
        setItem(updatedList);
        setUserIndex(null);
      } else {
        setItem([...item, formData]);
      }
      setFormData({ name: "" });
      setError("");
    } else {
      setError("Please enter the item.");
      // alert("please Enter the item ");
    }
  };
  const handleEdit = (index) => {
    const listEdit = item[index];
    setFormData({ name: listEdit.name });
    setUserIndex(index);
  };
  const handleDelete = (index) => {
    const listUpdate = [...item];
    listUpdate.splice(index, 1);
    setItem(listUpdate);
  };

  const handleDeleteAll = () => {
    setItem([]);
  };

  const handleTaskComplete = (index) => {
    const updatedList = [...item];
    updatedList[index].completed = !updatedList[index].completed;
    setItem(updatedList);
  };

  return (
    <div className="todo_container">
      <div className="todo_row">
        <div className="user_input_main">
          <h2>ToDo List</h2>
          <form onSubmit={handleAddList}>
            <input
              type="text"
              placeholder="Enter Here"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <button type="submit">
              {userIndex !== null ? "Update Item" : "Add Item"}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="listShow_main">
          {/* showing completed Task */}
          {item.filter((task) => task.completed).length > 0 ? (
            <h4 style={{ textAlign: "center" }}>
              Task Completed:- {item.filter((task) => task.completed).length}
            </h4>
          ) : null}
          <ul>
            {item.length <= 0 ? (
              <h3 style={{ textAlign: "center" }}>No Item Added</h3>
            ) : (
              item.map((i, index) => (
                <li key={index}>
                  <div className="list_name">
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleTaskComplete(index);
                      }}
                    />{" "}
                    {i.completed ? <del>{i.name}</del> : <span>{i.name}</span>}
                  </div>

                  <div className="list_action">
                    <button
                      type="submit"
                      onClick={() => {
                        handleEdit(index);
                      }}
                    >
                      <FaRegEdit size={18} />
                    </button>
                    <button
                      type="submit"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="allDelete">
          {item.length > 1 ? (
            <button
              type="submit"
              onClick={() => {
                handleDeleteAll();
              }}
            >
              Delete All Task
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
