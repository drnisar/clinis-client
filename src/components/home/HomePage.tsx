import { Link } from "react-router-dom";
import { useGetAllDrs } from "../../hooks/useDrs";

const HomePage = () => {
  const { data: DrsArray } = useGetAllDrs();
  console.log(DrsArray);
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/addnewdr">Add New Doctor</Link>
      {/* <p>{JSON.stringify(DrsArray)}</p> */}
      <ul>
        {DrsArray?.map((dr) => (
          <li key={dr._id}>{dr.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
