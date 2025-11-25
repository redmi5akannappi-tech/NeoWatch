export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 text-gray-300 py-8">
      <div className="max-w-5xl mx-auto px-4">

        {/* CTA Section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Looking for more movies?</h2>
          <p className="text-gray-400 mt-1">
            Use the search bar above to discover thousands of films from TMDB!
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center gap-3">

          <p className="text-sm text-gray-500">
            Powered by <span className="text-blue-400 font-semibold">TMDB</span>
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 text-gray-400">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            © {new Date().getFullYear()} Movie Search. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
