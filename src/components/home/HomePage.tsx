import { Link } from "react-router-dom";
import { useGetAllDrs } from "../../hooks/useDrs";

type Dr = {
  _id: string;
  name: string;
  designation: string;
};

type DrsArray = Dr[];

const HomePage = () => {
  const { data: DrsList } = useGetAllDrs();
  const drsArray = DrsList as DrsArray;
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/addnewdr">Add New Doctor</Link>
      {/* <p>{JSON.stringify(DrsArray)}</p> */}
      <ul>
        {drsArray?.map((dr: Dr) => (
          <li key={dr._id}>{dr.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
