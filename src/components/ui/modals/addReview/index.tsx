import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../../button';
import ReactEditor from '../../reactEditor';



const ModalAddReview = () => {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    console.log(content)
  }

  return (
    <Drawer onClose={() => setContent('')}>
      <DrawerTrigger>
        <Button size={'sm'} className='mt-2'>Add review</Button>
      </DrawerTrigger>
      <DrawerContent className='max-w-screen-xl mx-auto w-full'>
        <DrawerHeader>
          <DrawerTitle>Add a review</DrawerTitle>
          <DrawerDescription>Please fill this form to complete a review</DrawerDescription>
        </DrawerHeader>
        <div className='p-3'>
          <ReactEditor setValue={setContent} value={content} placeholder='Type a review here, you can add a images!'/>
        </div>
        <DrawerFooter className='flex items-end gap-3 w-full flex-row justify-end'>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={handleSubmit}>Submit</Button>
        </DrawerFooter>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </DrawerContent>
    </Drawer>

  );
};

export default ModalAddReview;