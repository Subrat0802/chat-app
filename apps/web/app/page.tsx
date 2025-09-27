"use client";

import { 
  MessageCircle, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Star,
  ArrowRight,
  Menu,
  X,
  Check
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="relative z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ChatFlow
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">Reviews</a>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">Reviews</a>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-full">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Connect. Chat. Collaborate.
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of communication with our lightning-fast, secure chat platform designed for teams and individuals who value seamless conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <span>Start Chatting Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition-all duration-200">
                Watch Demo
              </button>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-400">ChatFlow - Live Demo</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">A</div>
                      <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hey team! Just finished the new feature 🎉</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Awesome work! Can't wait to test it out 🚀</p>
                      </div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">B</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose ChatFlow?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technology to deliver the best chat experience possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors duration-300">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-300 leading-relaxed">
                Messages delivered in milliseconds with our optimized infrastructure and real-time synchronization.
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors duration-300">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bank-Grade Security</h3>
              <p className="text-gray-300 leading-relaxed">
                End-to-end encryption ensures your conversations remain private and secure at all times.
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600/30 transition-colors duration-300">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Team Collaboration</h3>
              <p className="text-gray-300 leading-relaxed">
                Powerful tools for teams including channels, file sharing, and integrated voice calls.
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-orange-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600/30 transition-colors duration-300">
                <Globe className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with anyone, anywhere in the world with our globally distributed servers.
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-pink-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-600/30 transition-colors duration-300">
                <MessageCircle className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rich Messaging</h3>
              <p className="text-gray-300 leading-relaxed">
                Express yourself with emojis, GIFs, file attachments, and rich text formatting.
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-cyan-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-600/30 transition-colors duration-300">
                <Star className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Features</h3>
              <p className="text-gray-300 leading-relaxed">
                AI-powered suggestions, smart notifications, and customizable themes for the perfect experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what our users are saying about their ChatFlow experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "ChatFlow has revolutionized how our team communicates. The interface is intuitive and the features are exactly what we needed."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-400">Product Manager at TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The security features give us peace of mind, and the performance is outstanding. Highly recommended!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-400">CTO at StartupXYZ</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Switched from other platforms and never looked back. ChatFlow just works better in every way."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center font-bold">
                  E
                </div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-gray-400">Design Lead at CreativeStudio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Up to 10 team members</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Basic messaging</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>File sharing (1GB)</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition-colors duration-200">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-b from-blue-900/50 to-purple-900/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$15</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Advanced messaging</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>File sharing (100GB)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Voice & video calls</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 font-medium">
                Start Free Trial
              </button>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$50</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Advanced security</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Unlimited storage</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>24/7 priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Custom branding</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition-colors duration-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of teams already using ChatFlow to collaborate better, faster, and more securely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-lg font-semibold text-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
              <span>Start Your Free Trial</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <p className="text-sm text-gray-400">No credit card required • Free 14-day trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ChatFlow
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The future of team communication, designed for modern workflows.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 ChatFlow. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}