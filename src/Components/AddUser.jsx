import { useState } from 'react'

const AddUser = ({handleAddUser}) => {
const [dataForm,setDataForm]=useState({
    username:"",
    workout:"",
    time:""
})

const handleChange = (e)=>{
    const {name,value}= e.target;
    
   
    setDataForm((pre)=>{
        return{
            ...pre,
            [name]:value
        }
    })
}
    const submitHandler = (e)=>{
        e.preventDefault()
        let data = {
            ...dataForm
        }
        if(data?.time!=="" || data?.username!="" ||data?.workout!==""){
            console.log("data",data)
            handleAddUser(data)
            setDataForm({
                username:"",
                workout:"",
                time:""
            })
            alert("data submit successfully")
        }else{
            alert("all field are required")
            return
        }
      
       
    }

    return (
        <div className='p-5 w-full '>
            <form onSubmit={submitHandler} className='flex items-center flex-col gap-5 w-full bg-slate-300 border p-5 shadow-lg hover:shadow-xl rounded-xl'>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full ">
                    <div className='flex flex-col justify-center gap-3 w-full flex-wrap '>
                        <label htmlFor='username' className='text-sky-700 text-xl font-semibold'>User Name</label>
                        <input type='text' 
                        name="username"
                         value={dataForm.username}
                        onChange={handleChange}
                        placeholder='Enter User Name' id='username' className=' border border-gray-200 p-2 rounded-lg w-full' required />
                    </div>
                    <div className='flex flex-col justify-center gap-3  w-full flex-wrap'>
                        <label className='text-sky-700 text-xl font-semibold' htmlFor="cars">Workout Type</label>

                        <select
                          name="workout"
                          value={dataForm.workout}
                         onChange={handleChange} 
                         id="cars" className=' border border-gray-200 p-2 rounded-lg w-full' required>
                            <option selected>Choose Workout Type</option>
                            <option  value="running">Running</option>
                            <option value="cycling">Cycling</option>
                            <option value="swimming">Swimming</option>
                            <option value="yoga">Yoga</option>
                        </select>
                    </div>
                    <div className='flex flex-col justify-center gap-3  w-full flex-wrap'>
                        <label htmlFor="time" className='text-sky-700 text-xl font-semibold'>Workout Minutes</label>

                        <select 
                          name="time"
                          value={dataForm.time}
                         onChange={handleChange}
                        id="time" className=' border border-gray-200 p-2 rounded-lg w-full'>
                            <option selected>Choose Workout Time</option>
                            <option value="15">15 min</option>
                            <option value="30" >30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">60 min</option>
                        </select>
                    </div>

                </div>
                <div className='flex items-center justify-center w-full'> <button type='submit' className=' px-3 py-2 bg-black text-xl text-white font-semibold  rounded-3xl opacity-85 hover:opacity-100  '>Add Workout</button></div>
            </form>


        </div>
    )
}

export default AddUser