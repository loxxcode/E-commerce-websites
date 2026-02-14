"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal} from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
     } from "@/components/ui/form";
import * as z from "zod";

import {  useForm} from "react-hook-form";
import { Button } from "../ui/button";
import { useState } from "react";


const formSchema = z.object({
    name: z.string().min(1, "Store name is required").max(255),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), 
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }
    


 return (
    <Modal 
        title="Create Store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen} 
        onClose={storeModal.onClose }
    >

    <div>
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" render={({ field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <input placeholder="E-Commerce" {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                        )  }
                     />
                     <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button variant="outline" onClick={storeModal.onClose} >Cancel</Button>
                        <Button type="submit">Continue </Button>
                     </div>

                </form>
            </Form>
        </div>

    </div>
    </Modal>
 )
}