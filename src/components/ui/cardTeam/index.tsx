import { TeamDataType } from '@/types/teamDataTypes'
import React from 'react'

const CardTeam: React.FC<TeamDataType> = ({ name, email, imageUrl }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img className="w-full h-56 object-cover" src={imageUrl} alt={`${name}`} />
        <div className="p-4 ">
          <h2 className="text-lg font-semibold text-center">{name}</h2>
          <p className="text-sm text-gray-600 text-center">{email}</p>
        </div>
        </div>
  )
}

export default CardTeam
