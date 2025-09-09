// server/controllers/chatbotController.js

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { campusKnowledgeBase } from "../config/campusInfo.js";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
    );
    const weather = response.data;
    return `The current weather in ${city} is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C.`;
  } catch (error) {
    return `I couldn't fetch the weather for ${city}. Please ensure the city name is correct.`;
  }
};

export const chatWithBot = async (req, res) => {
  try {
    const { prompt, pageData } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    let toolResponse = "";

    // A regular expression to find "weather in/of [city name]"
    const weatherRegex = /weather(?: in| of)?\s(.+)/i;
    const weatherMatch = prompt.match(weatherRegex);

    if (weatherMatch && weatherMatch[1]) {
      const city = weatherMatch[1].replace(/[^a-zA-Z\s]/g, "").trim();
      toolResponse = await getWeather(city);
    }

    const combinedKnowledge = `
            ${campusKnowledgeBase}
            --- CURRENT PAGE CONTEXT ---
            ${pageData || "No current page context."}
            --- REAL-TIME INFORMATION ---
            Current Date & Time in India: ${new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
            Weather Info: ${toolResponse || "Not requested."}
        `;

    const fullPrompt = `
        **ROLE:** You are CampusConnect Bot, a helpful AI assistant for a college app.
        
        **INSTRUCTIONS:**
        1. Analyze the user's question.
        2. If the user's question is about weather, date, or time, use the information under the "REAL-TIME INFORMATION" section below to answer. Ignore the other sections.
        3. For all other questions, use the "CAMPUS KNOWLEDGE BASE" and "CURRENT PAGE CONTEXT" to answer.
        4. If you cannot answer from the provided information, respond with: "I don't have information on that, but you could try asking in the Student Forum!".
        5. Be friendly and concise.
        
        **--- CAMPUS KNOWLEDGE BASE ---**
        ${campusKnowledgeBase}
        
        **--- CURRENT PAGE CONTEXT ---**
        ${pageData || "No current page context."}
        
        **--- REAL-TIME INFORMATION ---**
        Current Date & Time in India: ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
        Weather Info: ${toolResponse || "Not requested."}
        
        **--- USER'S QUESTION ---**
        ${prompt}
        `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("AI Chatbot Error:", error);
    res.status(500).json({ message: "Error communicating with the AI model." });
  }
};
