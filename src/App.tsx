import React from "react";
import {
  ChefHat,
  Truck,
  TrendingUp,
  Users,
  CheckCircle,
  Mail,
  MapPin,
  Instagram,
} from "lucide-react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // 👈 adjust this path to match your project

import WaitlistForm from "./components/WaitlistForm";
import { meals } from "./data/meals";

// Root component rendering the landing page.  This implementation is a
// simplified adaptation of the original SpiceBox landing page.  It uses
// Tailwind CSS for styling and the lucide-react icon set for icons.

// Smooth scroll helper to navigate to sections of the page.
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function App() {
  return (
    <div className="bg-white text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                SpiceBox
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("meals")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Our Meals
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("signup")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-orange-50 to-red-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Healthy Indian Meals.
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {" "}
                Delivered Fresh.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Lose weight without sacrificing the authentic Indian flavors you
              love. Fresh, nutritious meals crafted by expert chefs and
              delivered daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => scrollToSection("signup")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Join the Waitlist
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                See How It Works
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No contracts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>100% satisfaction</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&h=1000"
              alt="Delicious Indian meals"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Fresh & Hot
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                SpiceBox
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personalised meal planning to doorstep delivery, we make
              healthy eating simple and delicious.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-orange-100 rounded-3xl p-8 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                  01
                </div>
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  <Users className="w-10 h-10 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tell Us About You
              </h3>
              <p className="text-gray-600">
                Quick assessment and dietary preferences to create your
                personalised plan.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-100 rounded-3xl p-8 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                  02
                </div>
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  <ChefHat className="w-10 h-10 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Meals Crafted Daily
              </h3>
              <p className="text-gray-600">
                Traditional recipes reimagined with modern nutrition science.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-100 rounded-3xl p-8 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                  03
                </div>
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  <Truck className="w-10 h-10 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Delivered Fresh
              </h3>
              <p className="text-gray-600">
                Insulated packaging keeps meals fresh with flexible delivery
                schedules.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-100 rounded-3xl p-8 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                  04
                </div>
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  <TrendingUp className="w-10 h-10 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your journey with nutrition support and see real
                results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Meals Section */}
      <section
        id="meals"
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Delicious
              </span>{" "}
              Meals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Authentic Indian flavours crafted by expert chefs using
              traditional recipes and the finest spices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {meals.slice(0, 6).map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {meal.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-700">
                      {Math.round(meal.kj / 4.184)} cal
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {meal.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-orange-600">
                        {meal.protein}g
                      </div>
                      <div className="text-xs text-gray-500">Protein</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-orange-600">
                        {meal.carbs}g
                      </div>
                      <div className="text-xs text-gray-500">Carbs</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-orange-600">
                        {meal.fat}g
                      </div>
                      <div className="text-xs text-gray-500">Fat</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium capitalize"
                      >
                        {tag.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => scrollToSection("signup")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
            >
              Join Waitlist to Access All Meals
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                SpiceBox?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional Indian cooking with modern nutrition
              science to deliver meals that are both delicious and healthy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-6xl mb-6">🍛</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Authentic Flavours
              </h3>
              <p className="text-gray-600">
                Traditional recipes with a healthy twist, using aromatic spices
                and fresh ingredients.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-6xl mb-6">⚖️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Helps With Weight Loss
              </h3>
              <p className="text-gray-600">
                Scientifically planned meals to help you lose weight while
                enjoying delicious food.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-6xl mb-6">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Fresh Delivery
              </h3>
              <p className="text-gray-600">
                Meals prepared fresh every morning and delivered to your door.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Personalised Plans
              </h3>
              <p className="text-gray-600">
                Every meal plan is customised based on your specific goals and
                preferences.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-6xl mb-6">👨‍🍳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Chef-Prepared Meals
              </h3>
              <p className="text-gray-600">
                Our expert chefs prepare every meal using traditional techniques
                and the finest ingredients.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-6xl mb-6">💯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                No Preservatives
              </h3>
              <p className="text-gray-600">
                Pure, natural ingredients with no artificial preservatives or
                additives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Customers
              </span>{" "}
              Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real people who transformed their health with
              SpiceBox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Lost 8kg in 12 weeks! Finally found Indian food that helps me
                  lose weight instead of gaining it."
                </p>
                <div>
                  <p className="font-bold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Melbourne • Jan 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The flavours are incredible. I don't feel like I'm on a diet
                  at all. Down 12kg and counting!"
                </p>
                <div>
                  <p className="font-bold text-gray-900">Raj Patel</p>
                  <p className="text-sm text-gray-500">Melbourne • Feb 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <Star className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "SpiceBox changed my relationship with food. Healthy Indian
                  meals that actually taste amazing."
                </p>
                <div>
                  <p className="font-bold text-gray-900">Abdul Rahman</p>
                  <p className="text-sm text-gray-500">Melbourne • Mar 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Section */}
      <section
        id="signup"
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join the{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                SpiceBox
              </span>{" "}
              Waitlist
            </h2>
            <p className="text-xl text-gray-600">
              Be the first to know when we launch and get exclusive early access
              offers.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  SpiceBox
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Authentic Indian meals, scientifically crafted for weight loss.
                Fresh ingredients, traditional spices, modern nutrition.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/spiceboxau/"
                  className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("meals")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Our Meals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("benefits")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Benefits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("signup")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Join Waitlist
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>admin@myspicebox.com.au</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Melbourne, Australia</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} SpiceBox. All rights reserved. Made
              with ❤️ in Melbourne.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
