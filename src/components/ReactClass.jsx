import React,{useState, useEffect} from 'react'
import '../css/Style.css'
export default function ReactClass(props) {
  const [UsersReact, setUsersReact]=useState([{id: 1,name:'Đinh Tuấn Anh', age:20},{id: 2, name:'Ngụy Minh Thắng', age:21},{id:3, name:'Nguyễn Anh Thư', age:22}]);
  const [UsersJava, setUsersJava]=useState([{id: 4,name:'Bế Trọng Hiếu', age:20},{id: 5, name:'Ngô Huỳnh Đức', age:219},{id:6, name:'Nguyễn Mạnh Dũng', age:18}]);
  const User = (props)=>{
    return (
      <div key={props.id}> name: {props.name}, age: {props.age}</div>
    )
  }

  useEffect(()=>{
    alert("Warning: React class is empty now")
  }, [UsersReact.length==0])
  useEffect(()=>{
    alert("Warning: Java class is empty now")
  }, [UsersJava.length==0])

  return (
    <div className="container">
      <div className="head">List members of React class</div> <br />
      <div>{UsersReact.map((user)=> {
        return(
          <div className="list react-class">
            <User key={user.id} name={user.name} age={user.age}/>
            <button onClick={()=>{
              UsersJava.push(user)
              UsersReact.splice(UsersReact.indexOf(user), 1)
              setUsersJava([...UsersJava])
            }}>Transfer</button>
            <br />
          </div>
        )
      })}</div>
      <br />
      <div className="head">List members of Java class</div> <br />
      <div>{UsersJava.map((user)=> {
        return(
          <div className="list java-class">
            <User key={user.id} name={user.name} age={user.age}/>
            <button onClick={()=>{
              UsersReact.push(user)
              UsersJava.splice(UsersJava.indexOf(user), 1)
              setUsersReact([...UsersReact])
            }}>Transfer</button>
            <br />
          </div>
        )
      })}</div>
      <br />
      <div className="head">Form add members</div> <br />
      <div>
        <div>
          <span>name <input type="text" placeholder="Name..." /></span>
        <span>age <input type="text" placeholder="Age..." /></span>
        <span>
          <select name="" id="">
            <option value="">React</option>
            <option value="">Java</option>
          </select>
        </span>
        </div>
        <button>Add members</button>
      </div>
      <br />
    </div>
  )
}

