export default function WhyPedalWithUs() {
  const valueProps = [
    {
      title: 'Local Expertise',
      description: 'Our guides are born and raised in the regions they explore, offering unmatched insight and authenticity.',
      icon: '🌍',
    },
    {
      title: 'Conservation First',
      description: 'We partner with eco-reserves and community-led initiatives to protect wildlife and habitats.',
      icon: '🦁',
    },
    {
      title: 'Tailored Experiences',
      description: 'From luxury lodges to rugged treks, every safari is customized to your interests and comfort.',
      icon: '🎒',
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees. Just honest rates that support local economies and deliver real value.',
      icon: '💰',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Why Safari With Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map((prop) => (
          <div key={prop.title} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="text-4xl mb-4">{prop.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
            <p className="text-sm text-gray-700">{prop.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
