import { userFormSchemaObject } from "@/forms/UserForm";
import { User } from "@/types";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//createUser;
export const useCreateUser = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const createUserRequest = async (formData: userFormSchemaObject) => {
    try {
      setLoading(true);
      const resposne = await fetch(`${API_BASE_URL}/api/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!resposne.ok) {
        throw new Error("Unable to create user");
      }

      const data = await resposne.json();
      if (data.user) {
        setUsers((prevUsers) => [...prevUsers, data.user]); //setter for frontend;
      }
    } catch (error) {
      console.log(`ERROR IN CREATE-USER-HOOK,${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { createUserRequest, loading };
};

//updateUser;
export const useUpdateUser = () => {
  const updateUserRequest = async (userId: string, formData: any) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update user");
      }

      const data = await response.json();
      if (data.user) {
        console.log(data.user);
      }
    } catch (error) {
      console.log(`ERROR:IN UPDATE-USER-REQUEST,${error}`);
    }
  };

  return { updateUserRequest };
};

//deleteUser;
export const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const deleteUserRequest = async (userId: String) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/delete/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error while deleting user request");
      }
    } catch (error) {
      console.log(`ERROR-IN-DELETE-USER-REQUEST,${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteUserRequest, loading };
};
