"use client";

import { useEffect, useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="min-h-screen bg-white text-gray-900 relative
               bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)]
               bg-[size:40px_40px]"
    >
      {/* Overlay gradient for softness */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white pointer-events-none" />

      {/* Header */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 
          flex justify-between items-center px-8 py-4 border
          bg-white/80 backdrop-blur-md transition-all duration-300
          ${scrolled
            ? "w-3/4 rounded-2xl shadow-lg top-4"
            : "w-full rounded-none shadow-none top-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center">
            <img
              src="/uniquest.png"
              alt="Unique"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="text-xl font-bold">UniQuest</span>
        </div>

        {/* Nav */}
<nav className="hidden md:flex gap-12 text-gray-700 font-medium relative">
  {["Features", "Benefits", "About", "FAQ"].map((item) => (
    <Link
      key={item}
      href={`#${item.toLowerCase()}`}
      className="relative group transition-colors"
    >
      {/* Purple Oval Glow */}
      <span
        className="absolute -top-2 left-1/2 -translate-x-1/2
        w-24 h-10 bg-purple-600 rounded-full opacity-0 scale-90
        group-hover:opacity-100 group-hover:scale-110
        transition-all duration-200 -z-10"
      ></span>

      {/* Text */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {item}
      </span>
    </Link>
  ))}
</nav>


        {/* Auth */}
        <div className="flex gap-3 items-center">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                Student / Staff Login
              </Button>
            </SignInButton>
          )}
        </div>
      </header>

      {/* Hero */}
<section className="relative px-8 py-8 pt-28 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left content with gradient */}
  <div className="w-full px-8 py-50 bg-gradient-to-r from-purple-300 to-white rounded-xl">
    <div className="max-w-xl">
      <h1 className="text-5xl font-extrabold leading-tight">
        UniQuest: Your <br /> Smart Campus Assistant
      </h1>
      <p className="mt-6 text-lg text-gray-600">
        Get instant, 24/7 answers to all your academic questions about
        admissions, fees, and scholarships, right here, in your preferred
        language.
      </p>
      {isSignedIn ? (
        <Link href="/dashboard">
          <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">
            Go to Dashboard
          </Button>
        </Link>
      ) : (
        <SignInButton mode="modal">
          <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">
            Get Started
          </Button>
        </SignInButton>
      )}
    </div>
  </div>

  {/* Right side: Ask Anything Card */}
  <div className="w-full max-w-md relative">
    <Card className="shadow-xl">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-full h-48 bg-gray-100 rounded-xl flex flex-col p-4">
          <p className="text-sm bg-purple-200 text-purple-800 rounded-lg p-2 self-start">
            Fee deadline kab hai?
          </p>
          <p className="text-sm bg-white border rounded-lg p-2 self-end mt-2">
            The last date for the submission is October 7th.
          </p>
          <p className="text-sm bg-purple-200 text-purple-800 rounded-lg p-2 self-start mt-2">
            स्कॉलरशिप फॉर्म कुठे मिळेल?
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Ask anything, in any language.
        </p>
      </CardContent>
    </Card>
  </div>
</section>

      {/* Trusted Logos */}
      <section
        className="px-8 py-10 border-y relative"
        style={{
          background: "linear-gradient(to bottom right, #FF9933, #FFFFFF, #138808)",
        }}
      >
        <p className="text-center font-medium mb-6 text-[#000080]">
          A Smart India Hackathon 2025 project for:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 font-semibold">
          <span className="text-[#FF9933]">SMART INDIA HACKATHON</span>
          <span className="text-[#000080]">|</span>
          <span className="text-[#138808]">
            Department of Technical Education, Rajasthan
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 grid md:grid-cols-3 gap-10 relative">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">
              Speak Your Language
            </h3>
            <p className="text-gray-600">
              Communicate seamlessly in multiple languages, using your voice or
              text.
            </p>
            <ul className="mt-4 space-y-2 text-purple-600 font-medium">
              <li>✓ Multilingual Support (5+ Languages)</li>
              <li>✓ Voice & Text Recognition</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">
              Always Available, Always Updated
            </h3>
            <p className="text-gray-600">
              Get round-the-clock support and stay informed with the latest
              announcements.
            </p>
            <ul className="mt-4 space-y-2 text-purple-600 font-medium">
              <li>✓ 24/7 AI-Powered Support</li>
              <li>✓ Real-Time Updates</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">
              Personalized Guidance
            </h3>
            <p className="text-gray-600">
              Discover courses and colleges that match your career goals and
              preferences.
            </p>
            <ul className="mt-4 space-y-2 text-purple-600 font-medium">
              <li>✓ AI-Driven Recommendations</li>
              <li>✓ Based on Cutoffs & Goals</li>
            </ul>
          </CardContent>
        </Card>
      </section>

       {/* About Section */}
      <section
        id="about"
        className="px-8 py-20 bg-gray-50 relative"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              About UniQuest
            </h2>
            <p className="max-w-xl text-gray-600">
              Developed for the Smart India Hackathon 2024, UniQuest solves the
              challenge of overwhelmed administrative offices by providing students
              with instant, conversational guidance. Our mission is to bridge the
              information gap with an equitable, 24/7 AI assistant that supports
              multiple regional languages.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/uniquest.png"
              alt="UniQuest"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="px-8 py-20 grid md:grid-cols-3 gap-10 relative">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold">For Students</h3>
            <p className="mt-2 text-2xl font-extrabold text-purple-600">
              Instant Answers
            </p>
            <p className="text-gray-500">
              No more waiting in queues or searching through PDFs. Get verified information immediately.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold">For Administration</h3>
            <p className="mt-2 text-2xl font-extrabold text-purple-600">
              Reduced Workload
            </p>
            <p className="text-gray-500">
              Automate responses to repetitive queries, freeing up staff for more complex tasks.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold">For Everyone</h3>
            <p className="mt-2 text-2xl font-extrabold text-purple-600">
              Secure & Accessible
            </p>
            <p className="text-gray-500">
              Enjoy a secure, encrypted, and user-friendly experience on any device.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-8 py-20 relative max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is UniQuest?</AccordionTrigger>
            <AccordionContent>
              UniQuest is an AI-powered Student Assistance Chatbot designed to provide students with instant, reliable answers to common academic and administrative questions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What languages does the chatbot understand?</AccordionTrigger>
            <AccordionContent>
              The chatbot offers extensive multilingual support, designed to understand and respond to queries in English, Hindi, and at least five other regional languages.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How is my information kept secure?</AccordionTrigger>
            <AccordionContent>
             Your privacy is a top priority. The platform uses secure authentication methods like JWT and Google-based OAuth and employs strong Fernet encryption to safeguard all stored data.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What happens if the chatbot can't answer my question?</AccordionTrigger>
            <AccordionContent>
              If the AI cannot resolve your query, the system includes a feature to escalate the conversation to a human agent through a "Contact Support" option.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t bg-white relative">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/uniquest.png" alt="Unique" className="w-full h-full object-cover rounded-lg" />
            </div>
              <span className="text-xl font-bold">UniQuest</span>
            </div>
            <p className="text-[#000080] max-w-sm">A project by Team BugRock for the Smart India Hackathon 2025.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-gray-600">
            <div>
              <h4 className="font-bold mb-2">Features</h4>
              <ul className="space-y-1">
                <li>Multilingual Support</li>
                <li>24/7 AI Assistance</li>
                <li>Voice & Text Input</li>
                <li>Personalized Guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Support</h4>
              <ul className="space-y-1">
                <li>Contact Support</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Legal</h4>
              <ul className="space-y-1">
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-10">
          © 2025 Team BugRock • All rights reserved
        </div>
      </footer>
    </main>
  );
}

