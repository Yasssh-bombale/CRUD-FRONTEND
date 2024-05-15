import { useState } from "react";
import { Button } from "./ui/button";
import { Save, SquarePen, Trash2 } from "lucide-react";
import { EditableUser, User } from "@/types";

export type Props = {
  user: User;
  index: number;
  deleteRow: (id: string) => void;
  lastIndex: number;
};

const TableRows = ({ user, index, lastIndex, deleteRow }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>(user.userName);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber);
  const [email, setEmail] = useState<string>(user.email);
  const [hobbies, setHobbies] = useState<string>(user.hobbies);

  const [formData, setFormData] = useState<EditableUser>({
    email: "",
    hobbies: "",
    phoneNumber: "",
    userName: "",
  });

  const editHandler = (userId: String) => {
    setFormData({
      userName,
      email,
      phoneNumber,
      hobbies,
    });
    setIsEditable(false);
  };

  const deleteHanlder = (userId: string) => {
    deleteRow(userId);
  };

  return (
    <div className="flex items-center w-full border border-green-500 px-2">
      <div className="border flex p-2 items-center gap-x-16 flex-1">
        <div className="flex items-center gap-x-4">
          <input type="checkbox" className="w-4 h-4 cursor-pointer" />
          {/* make index+1 cause index starts from 0 and we do not want any row to be mark as row 0 */}
          <h1>{index + 1}</h1>
        </div>
        {/* <h1 className="w-52 truncate border">Yash bombale </h1> */}
        {/* username */}
        <input
          disabled={!isEditable}
          type="text"
          className={`${
            isEditable
              ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
              : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
          } w-48 truncate text-sm`}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {/* phone number */}
        <input
          type="number"
          disabled={!isEditable}
          className={`${
            isEditable
              ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
              : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
          } text-sm`}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {/* email */}
        <input
          disabled={!isEditable}
          type="email"
          className={`${
            isEditable
              ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
              : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
          } w-48 truncate text-sm`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* hobbies */}
        <textarea
          disabled={!isEditable}
          className={`${
            isEditable
              ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
              : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
          } w-48 break-words text-sm border`}
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />
      </div>
      {/* edit */}
      {isEditable ? (
        <Button
          onClick={() => editHandler(user._id)}
          className="mr-2 bg-green-500 hover:bg-green-500/87 flex-1 text-[16px]"
        >
          <Save className="mr-2" /> Save
        </Button>
      ) : (
        <div className="flex flex-1 justify-center">
          <Button
            onClick={() => setIsEditable(true)}
            className="mr-2 bg-green-500 hover:bg-green-500/87"
          >
            <SquarePen className="" />
          </Button>
          {/* delete */}
          <Button
            onClick={() => deleteHanlder(user._id)}
            variant={"destructive"}
            className="mr-2"
          >
            <Trash2 className="" />
          </Button>
          {/* add */}
          {index === lastIndex && <Button className="">Add new</Button>}
          {/* <Button className="">Add new</Button> */}
        </div>
      )}
    </div>

    // users.length !== 0 &&
    // users.map((user, index) => (
    //   <div
    //     key={index}
    //     className="flex items-center w-full border border-green-500 px-2"
    //   >
    //     <div className="border flex p-2 items-center gap-x-16 flex-1">
    //       <div className="flex items-center gap-x-4">
    //         <input type="checkbox" className="w-4 h-4 cursor-pointer" />
    //         {/* make index+1 cause index starts from 0 and we do not want any row to be mark as row 0 */}
    //         <h1>{index + 1}</h1>
    //       </div>
    //       {/* <h1 className="w-52 truncate border">Yash bombale </h1> */}
    //       {/* username */}
    //       <input
    //         disabled={!isEditable}
    //         type="text"
    //         className={`${
    //           isEditable
    //             ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
    //             : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
    //         } w-48 truncate text-sm`}
    //         value={user.userName}
    //       />
    //       {/* phone number */}
    //       <input
    //         type="number"
    //         disabled={!isEditable}
    //         className={`${
    //           isEditable
    //             ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
    //             : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
    //         } text-sm`}
    //         value={user.phoneNumber}
    //       />
    //       {/* email */}
    //       <input
    //         disabled={!isEditable}
    //         type="email"
    //         className={`${
    //           isEditable
    //             ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
    //             : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
    //         } w-48 truncate text-sm`}
    //         value={user.email}
    //       />
    //       {/* hobbies */}
    //       <textarea
    //         disabled={!isEditable}
    //         className={`${
    //           isEditable
    //             ? "bg-slate-100/80 text-center ring-2 ring-red-500 rounded-md p-2"
    //             : "bg-transparent border-none focus-visible:ring-transparent focus-visible:ring-0 text-center"
    //         } w-48 break-words text-sm border`}
    //         value={user.hobbies}
    //       />
    //     </div>
    //     {/* edit */}
    //     {isEditable ? (
    //       <Button className="mr-2 bg-green-500 hover:bg-green-500/87">
    //         Save
    //       </Button>
    //     ) : (
    //       <>
    //         <Button
    //           onClick={() => editHandler(user._id)}
    //           className="mr-2 bg-green-500 hover:bg-green-500/87"
    //         >
    //           <SquarePen className="" />
    //         </Button>
    //         {/* delete */}
    //         <Button variant={"destructive"} className="mr-2">
    //           <Trash2 className="" />
    //         </Button>
    //         {/* add */}
    //         <Button className="">Add new</Button>
    //       </>
    //     )}
    //   </div>
    // ))
  );
};

export default TableRows;
