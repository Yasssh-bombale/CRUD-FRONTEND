import UserForm from "@/forms/UserForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { User } from "@/types";

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const PopUpForm = ({ setUsers }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new user</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>

        {/* handling user form in <UserForm/> component */}
        <UserForm setUsers={setUsers} />
        <DialogClose asChild>
          <Button type="button">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpForm;
