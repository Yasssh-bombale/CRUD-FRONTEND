import { User } from "@/types";
import { useState } from "react";
// import emailjs from "@emailjs/browser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSendEmail = (selectedUsers: User[]) => {
  const [loading, setLoading] = useState<boolean>(false);

  let filteredUsersData;
  if (selectedUsers.length !== 0) {
    filteredUsersData = selectedUsers.map((user: User) => {
      let { _id, createdAt, updatedAt, __v, ...rest } = user;
      return rest;
    });
  }

  const formData = {
    filteredUsersData,
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/user/send/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Could not send email");
      }

      console.log("email sent");
    } catch (error) {
      console.log(`ERROR:IN-SEND-EMAIL,${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading };
};
