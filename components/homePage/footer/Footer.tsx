export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Safari With Us</h3>
          <p className="text-sm">
            Ethical journeys across East Africa, designed with local insight and global care.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/tours" className="hover:text-white">Tours</a></li>
            <li><a href="/about-us" className="hover:text-white">About Us</a></li>
            <li><a href="/contacts" className="hover:text-white">Contact</a></li>
            <li><a href="/faqs" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Connect</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="https://instagram.com" target="_blank" className="hover:text-white">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" className="hover:text-white">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" className="hover:text-white">Twitter</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/participate/waiver" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/participate/policies" className="hover:text-white">Privacy Policy</a></li>
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
