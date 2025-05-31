import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const CtaSection = () => {
  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Decode?
        </h2>
        <p className="text-xl text-purple-100 mb-10 leading-relaxed">
          Join our community and start understanding Gen Z slang today!
        </p>
        <Link to="/signup">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-50 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Button>
        </Link>

        {/* Decorative elements */}
        <div className="flex justify-center mt-12 gap-4">
          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
