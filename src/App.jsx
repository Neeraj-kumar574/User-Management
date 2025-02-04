import { useState } from 'react'
import AddUser from './Components/AddUser'


const App = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("users")) || [])
  const [filterData, setFilterData] = useState([])
  const handleAddUser = (user) => {
    localStorage.setItem("users", JSON.stringify([...userData, user]))
    setUserData([...userData, user])

  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Calculate total pages based on the data length and items per page
  const totalPages = Math.ceil(filterData.length !== 0 ? filterData.length / itemsPerPage : userData.length / itemsPerPage);

  // Get the indexes for slicing userData for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.length !== 0 ? filterData.slice(indexOfFirstItem, indexOfLastItem) : userData.slice(indexOfFirstItem, indexOfLastItem);

  // Handler for page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter2 = (value) => {
    if (value == "clear") {
      setFilterData([])
    } else {
      const filtered = userData.filter((item) => item.username == value)
      setFilterData([...filtered])
    }

  }

  const handleFilter = (value) => {
    if (value == "clear") {
      setFilterData([])
    } else {
      const filtered = userData.filter((item) => item.workout == value)
      setFilterData([...filtered])
    }

  }
  return (
    <div className='p-5 bg-zinc-300'>
      <div className=" w-full h-auto py-5">
        <h2 className="text-6xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 text-center">User Management </h2>
      </div>
      <AddUser handleAddUser={handleAddUser} />
      <section className='p-5'>
        <div className='my-5 flex items-center justify-between gap-5 flex-wrap'>
          <form action="">
            <div className="relative">
              <input onChange={(e) => handleFilter2(e?.target?.value)} type="text" id="default-search" className="block w-full bg-blue-500 text-white max-w-xs px-4 py-3 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-100 focus:outline-none leading-relaxed"
                placeholder="Search Username" required="" />
            </div>
          </form>
          <div className="flex gap-5 items-center justify-center">
            <label htmlFor="workouts" className="  text-base font-medium text-gray-600 ">Workout Filter:</label>
            <select onChange={(e) => handleFilter(e?.target?.value)} id="countries"
              className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 min-w-14 focus:outline-none">

              <option value="clear">Clear Filter</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="swimming">Swimming</option>
              <option value="yoga">Yoga</option>
            </select>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 text-lg text-blue-400 py-2 border-r border-gray-300">Sr. No.</th>
                  <th className="px-4 text-lg text-blue-400 py-2 border-r border-gray-300">User Name</th>
                  <th className="px-4 text-lg text-blue-400 py-2 border-r border-gray-300">Workout Type</th>
                  <th className="px-4 text-lg text-blue-400 py-2 border-r border-gray-300"> Workout Time</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentItems?.map((user, index) => (
                  <tr key={user?.username} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2  text-center">{user.username}</td>
                    <td className="px-4 py-2  text-center">{user.workout}</td>
                    <td className="px-4 py-2  text-center">{user.time}</td>

                  </tr>
                ))}




              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1 border rounded ${pageNumber === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:bg-blue-100'
                }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
