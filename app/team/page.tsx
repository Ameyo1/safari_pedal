import TeamCard from "@/components/teams/TeamCard"
import { TeamMember } from "@/lib/type"

const teamMembers: TeamMember[] = [
  {
    name: 'Ameyo',
    role: 'Lead Architect',
    bio: 'Designs multilingual, compliance-ready civic platforms.',
    avatarUrl: '/avatars/ameyo.png',
    languages: ['Swahili', 'French', 'English'],
  },
  {
    name: 'Kwame',
    role: 'Backend Engineer',
    bio: 'Implements audit-safe authentication and logging.',
    avatarUrl: '/avatars/kwame.png',
    languages: ['English'],
  },
  {
    name: 'Amina',
    role: 'UX Designer',
    bio: 'Empathetic communicator focused on accessibility.',
    avatarUrl: '/avatars/amina.png',
    languages: ['French', 'Swahili'],
  },
]

export default function TeamPage() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4 mt-16 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Meet the Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, idx) => (
          <TeamCard key={idx} member={member} />
        ))}
      </div>
    </main>
  )
}
