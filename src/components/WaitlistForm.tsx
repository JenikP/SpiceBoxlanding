import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema } from "@shared/schema";

// Extend schema for form-only fields
const formSchema = insertWaitlistSchema.extend({
  currentWeight: z.string().optional(),
  goalWeight: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  // ✅ Grab referral code from URL (?ref=xxxx)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setRefCode(ref);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      suburb: "",
      dietaryPreference: "",
      heardFrom: "",
      currentWeight: "",
      goalWeight: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { currentWeight, goalWeight, ...payload } = data;
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          referredBy: refCode, // 👈 send referral code to backend
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitted(true);
        reset();
      } else {
        alert(json.error ?? "Failed to join the waitlist");
      }
    } catch {
      alert("Network error. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-green-600">
          You're on the list!
        </h3>
        <p className="text-gray-700">
          Stay tuned for exclusive launch offers and updates.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
        >
          Join Another Friend
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            id="fullName"
            {...register('fullName')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="suburb" className="block text-sm font-semibold text-gray-700 mb-1">Suburb / Postcode</label>
        <input
          id="suburb"
          {...register('suburb')}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
          placeholder="Enter your suburb or postcode"
        />
        {errors.suburb && <p className="text-red-600 text-xs mt-1">{errors.suburb.message}</p>}
      </div>
      <div>
        <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-gray-700 mb-1">Dietary Preference</label>
        <select
          id="dietaryPreference"
          {...register('dietaryPreference')}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
        >
          <option value="">Select your preference</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non‑Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten‑Free</option>
          <option value="dairy-free">Dairy‑Free</option>
          <option value="no-preference">No Preference</option>
        </select>
        {errors.dietaryPreference && <p className="text-red-600 text-xs mt-1">{errors.dietaryPreference.message}</p>}
      </div>
      <div>
        <label htmlFor="heardFrom" className="block text-sm font-semibold text-gray-700 mb-1">Where did you hear about us?</label>
        <select
          id="heardFrom"
          {...register('heardFrom')}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
        >
          <option value="">Select how you heard about us</option>
          <option value="social-media">Social Media</option>
          <option value="friend-family">Friend/Family</option>
          <option value="google-search">Google Search</option>
          <option value="advertisement">Advertisement</option>
          <option value="health-blog">Health Blog</option>
          <option value="fitness-app">Fitness App</option>
          <option value="word-of-mouth">Word of Mouth</option>
          <option value="other">Other</option>
        </select>
        {errors.heardFrom && <p className="text-red-600 text-xs mt-1">{errors.heardFrom.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="currentWeight" className="block text-sm font-semibold text-gray-700 mb-1">Current Weight (kg)</label>
          <input
            id="currentWeight"
            type="number"
            {...register('currentWeight')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            placeholder="e.g. 75"
          />
        </div>
        <div>
          <label htmlFor="goalWeight" className="block text-sm font-semibold text-gray-700 mb-1">Goal Weight (kg)</label>
          <input
            id="goalWeight"
            type="number"
            {...register('goalWeight')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            placeholder="e.g. 65"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
      </button>
    </form>
  );
}
