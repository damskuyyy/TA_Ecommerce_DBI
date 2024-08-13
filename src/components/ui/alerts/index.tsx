import React from 'react';
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

const Alerts = ({ ok, desc, btn }: { ok: () => void, desc: string, btn: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>
        <Button variant={"destructive"} size={'sm'} className="w-full font-bold">
          {btn}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='lg:max-w-lg md:max-w-md max-w-sm mx-auto w-full rounded-xl'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={ok}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alerts;