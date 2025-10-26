import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Your Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A modern, responsive portfolio built with Next.js, TypeScript, and Tailwind CSS.
              Perfect for showcasing your work and skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="#projects">
                View Projects
              </Button>
              <Button variant="primary" size="lg" href="#contact">
                Get In Touch
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built with Modern Technologies
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                This boilerplate includes everything you need to get started with a professional portfolio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card title="Next.js 16">
                <p className="text-gray-600">
                  Latest version of Next.js with App Router, TypeScript support, and optimized performance.
                </p>
              </Card>
              
              <Card title="Tailwind CSS">
                <p className="text-gray-600">
                  Utility-first CSS framework for rapid UI development with beautiful, responsive designs.
                </p>
              </Card>
              
              <Card title="Static Export">
                <p className="text-gray-600">
                  Configured for static site generation, perfect for hosting on CDNs and static hosting platforms.
                </p>
              </Card>
              
              <Card title="TypeScript">
                <p className="text-gray-600">
                  Full TypeScript support for better development experience and code reliability.
                </p>
              </Card>
              
              <Card title="ESLint">
                <p className="text-gray-600">
                  Code linting and formatting to maintain consistent code quality across your project.
                </p>
              </Card>
              
              <Card title="Responsive Design">
                <p className="text-gray-600">
                  Mobile-first responsive design that looks great on all devices and screen sizes.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Customize this boilerplate to create your own unique portfolio. 
              All the setup is done, just add your content!
            </p>
            <Button variant="primary" size="lg" href="https://github.com">
              View on GitHub
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
