export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-200 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        {/* Contact Info */}
        <div className="mb-8 space-y-4 text-gray-700">
          <p><strong>Email:</strong> info@pedalsafari.com</p>
          <p><strong>Phone:</strong> +256 712 345 678</p>
          <p><strong>Location:</strong> Kampala, Uganda</p>
        </div>

        {/* Contact Form */}
        <form
  action="https://formspree.io/f/xdkdjnjz"
  method="POST"
  className="space-y-6"
>
    <input type="text" name="_gotcha" style={{ display: 'none' }} />

  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      required
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-rose-200"
    />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      required
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-rose-200"
    />
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
    <textarea
      name="message"
      id="message"
      rows={4}
      required
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-rose-200"
    />
  </div>

  <button
    type="submit"
    className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600 transition"
  >
    Send Message
  </button>
</form>
      </div>
    </section>
  );
}
