import { useEffect, useState } from "react";
import "./App.css";
import TableHeading from "./components/TableHeading";
import TableRows from "./components/TableRows";
import { User } from "./types";
import NoRows from "./components/NoRows";
import { useDeleteUser } from "./apis/user-apis";
import { Button } from "./components/ui/button";
import { useSendEmail } from "./apis/send-email";
import LoaderSpin from "./components/LoaderSpin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // custom hook for sending email;
  const { sendEmail, loading: emailLoading } = useSendEmail(selectedUsers);

  const { deleteUserRequest } = useDeleteUser();
  // fetch users from database;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/all`);
        if (!response.ok) {
          throw new Error("Unable to fetch users");
        }

        const data = await response.json();
        if (data.users.length !== 0) {
          setUsers(data?.users);
        }
      } catch (error) {
        console.log(`ERROR-WHILE-FETCHING-USERS,${error}`);
      }
    };

    fetchUsers();
  }, []);

  const deleteRowHanlder: any = async (userId: string) => {
    await deleteUserRequest(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const lastIndex = users?.length - 1; //counting lastIndex for the Add new button;

  return (
    <div className="min-h-screen flex flex-col items-center space-y-4">
      <h2 className="text-5xl font-semibold mt-2 ">CRUD</h2>

      {/* table component */}

      <div className="md:min-w-[1200px] p-4 space-y-2 flex flex-col">
        {/* table heading */}
        <div className="flex items-center gap-x-4">
          <TableHeading />
          {selectedUsers.length !== 0 &&
            (emailLoading ? (
              <LoaderSpin
                text="Sending"
                className="bg-pink-500 hover:bg-pink-500/85 cursor-not-allowed"
              />
            ) : (
              <Button
                onClick={sendEmail}
                className="bg-pink-500 hover:bg-pink-500/85"
              >
                Send mail
              </Button>
            ))}
        </div>

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
          <NoRows setUsers={setUsers} />
        ) : (
          users.map((user, index) => (
            <TableRows
              key={user._id}
              user={user}
              index={index}
              deleteRow={deleteRowHanlder}
              lastIndex={lastIndex}
              setUsers={setUsers}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
