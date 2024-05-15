import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  userName: z.string({
    required_error: "Username is required",
  }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, "Invalid number")
    .max(10, "Invalid number"),
  email: z.string({
    required_error: "Email is required",
  }),
  hobbies: z.string({
    required_error: "Hobbies are required",
  }),
});

export type userFormSchemaObject = z.infer<typeof formSchema>;

const UserForm = () => {
  const form = useForm<userFormSchemaObject>({
    resolver: zodResolver(formSchema),
  });

  const onSave = (formData: userFormSchemaObject) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-2 flex flex-col"
      >
        {/* username */}
        <FormField
          name="userName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Enter username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* phoneNumber */}
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Enter username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Enter username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* hobbies */}
        <FormField
          name="hobbies"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobbies</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
};

export default UserForm;
