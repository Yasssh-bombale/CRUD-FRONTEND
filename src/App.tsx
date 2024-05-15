import { useState } from "react";
import "./App.css";
import TableHeading from "./components/TableHeading";
import TableRows from "./components/TableRows";
import { Users } from "./contants";
import { User } from "./types";
import NoRows from "./components/NoRows";

function App() {
  const [users, setUsers] = useState<User[]>(Users);

  const deleteRowHanlder: any = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const lastIndex = users?.length - 1; //counting lastIndex for the Add new button;

  return (
    <div className="min-h-screen flex flex-col items-center space-y-4">
      <h2 className="text-5xl font-semibold mt-2 ">CRUD</h2>

      {/* table component */}

      <div className="border-2 min-w-[1200px] p-4 space-y-2 flex flex-col">
        {/* table heading */}
        <TableHeading />

        {/* table content */}
        {/* {users.length !== 0 &&
          users.map((user, index) => (
            <TableRows
              key={user._id}
              user={user}
              index={index}
              deleteRow={deleteRowHanlder}
              lastIndex={lastIndex}
            />
          ))} */}
        {users.length === 0 ? (
          <NoRows />
        ) : (
          users.map((user, index) => (
            <TableRows
              key={user._id}
              user={user}
              index={index}
              deleteRow={deleteRowHanlder}
              lastIndex={lastIndex}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
