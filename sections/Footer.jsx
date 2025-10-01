// Footer.jsx
import { MessageCircle, Send, ThumbsUp } from "lucide-react";

export default function Footer() {
//   const annuPhoneNumber = "916282284042"; // IMPORTANT: Replace with Annu's actual WhatsApp number
//   const annuInstagramUsername = "annu.bee"; // IMPORTANT: Replace with Annu's Instagram username

  const prefilledMessage = "Happy Birthday Annu! Wishing you a day filled with love, joy, and all your favorite things. Here's to another year of amazing memories together!";

  return (
    <section className="bg-stone-100 py-20 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
    

        
        <div className="text-center md:text-left p-8 bg-rose-50 rounded-2xl shadow-sm border border-rose-200">
           <div className="inline-flex items-center space-x-2 bg-rose-200 px-4 py-2 rounded-full mb-4">
            <Send className="w-5 h-5 text-rose-600" />
           
          </div>
          <h3 className="text-2xl font-bold text-rose-800 mb-2">
            Wish Annu a Happy Birthday!
          </h3>
          <br />
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href={`https://wa.me/6282284042?text=${encodeURIComponent(prefilledMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-stone-400 rounded-lg hover:bg-green-600 transition-colors"
            >
              Wish on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}