import CardStats from '@/components/ui/cardStats'
import React from 'react'

const Stats = () => {
  return (
    <div className='flex gap-[50px] justify-center py-[35px] bg-black  px-[222px]'>
      <CardStats title='Klien' value='20+'/>
      <CardStats title='Proyek Sukses' value='20+'/>
      <CardStats title='Tenaga Ahli' value='20+'/>
    </div>
  )
}

export default Stats
