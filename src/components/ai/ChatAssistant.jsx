// // // import { GoogleGenerativeAI } from "@google/generative-ai";
// // // import ChatBot from "react-chatbotify";

// // // const ChatAssistant = ({ allProducts }) => {
// // //   // Initialize Gemini
// // //   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

// // //   // Convert your product list into a readable text format for the AI
// // //   const catalogContext = allProducts.map(p => (
// // //     `Product: ${p.name} | Category: ${p.category} | Price: $${p.price} | Description: ${p.description}`
// // //   )).join("\n");

// // //   const flow = {
// // //     start: {
// // //       message: "👋 Hi! I'm the Cloud 7 Assistant. I can help you find the right 7-OH product or answer questions about your order. What's on your mind?",
// // //       path: "loop"
// // //     },
// // //     loop: {
// // //       message: async (params) => {
// // //         try {
// // //           const model = genAI.getGenerativeModel({ 
// // //             model: "gemini-2.0-flash", // Using the fast 2026 stable model
// // //             systemInstruction: `
// // //               You are the Cloud 7 Shop Expert. 
              
// // //               YOUR CATALOG:
// // //               ${catalogContext}

// // //               YOUR RULES:
// // //               1. ONLY answer questions based on the catalog above. 
// // //               2. If a product isn't listed, politely say we don't carry it.
// // //               3. TONE: Professional, minimalist, and premium.
// // //               4. SHIPPING: Same-day shipping if ordered before 2 PM.
// // //               5. SAFETY: Never give medical advice. If asked about dosage, refer them to the product label.
// // //               6. KEYWORDS: If they ask for "strongest", recommend the tablets. If they ask for "fastest acting", recommend the shots.
// // //             `
// // //           });

// // //           const result = await model.generateContent(params.userInput);
// // //           return result.response.text();
// // //         } catch (error) {
// // //           console.error("Chat Error:", error);
// // //           return "I'm having a quick sync issue. Feel free to ask again in a moment!";
// // //         }
// // //       },
// // //       path: "loop"
// // //     }
// // //   };

// // //   // Modern Purple Theme to match Cloud 7 branding
// // //   const settings = {
// // //     general: {
// // //       primaryColor: "#8B5CF6",
// // //       secondaryColor: "#7C3AED",
// // //       fontFamily: "Inter, sans-serif",
// // //     },
// // //     header: {
// // //       title: "Cloud 7 Support",
// // //       showAvatar: true,
// // //       avatar: "☁️"
// // //     },
// // //     chatButton: {
// // //       backgroundColor: "#8B5CF6",
// // //     },
// // //     tooltip: {
// // //       mode: "START",
// // //       text: "Expert Help Available ✨"
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed bottom-6 right-6 z-[9999]">
// // //       <ChatBot options={settings} flow={flow} />
// // //     </div>
// // //   );
// // // };

// // // export default ChatAssistant;

// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import ChatBot from "react-chatbotify";
// // import { useMemo } from "react";

// // const ChatAssistant = ({ allProducts }) => {
// //   // Use useMemo to prevent re-stringifying the catalog on every render
// //   const catalogContext = useMemo(() => {
// //     return allProducts.map(p => (
// //       `- ${p.name}: ${p.description.substring(0, 100)}... ($${p.price})`
// //     )).join("\n");
// //   }, [allProducts]);

// //   const flow = {
// //     start: {
// //       message: "👋 Welcome to Cloud 7! How can I help you today?",
// //       path: "loop"
// //     },
// //     loop: {
// //       message: async (params) => {
// //         try {
// //           const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
// //           // 1. We use a more concise instruction to save tokens
// //           const model = genAI.getGenerativeModel({ 
// //             model: "gemini-2.0-flash",
// //             systemInstruction: `You are the Cloud 7 assistant. Use this catalog:\n${catalogContext}\nRules: Be brief. No medical advice. Same-day shipping before 2PM.`
// //           });

// //           const result = await model.generateContent(params.userInput);
// //           return result.response.text();
// //         } catch (error) {
// //           console.error("Chat Quota Error:", error);
          
// //           // 2. Intelligent Fallback: If 429 occurs, provide a static helpful response
// //           if (error.message?.includes("429")) {
// //             return "I'm currently handling a lot of requests! ☁️ Generally, we offer 15mg 7-OH tablets and nano-shots with same-day shipping. Is there something specific I can find for you?";
// //           }
// //           return "I'm having a quick sync issue. Please try your question again!";
// //         }
// //       },
// //       path: "loop"
// //     }
// //   };

// //   const settings = {
// //     general: { primaryColor: "#8B5CF6", fontFamily: "Inter, sans-serif" },
// //     header: { title: "Cloud 7 Support", avatar: "☁️" },
// //     chatButton: { backgroundColor: "#8B5CF6" },
// //     // 3. Add a delay between messages to prevent rapid-fire quota hits
// //     botBubble: { simTypeDelay: 500 }
// //   };

// //   return (
// //     <div className="fixed bottom-6 right-6 z-[9999]">
// //       <ChatBot options={settings} flow={flow} />
// //     </div>
// //   );
// // };

// // export default ChatAssistant;
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ChatBot from "react-chatbotify";

// const ChatAssistant = ({ allProducts }) => {
//   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

//   // Minified catalog to keep token count extremely low
//   const shortCatalog = allProducts.map(p => `${p.name}($${p.price})`).join(", ");

//   const flow = {
//     start: {
//       message: "👋 Cloud 7 Support here. How can I help you today?",
//       path: "loop"
//     },
//     loop: {
//       message: async (params) => {
//         const userInput = params.userInput.toLowerCase();
        
//         // 1. MANUAL FALLBACK (Zero Token Usage)
//         // If the AI is down or quota is hit, these will still work!
//         if (userInput.includes("shipping")) return "We offer same-day shipping on orders placed before 2 PM EST!";
//         if (userInput.includes("product") || userInput.includes("menu")) return `Our current lineup: ${shortCatalog}. Which one interests you?`;

//         try {
//           const model = genAI.getGenerativeModel({ 
//             model: "gemini-2.0-flash",
//             systemInstruction: `Short Context: Cloud 7 Shop. Products: ${shortCatalog}. No medical advice. Be brief.`
//           });

//           const result = await model.generateContent(params.userInput);
//           return result.response.text();
//         } catch (error) {
//           console.error("Quota Hit:", error);
          
//           // 2. SMART ERROR HANDLING
//           if (error.message.includes("429")) {
//             return "I'm cooling down for a few seconds! ☁️ In the meantime: we ship daily and our top sellers are the 15mg Tablets. What else can I tell you?";
//           }
//           return "I had a tiny hiccup. Can you try that question again?";
//         }
//       },
//       path: "loop"
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-[9999]">
//       <ChatBot 
//         options={{ 
//           theme: { primaryColor: "#8B5CF6" },
//           header: { title: "Cloud 7 AI" },
//           // 3. Prevent rapid clicking hits
//           botBubble: { simTypeDelay: 800 } 
//         }} 
//         flow={flow} 
//       />
//     </div>
//   );
// };


// export default ChatAssistant;

import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBot from "react-chatbotify";
import { useMemo } from "react";

const ChatAssistant = ({ allProducts }) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

  // 1. Minified Catalog: Sends ONLY names/prices to save precious tokens
  const catalogList = useMemo(() => 
    allProducts.map(p => `${p.name} ($${p.price})`).join(", "), 
  [allProducts]);

  const flow = {
    start: {
      message: "👋 Hi! I'm the Cloud 7 Assistant. How can I help you today?",
      options: ["Show Products", "Shipping Info", "Product Safety"],
      path: "handle_options"
    },
    handle_options: {
      transition: { duration: 0 },
      path: async (params) => {
        const input = params.userInput.toLowerCase();
        if (input.includes("product") || input.includes("show")) return "show_products";
        if (input.includes("shipping")) return "show_shipping";
        if (input.includes("safety") || input.includes("dose")) return "show_safety";
        return "loop";
      }
    },
    show_products: {
      message: `Our current lineup: ${catalogList}. Which one would you like to know more about?`,
      path: "loop"
    },
    show_shipping: {
      message: "We offer same-day shipping on all orders placed before 2:00 PM EST, Monday through Friday! ☁️",
      path: "loop"
    },
    show_safety: {
      message: "Safety first! Our 7-OH products are lab-tested for purity. We recommend starting with a low dose as per the label. Do not exceed recommended amounts.",
      path: "loop"
    },
    loop: {
      message: async (params) => {
        try {
          const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            systemInstruction: `You are the Cloud 7 store assistant. Catalog: ${catalogList}. Tone: Premium/Brief. No medical advice.`
          });

          const result = await model.generateContent(params.userInput);
          return result.response.text();
        } catch (error) {
          // 2. ERROR CATCHING: If 429 happens, the bot stays "smart"
          if (error.message?.includes("429")) {
            return "I'm currently cooling down to stay within my free limits! ☁️ But I can still tell you that we ship daily and have " + allProducts.length + " premium products in stock. Ask me again in about 30 seconds!";
          }
          return "I had a tiny hiccup. Could you try that question once more?";
        }
      },
      path: "loop"
    }
  };

const settings = {
  header: {
    title: "Cloud 7 Concierge", // Change the Name here
    showAvatar: true,
    avatar: "https://yourwebsite.com/logo.png" // Use your actual logo URL
  },
  general: {
    primaryColor: "#8B5CF6", // Your brand purple
    secondaryColor: "#1E1B4B", // Darker accent for buttons
    fontFamily: "Montserrat, sans-serif",
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <ChatBot 
        // options={{ 
        //   theme: { primaryColor: "#8B5CF6" },
        //   header: { title: "Cloud 7 Support", showAvatar: true },
        //   // 3. Throttle the bot to prevent rapid-fire requests
        //   botBubble: { simTypeDelay: 1000 } 
        // }} 
        options={settings}
        flow={flow} 
      />
    </div>
  );
};

export default ChatAssistant;