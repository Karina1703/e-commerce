"use client";

import { useStoreModal } from "../../../hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
});

type useFormType = z.infer<typeof formSchema>;

export const StoreModal = () => {
  const store = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<useFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: useFormType) => {
    try {
      setLoading(true);
			const response = await axios.post("/api/store", values);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={store.isOpen}
      title="Create store"
      description="Add an online store to your account"
      onClose={() => store.onClose()}
    >
      <div className="space-y-4 py-2 pb-2">
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <div className="space-x-2 pt-6 flex items-center justify-end">
              <Button variant="outline" onClick={store.onClose}>
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
