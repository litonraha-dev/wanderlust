"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";

import { redirect } from "next/navigation";


const DeleteDestinationDialog = ({ id }: { id: string }) => {
    const handleDeleteDestination = async () => {
        await fetch(`${process.env.SERVER_URL}/destination/${id}`, {
            method: "DELETE",
        });
        redirect("/destinations");
    };
    return (
      

    <AlertDialog>
  <AlertDialogTrigger
    render={
      <Button variant="destructive">
        <Trash2 data-icon="inline-start" />
        Delete
      </Button>
    }
  />

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Are you absolutely sure?
      </AlertDialogTitle>

      <AlertDialogDescription>
        This action cannot be undone. This will permanently
        delete this destination.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction onClick={handleDeleteDestination}>
        Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}



export default DeleteDestinationDialog;