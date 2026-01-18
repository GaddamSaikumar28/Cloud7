import React from 'react';

const QuoteCard = () => (
  <div className="bg-gradient-to-b from-white/10 to-transparent p-6 rounded-2xl border border-white/5 backdrop-blur-sm min-w-[300px]">
    <div className="text-4xl text-white/20 font-serif mb-4">“</div>
    <p className="text-slate-400 text-sm leading-relaxed mb-6">
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
    </p>
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
        <div>
            <p className="text-white text-xs font-medium">Jason</p>
            <p className="text-slate-500 text-[10px] uppercase">Customer</p>
        </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="flex gap-6 animate-float px-6 overflow-x-auto pb-8 snap-x">
         {[1, 2, 3, 4].map((i) => (
             <QuoteCard key={i} />
         ))}
      </div>
       {/* Simple pagination dots */}
       <div className="flex justify-center gap-2 mt-4">
           <div className="w-2 h-2 rounded-full bg-white"></div>
           <div className="w-2 h-2 rounded-full bg-slate-700"></div>
           <div className="w-2 h-2 rounded-full bg-slate-700"></div>
       </div>
    </section>
  );
};

export default Testimonials;