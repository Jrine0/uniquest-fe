"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/uniquest.png" alt="Unique" className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="text-2xl font-bold text-gray-900">UniQuest</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Benefits
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              About Us
            </a>

            {!isSignedIn ? (
              <SignInButton
                mode="modal"
                afterSignInUrl="/dashboard"
                afterSignUpUrl="/dashboard"
              >
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                  Student / Staff Login
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                    Go to Dashboard
                  </button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              UniQuest: Your Smart Campus Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get instant, 24/7 answers to all your academic questions about
              admissions, fees, and scholarships, right here, in your preferred
              language.
            </p>
            {!isSignedIn ? (
              <SignInButton
                mode="modal"
                afterSignInUrl="/dashboard"
                afterSignUpUrl="/dashboard"
              >
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition shadow-lg">
                  Student / Staff Login
                </button>
              </SignInButton>
            ) : (
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition shadow-lg">
                  Go to Dashboard
                </button>
              </Link>
            )}
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-64 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-6xl">💬</span>
              </div>
              <p className="mt-4 text-gray-600">AI-Powered Campus Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multilingual Support</h3>
              <p className="text-gray-600">Communicate seamlessly in multiple languages to get the information you need without any language barriers.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice and Text Interaction</h3>
              <p className="text-gray-600">Ask your questions by typing or simply by speaking; our advanced NLP understands both voice and text inputs.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 AI-Powered Support</h3>
              <p className="text-gray-600">Our AI assistant is available around the clock to provide you with 24/7 support for all your queries.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">Stay informed with the latest news and real-time updates on admission timelines and other important announcements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Makes Us Unique</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Driven Personalised Recommendations</h3>
              <p className="text-gray-700">Discover the best-fit courses and colleges for you. Our AI provides suggestions based on admission cutoffs, your personal preferences, and career goals.</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3D Virtual Campus Tours</h3>
              <p className="text-gray-700">Explore potential campuses from the comfort of your home. Our 360° virtual tours allow you to see the campus without needing to visit in person.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section id="benefits" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Core Benefits</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Students</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Improved Access to Information</h4>
                  <p className="text-gray-600">No more searching through long PDFs or waiting in queues. Get verified answers instantly.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Enhanced User Experience</h4>
                  <p className="text-gray-600">Enjoy a smooth, modern, and conversational way to interact with your institution.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Administration</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Reduced Administrative Delays</h4>
                  <p className="text-gray-600">The chatbot handles multiple queries simultaneously, freeing up staff to focus on more complex tasks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Trust and Security</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-4">
              <div className="text-4xl flex-shrink-0">🔒</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Authentication</h3>
                <p className="text-gray-600">We protect your account and prevent spam using secure login methods, including JWT and Google-based OAuth.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-4xl flex-shrink-0">🛡️</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Privacy</h3>
                <p className="text-gray-600">We prioritize your data security by using strong Fernet encryption for all stored information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About UniQuest</h2>
          <div className="text-lg text-gray-600 space-y-6 text-left">
            <p>
              UniQuest was born out of a common challenge in educational institutions: administrative offices are overwhelmed by hundreds of repetitive student queries about fee deadlines, scholarships, and timetables. This often leads to long queues and communication gaps, especially for students who are more comfortable communicating in Hindi or other regional languages.
            </p>
            <p>
              To solve this, Team Snack Overflow developed UniQuest for the SMART INDIA HACKATHON 2024. It is an AI-powered Student Assistance Chatbot designed for the Department of Technical Education, Government of Rajasthan, with the goal of providing students with instant and reliable conversational guidance.
            </p>
            <p>
              Our mission is to bridge this information gap by providing equitable, round-the-clock information access in a user-friendly manner, supporting students in at least five regional languages in addition to English and Hindi.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                What is UniQuest?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                UniQuest is an AI-powered Student Assistance Chatbot created for the Department of Technical Education, Government of Rajasthan. Developed by Team Snack Overflow for the Smart India Hackathon 2024, its goal is to provide students with instant, reliable answers to common academic and administrative questions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                What kind of questions can I ask?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can ask about a wide range of topics, including repetitive queries about fee deadlines, scholarship forms, and timetables. The chatbot can also provide AI-driven personalized recommendations for courses and colleges based on your preferences, cutoffs, and career goals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Is this service available all the time?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes. The assistant is designed to provide AI-powered 24/7 support, so you can get the information you need at any time of the day.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Can I talk to it, or do I have to type?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can do both. UniQuest is built with Natural Language Processing (NLP) that understands both voice and text inputs, allowing you to communicate in the way that's most convenient for you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                What languages does the chatbot understand?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The chatbot offers extensive multilingual support. It is designed to understand and respond to queries in English, Hindi, and at least five other regional languages to ensure it is accessible to students from various linguistic backgrounds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                How is my information kept secure?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Your privacy and data security are a top priority. The platform uses secure authentication methods like JWT and Google-based OAuth to protect your account and employs strong Fernet encryption to safeguard all stored data.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                What happens if the chatbot can't answer my question?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                If the AI cannot resolve your query, the system includes a feature to escalate the conversation to a human agent through a "Contact Support" option.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">U</span>
                </div>
                <span className="text-xl font-bold">UniQuest</span>
              </div>
              <p className="text-gray-400">
                UniQuest is a project by Team Snack Overflow for the Smart India Hackathon 2024, designed for the Department of Technical Education, Government of Rajasthan.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Team UniQuest. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}