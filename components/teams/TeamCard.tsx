'use client'

import { TeamMember } from '@/lib/type'
import Image from 'next/image'

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
      {member.avatarUrl && (
        <Image
          src={member.avatarUrl}
          alt={`${member.name}'s avatar`}
          width={80}
          height={80}
          className="rounded-full mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-gray-600">{member.role}</p>
      {member.bio && <p className="mt-2 text-sm">{member.bio}</p>}
      {member.languages && (
        <p className="mt-1 text-xs text-gray-500">
          🌍 Speaks: {member.languages.join(', ')}
        </p>
      )}
    </div>
  )
}
