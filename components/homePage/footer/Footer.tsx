import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Safari With Us</h3>
          <p className="text-md">
            Ethical journeys across East Africa, designed with local insight and global care.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Explore</h4>
          <ul className="space-y-1 text-md">
            <li><Link href="/tours" className="hover:text-white">Tours</Link></li>
            <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contacts" className="hover:text-white">Contact</Link></li>
            <li><Link href="/faqs" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Connect</h4>
          <ul className="space-y-1 text-md">
            <li><Link href="https://instagram.com" target="_blank" className="hover:text-white">Instagram</Link></li>
            <li><Link href="https://facebook.com" target="_blank" className="hover:text-white">Facebook</Link></li>
            <li><Link href="https://twitter.com" target="_blank" className="hover:text-white">Twitter</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/participate/waiver" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="/participate/policies" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Safari With Us. Built with care in East Africa.
      </div>
    </footer>
  );
}
