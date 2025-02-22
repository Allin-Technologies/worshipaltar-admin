"use client";

import { Separator } from "@/components/ui/separator";
import { inviteAccount } from "@/actions/admin/accounts";
import { Account } from "@/schema/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = Account.pick({
  name: true,
  email: true,
  role: true,
});

export default function Page() {
  const [key, setKey] = useState(new Date().getTime());
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined as unknown as any,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await inviteAccount(values);

      if (!response.data) {
        toast.error(
          response?.message ||
            "An error occurred request could not be completed."
        );
        return;
      }

      form.reset();
      setKey(new Date().getTime());
      toast.success(response?.message || "User invited sucessfully.");
    } catch (error: any) {
      toast.error(
        error?.message || "An error occurred request could not be completed."
      );
    }
  }

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Invite User
        </h1>
      </div>

      <Separator />

      <div className='py-12'>
        <div className='max-w-md mx-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the full name of the user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='john@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the user's email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      key={key}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='admin'>Admin</SelectItem>
                        <SelectItem value='agent'>Agent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the role for the new user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='flex'>
                {form.formState.isSubmitting && (
                  <Loader2 className='animate-spin' />
                )}
                <span>Invite User</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
