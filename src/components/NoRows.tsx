import { User } from "@/types";
import PopUpForm from "./PopUpForm";

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const NoRows = ({ setUsers }: Props) => {
  return (
    <div>
      No users found ! create new one <PopUpForm setUsers={setUsers} />
    </div>
  );
};

export default NoRows;
