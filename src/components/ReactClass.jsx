import React,{useState, useEffect} from 'react'
import '../css/Style.css'
export default function ReactClass(props) {

  const [UsersReact, setUsersReact]=useState(
    [{name:'Đinh Tuấn Anh', age:20},
  {name:'Ngụy Minh Thắng', age:21},
  {name:'Nguyễn Anh Thư', age:22}]);
  const [UsersJava, setUsersJava]=useState(
    [{name:'Bế Trọng Hiếu', age:20},
    { name:'Ngô Huỳnh Đức', age:21},
    {name:'Nguyễn Mạnh Dũng', age:18}]);

  const Member = (props)=>{
    const {name, age, handleTransfer, fillInfor}= props;
    return (
      <div>
        <div> name: {name}, age: {age}</div>
      <button onClick={()=>{handleTransfer()}}>Transfer</button>
      <button onClick={()=>{fillInfor()}}>Edit</button>
      </div>
    )
  }
  
  useEffect(()=>{
    if(UsersReact.length=== 0){
      alert('Warning: react class is empty now')
    }
    else if (UsersJava.length=== 0){
      alert('Warning: java class is empty now')

    }
  }, [UsersReact.length, UsersJava.length])


  const TransferReactToJava=(index)=>{
    const e1= UsersReact[index]
    UsersReact.splice(index, 1)
    UsersJava.push(e1)
    setUsersReact([...UsersReact])
    setUsersJava([...UsersJava])
  }
  const TransferJavaToReact=(index)=>{
    const e1= UsersJava[index]
    UsersJava.splice(index, 1)
    UsersReact.push(e1)
    setUsersReact([...UsersReact])
    setUsersJava([...UsersJava])
  }
  const FillReactInforToForm=(user, index) => {
    setFormData({
      ...user,
      index: index,
      classType: 'react'
    })
  }
  const FillJavaInforToForm=(user, index) => {
    setFormData({
      ...user,
      index: index,
      classType: 'java'
    })
  }

  const [formData, setFormData]= useState({
    name:"",
    age:"",
    classType:"react",
  })

  const handleInput = (e)=>{
    // setFormData({...formData, [e.target.name]: e.target.value})
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            })
  }
  const initData ={
    name:"",
    age:"",
    classType:"react",
  }
  const handleSubmit =()=>{
    if(formData.classType==='react'){
      UsersReact[formData.index]= formData
      setFormData(UsersReact)
    }
    else if(formData.classType==='java'){
      UsersJava[formData.index]= formData
      setFormData(UsersJava)
    }
    else{
      alert('error')
    }
    setFormData(initData)
  }
  return (
    <div className="container">
      <div className="head">List members of React class</div> <br />
      <div>{UsersReact.length> 0 ? UsersReact.map((user, index)=> {
        return(
          <div className="list react-class">
            <Member key={index} name={user.name} age={user.age} 
            handleTransfer={()=>{TransferReactToJava(index)}}
            fillInfor= {()=>{FillReactInforToForm(user, index)}
          }/>
          </div>
        )
      }) : "empty"}</div>
      <br />
      <div className="head">List members of Java class</div> <br />
      <div>{UsersJava.length>0 ? UsersJava.map((user, index)=> {
        return(
          <div className="list java-class">
            <Member key={index} name={user.name} age={user.age} 
            handleTransfer={()=>{TransferJavaToReact(index)}}
           fillInfor= {()=>{FillJavaInforToForm(user, index)}
          }/>
          </div>
        )
      }): "empty class"}</div>
      <br />


      <div className="head">Form add members</div> <br />
      <form onSubmit={(e)=> {
        e.preventDefault();
        handleSubmit();
      }}>
      <label htmlFor="">name</label>  
      <input type="text" name="name" value={formData.name} onChange={(e)=> handleInput(e)}/>
      {" --- "}
      <label htmlFor="">age</label>  
      <input type="text" name="age" value={formData.age} onChange={(e)=> handleInput(e)}/>
      <select name="classType" onChange={(e)=> handleInput(e)} value={formData.classType}>
            <option value="react">React</option>
            <option value="java">Java</option>
          </select>
          {/* <button>Add member</button> */}
          <button>Update member</button>
      </form>
    </div>
  )
}

