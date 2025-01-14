const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const documentationUrls = {
  segment: "https://segment.com/docs/?ref=nav",
  mparticle: "https://docs.mparticle.com",
  lytics: "https://docs.lytics.com",
  zeotap: "https://docs.zeotap.com/home/en-us/",
};

app.get("/scrape", async (req, res) => {
  const { platform, query } = req.query;

  if (!platform || !query) {
    return res.status(400).json({ error: "Platform and query are required" });
  }

  const url = documentationUrls[platform];
  if (!url) {
    return res.status(404).json({ error: "Documentation not found for the specified platform" });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Improved scraping strategy:
    let relevantText = "";
    const targetElements = $("h2, h3, p").filter((_, element) => { // Consider headings (h2, h3) and paragraphs (p)
      const text = $(element).text().toLowerCase();
      return text.includes(query.toLowerCase()) || text.includes(platform.toLowerCase()); // Include platform name for better context
    });

    targetElements.each((_, element) => {
      relevantText += $(element).text() + "\n"; // Extract text from headings and paragraphs
      const nextParagraph = $(element).next(); // Look for the next paragraph
      if (nextParagraph.is("p") && nextParagraph.text().toLowerCase().includes(query.toLowerCase())) {
        relevantText += nextParagraph.text() + "\n"; // Include relevant paragraph if it exists
      }
    });

    // Stop scraping after finding a threshold of relevant sentences:
    const sentenceCount = relevantText.split(/\n/).length;
    if (sentenceCount >= 3) {
      relevantText = relevantText.slice(0, relevantText.lastIndexOf("\n")); // Limit to 3 sentences
    }

    const responseText = relevantText.trim() || "No relevant information found in the documentation.";

    res.json({ success: true, answer: responseText });
  } catch (error) {
    console.error("Error fetching response:", error.message);
    res.status(500).json({
      error: "Failed to fetch response from documentation.",
      details: error.message,
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});