import { Button } from '@/components/ui/button';
import { CrossCircledIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [view, setView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (view) {
      if (ref) {
        ref.current?.classList.remove('hidden')
      }
    } else {
      setTimeout(() => {
        if (ref) {
          ref.current?.classList.add('hidden')
        }
      }, 300);
    }
  }, [view])

  return (
    <div className='w-full flex justify-between items-center py-5 relative'>
      <h1 className='font-bold text-lg flex items-center gap-2'>
        <button onClick={() => setView(!view)} className='lg:hidden block'>
          {view ? (
            <CrossCircledIcon width={20} height={20} />
          ) : (
            <HamburgerMenuIcon width={20} height={20} />
          )}
        </button>
        <Link href={'/'}>E-Shop DBIX</Link>
      </h1>


      <div className={`lg:hidden flex lg:flex-row flex-col lg:items-center gap-5 absolute lg:static top-16 lg:h-full ${view ? 'h-screen opacity-100' : 'h-0 opacity-0'} transition-all duration-300 bg-white lg:w-fit w-full pt-3`} ref={ref}>
        <Link href={'/'} className='font-medium hover:opacity-80'>Home</Link>
        <Link href={'/#about'} className='font-medium hover:opacity-80'>About</Link>
        <Link href={'/#products'} className='font-medium hover:opacity-80'>Products</Link>
      </div>
      <div className='flex items-center gap-5'>
        <div className='lg:inline-flex hidden items-center gap-5'>
          <Link href={'/'} className='font-medium hover:opacity-80'>Home</Link>
          <Link href={'/#about'} className='font-medium hover:opacity-80'>About</Link>
          <Link href={'/#products'} className='font-medium hover:opacity-80'>Products</Link>
        </div>
        <Link href={'/#about'}><Button size={'sm'}>Login or Signup</Button></Link>
      </div>
    </div>
  );
};

export default Navbar;