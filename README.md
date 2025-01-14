ChatBot: CDP Support
A fully functional chatbot built using React, designed to assist with customer queries related to CDP platforms like Segment, mParticle, Lytics, and Zeotap. The chatbot uses NLP for better query understanding and integrates with a backend to fetch responses dynamically.

Features
Predefined Questions: Users can select from a set of predefined questions for quick interaction.
Natural Language Processing (NLP): The bot uses NLP to analyze user queries and determine the relevant CDP platform.
Dynamic Responses: Fetches responses dynamically from a backend server based on the identified platform.
Chat History: Keeps track of the conversation history for both the user and the bot.
Error Handling: Provides error messages if the query is unrecognized or the backend fails.
User-Friendly Interface: A clean and responsive UI with an easy-to-use text input and send button.
Tech Stack
Frontend: React.js
Libraries: Material-UI, string-similarity, compromise.js
Backend: Node.js (for scraping data and handling platform queries)
Styling: CSS
Installation
Clone the repository.
Install dependencies:
bash
Copy code
npm install
Run the application:
bash
Copy code
npm start
Backend Setup
The backend is set up to scrape and provide answers for each platform (Segment, mParticle, Lytics, and Zeotap). Ensure that the backend is running on http://localhost:3001 and has the appropriate scraping logic for each platform.

Data Structures
Chat History: Array of message objects containing the sender (user or bot) and the message text.
Platform Matching: Uses the string-similarity library to match user queries with predefined platforms.
Prerequisites
Node.js and npm installed on your machine.
Backend Server running to handle the queries (must be set up as described).
Contact Information
Name: Prajwal M
Email: prajwal2815@gmail.com
Phone: 8884761925
LinkedIn: Prajwal M
GitHub: Prajwal-Muniraju
Portfolio: Prajwal's Portfolio
Assignment Details
This project is part of an assignment for Zeotap. It aims to showcase the implementation of a functional chatbot that interacts with users based on predefined platforms (Segment, mParticle, Lytics, Zeotap). The goal is to create an intuitive user experience while leveraging NLP for query interpretation.
