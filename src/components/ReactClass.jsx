import React, { useState, useEffect, useRef, useMemo } from "react";
import "../css/Style.css";
export default function ReactClass(props) {
  const [UsersReact, setUsersReact] = useState([
    { name: "Đinh Tuấn Anh", age: 20 },
    { name: "Ngụy Minh Thắng", age: 21 },
    { name: "Nguyễn Anh Thư", age: 22 },
  ]);
  const [UsersJava, setUsersJava] = useState([
    { name: "Bế Trọng Hiếu", age: 20 },
    { name: "Ngô Huỳnh Đức", age: 21 },
    { name: "Nguyễn Mạnh Dũng", age: 18 },
  ]);

  const Member = (props) => {
    const { name, age, handleTransfer, handleEdit, handleDelete } = props;
    return (
      <div>
        <div>
          {" "}
          name: {name}, age: {age}
        </div>
        <button
          onClick={() => {
            handleTransfer();
          }}
        >
          Transfer
        </button>
        <button
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (UsersReact.length === 0) {
      alert("Warning: react class is empty now");
    } else if (UsersJava.length === 0) {
      alert("Warning: java class is empty now");
    }
  }, [UsersReact.length, UsersJava.length]);

  const TransferReactToJava = (index) => {
    const e1 = UsersReact[index];
    UsersReact.splice(index, 1);
    UsersJava.push(e1);
    setUsersReact([...UsersReact]);
    setUsersJava([...UsersJava]);
  };
  const TransferJavaToReact = (index) => {
    const e1 = UsersJava[index];
    UsersJava.splice(index, 1);
    UsersReact.push(e1);
    setUsersReact([...UsersReact]);
    setUsersJava([...UsersJava]);
  };

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    classType: "react",
  });

  const handleInput = (e) => {
    // setFormData({...formData, [e.target.name]: e.target.value})
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const initData = {
    name: "",
    age: "",
    classType: "react",
  };

  // submit add and update form
  const handleSubmit = () => {
    if (formData.isEdit) {
      const {originClassType, index}= formData
      if(originClassType!== formData.classType){
        if(formData.classType=== 'react'){
          UsersReact.push(formData)
          setUsersReact([...UsersReact])
          UsersJava.splice(index, 1)
          setUsersJava([...UsersJava])
        }
        else if(formData.classType=== 'java') {
          UsersJava.push(formData)
          setUsersJava([...UsersJava])
          UsersReact.splice(index, 1)
          setUsersReact([...UsersReact])
        }
        else {
          alert('your user do not have a originClassType, please add one more user with classtype to edit')
        }
      }
      else {
        if(formData.classType==='react'){
          console.log('edit react')
          UsersReact[index]= formData
          setUsersReact([...UsersReact])
        }
        else if(formData.classType==='java'){
          console.log('edit java')
          UsersJava[index]= formData
          setUsersJava([...UsersJava])
        }
        else {
          alert('your user do not have a originClassType, please add one more user with classtype to edit')
        }
      }
    }else{
      if(formData.classType==='react'){
        UsersReact.push(formData)
        setUsersReact([...UsersReact])
      }
      else{
        UsersJava.push(formData)
        setUsersJava([...UsersJava])
      }
    }
    setFormData(initData);

    // if (formData.classType === "react") {
    //   UsersReact[formData.index] = formData;
    //   setFormData(UsersReact);
    // } else if (formData.classType === "java") {
    //   UsersJava[formData.index] = formData;
    //   setFormData(UsersJava);
    // } else {
    //   alert("error");
    // }
  };

  //search by name, sort by age
  const [searchUsers, setSearchUsers] = useState("");
  const sort = {
    no: 0,
    up: 1,
    down: 2,
  };

  //display users from list
  const getUsers = (list) => {
    let res = [...list];
    //search
    if (searchUsers) {
      res = res.filter((e1) => e1.name.includes(searchUsers));
    }
    // sort
    if (sortType !== sort.no) {
      res.sort((a, b) => {
        if (sortType === sort.up) return parseInt(a.age) - parseInt(b.age);
        else return parseInt(b.age) - parseInt(a.age);
      });
    }
    return res;
  };
  const [sortType, setSortType] = useState(sort.no);
  // change button text
  const getSortType = () => {
    return sortType === 0 ? "no" : sortType === 1 ? "up" : "down";
  };
  // change sort type wherever click the button
  const handleSort = () => {
    return sortType === 0
      ? setSortType(sort.up)
      : sortType === 1
      ? setSortType(sort.down)
      : setSortType(sort.no);
  };

  // edit users

  const reactEdit = (index) => {
    setFormData({ ...UsersReact[index], isEdit: true, index: index, originClassType: UsersReact[index].classType });
    refInputFocus.current.focus();
  };
  const javaEdit =(index)=>{
    setFormData({ ...UsersJava[index], isEdit: true, index: index, originClassType: UsersJava[index].classType });
    refInputFocus.current.focus();
  }

  //delete users

  const reactDelete = (index)=>{
    UsersReact.splice(index, 1);
    setUsersReact([...UsersReact])
  }
  const javaDelete = (index)=>{
    UsersJava.splice(index, 1);
    setUsersJava([...UsersJava])
  }
// focus input tag
const refInputFocus =useRef();

// optimize performance thanks to useMemo
const ReactUsersToRender = useMemo(()=>getUsers(UsersReact), [UsersReact])
const JavaUsersToRender = useMemo(()=>getUsers(UsersJava), [UsersJava])
  return (
    <div className="container">
      <h2>search by name</h2>
      <div>
        Search by name:{" "}
        <input
          value={searchUsers}
          onChange={(e) => setSearchUsers(e.target.value)}
        />
      </div>
      <h2>sort by age: </h2>
      <button
        type="button"
        onClick={() => {
          handleSort();
        }}
      >
        Sort: {getSortType()}
      </button>
      <div className="head">List members of React class</div> <br />
      <div>
        {UsersReact.length > 0
          ? ReactUsersToRender.map((user, index) => {
              return (
                <div className="list react-class">
                  <Member
                    key={index}
                    name={user.name}
                    age={user.age}
                    handleTransfer={() => {
                      TransferReactToJava(index);
                    }}
                    handleEdit={() => {
                      reactEdit(index);
                    }}
                    handleDelete={()=>{
                      reactDelete(index);
                    }}
                  />
                </div>
              );
            })
          : "empty"}
      </div>
      <br />
      <div className="head">List members of Java class</div> <br />
      <div>
        {UsersJava.length > 0
          ? JavaUsersToRender.map((user, index) => {
              return (
                <div className="list java-class">
                  <Member
                    key={index}
                    name={user.name}
                    age={user.age}
                    handleTransfer={() => {
                      TransferJavaToReact(index);
                    }}
                    handleEdit={() => {
                      javaEdit(index);
                    }}
                    handleDelete={()=>{
                      javaDelete(index);
                    }}
                  />
                </div>
              );
            })
          : "empty class"}
      </div>
      <br />
      <div className="head">
        Form {formData.isEdit ? "edit" : "add"} members
      </div>{" "}
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="">name</label>
        <input
          type="text"
          name="name"
          ref={refInputFocus}
          value={formData.name}
          onChange={(e) => handleInput(e)}
        />
        {" --- "}
        <label htmlFor="">age</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={(e) => handleInput(e)}
        />
        <select
          name="classType"
          onChange={(e) => handleInput(e)}
          value={formData.classType}
        >
          <option value="react">React</option>
          <option value="java">Java</option>
        </select>
        {/* <button>Add member</button> */}
        <button>{formData.isEdit ? "edit" : "add"} member</button>
        <button type="button" onClick={()=>{setFormData(initData)}}>cancel</button>
      </form>
    </div>
  );
}
