/* assistant.js — Professor Wáng AI Assistant connected to Gemini API with Markdown Parser */
(function () {
  "use strict";

  const API_KEY = "AQ.Ab8RN6LS2QuzHSMS0IiVN6ren2ex2Ja15s94iErhbm6uIXaHLg";

  // 1. Build Curriculum Context String from curriculum_data.js
  function buildCurriculumContext() {
    if (typeof curriculum === "undefined") {
      return "No curriculum data loaded.";
    }

    let summary = "CURRENT COURSE CURRICULUM (Hei You - C Programming):\n";
    for (let modId in curriculum) {
      const mod = curriculum[modId];
      summary += `\n[Module ${modId}: ${mod.title}]\n`;
      if (mod.sub_lessons) {
        mod.sub_lessons.forEach(sub => {
          const plainTheory = (sub.theory || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
          summary += ` - Sub-lesson ${sub.sub_id}: ${sub.title}\n`;
          summary += `   Theory: ${plainTheory}\n`;
          if (sub.starter) {
            summary += `   Task Starter Code: ${sub.starter}\n`;
          }
        });
      }
    }
    return summary;
  }

  // 2. System Instructions for Professor Wáng Persona
  const SYSTEM_INSTRUCTION = `
You are Professor Wáng (老师 Wáng), a scholar who teaches C programming on the Hei You learning platform.
Tone: Encouraging, knowledgeable, with a touch of wit and occasional friendly Chinese phrases like "好样的!" (Proud of you) on success or "加油!" (Keep it up!).

RULES:
1. Always guide students according to the Hei You curriculum provided below.
2. If asked questions related to exercises, provide hints and explanations first rather than giving away the full code directly.
3. Keep code explanations clean, standard C (C99/C11).
4. If a question is outside C programming or computer science, gently steer them back to laying bricks in C.

${buildCurriculumContext()}
`;

  // 3. Markdown to HTML Parser
  function parseMarkdown(md) {
    if (!md) return "";

    // Escape raw HTML tags to prevent broken injection
    let text = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Preserve multiline code blocks
    const codeBlocks = [];
    text = text.replace(/```(?:c|C)?\n?([\s\S]*?)```/g, function (_, code) {
      codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // Inline code `code`
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Headings (### h3, ## h2, # h1)
    text = text.replace(/^### (.*$)/gim, '<strong style="display:block; margin:6px 0 2px;">$1</strong>');
    text = text.replace(/^## (.*$)/gim, '<strong style="display:block; margin:8px 0 3px; font-size:14px;">$1</strong>');
    text = text.replace(/^# (.*$)/gim, '<strong style="display:block; margin:10px 0 4px; font-size:15px;">$1</strong>');

    // Bold (**text** or __text__)
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italics (*text* or _text_)
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/_([^_]+)_/g, "<em>$1</em>");

    // Bullet points (* list or - list)
    text = text.replace(/^\s*[\*\-]\s+(.*)$/gim, '<div style="margin-left:14px;">• $1</div>');

    // Numbered lists (1. list)
    text = text.replace(/^\s*(\d+)\.\s+(.*)$/gim, '<div style="margin-left:14px;">$1. $2</div>');

    // Line breaks (convert newlines to <br>, but collapse excess)
    text = text.replace(/\n\n+/g, '<br><br>');
    text = text.replace(/\n/g, '<br>');

    // Restore code blocks
    text = text.replace(/__CODE_BLOCK_(\d+)__/g, function (_, index) {
      return codeBlocks[Number(index)];
    });

    return text;
  }

  // 4. Inject Assistant Markup into DOM
  function injectWidget() {
    const fab = document.createElement("button");
    fab.className = "ai-fab";
    fab.id = "ai-fab";
    fab.setAttribute("aria-label", "Ask Professor Wáng");
    fab.innerHTML = `
      <svg class="ai-fab-icon" viewBox="0 0 40 40">
        <rect x="2" y="9" width="7" height="4" fill="#C58F3A" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="31" y="9" width="7" height="4" fill="#C58F3A" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="10" y="3" width="20" height="8" fill="#2E3A55" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="11" y="13" width="18" height="14" fill="#E8C48E" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="8" y="30" width="24" height="9" fill="#A8324A" stroke="#1C2436" stroke-width="1.5"/>
      </svg>
      <span>Ask Wáng</span>
    `;

    const chat = document.createElement("div");
    chat.className = "ai-chat-window hidden";
    chat.id = "ai-chat-window";
    chat.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-title">
          <span>老师 Wáng AI</span>
        </div>
        <button class="ai-chat-close" id="ai-chat-close">&times;</button>
      </div>
      <div class="ai-messages" id="ai-messages">
        <div class="ai-bubble bot">
          <strong>老师 Wáng:</strong> “嘿，你！” Ask me anything about our lessons.
        </div>
      </div>
      <form class="ai-chat-form" id="ai-chat-form">
        <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Ask about C, pointers, tasks..." autocomplete="off" required />
        <button type="submit" class="ai-chat-send" id="ai-chat-send">Send</button>
      </form>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chat);
  }

  // 5. Client-side Gemini API Call
  async function callGemini(prompt, history) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;

    const contents = [];
    history.forEach(msg => {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      });
    });
    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const body = {
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 600
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "Failed to contact Gemini API");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // 6. Event Handlers & Initialization
  document.addEventListener("DOMContentLoaded", function () {
    injectWidget();

    const fab = document.getElementById("ai-fab");
    const chatWindow = document.getElementById("ai-chat-window");
    const closeBtn = document.getElementById("ai-chat-close");
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const sendBtn = document.getElementById("ai-chat-send");

    let history = [];

    fab.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
      if (!chatWindow.classList.contains("hidden")) {
        input.focus();
      }
    });

    closeBtn.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });

    function appendUserMessage(text) {
      const bubble = document.createElement("div");
      bubble.className = "ai-bubble user";
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    }

    function appendBotMessage(html) {
      const bubble = document.createElement("div");
      bubble.className = "ai-bubble bot";
      bubble.innerHTML = html;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const text = input.value.trim();

      if (!text) return;
      if (!API_KEY) {
        appendBotMessage(`<span style="color:var(--crimson);">Please insert your Gemini API key inside <code>assistant.js</code>.</span>`);
        return;
      }

      appendUserMessage(text);
      input.value = "";
      sendBtn.disabled = true;
      sendBtn.textContent = "...";

      try {
        const reply = await callGemini(text, history);
        history.push({ role: "user", text: text });
        history.push({ role: "model", text: reply });

        // Parse full Markdown format into clean HTML
        const parsedHtml = parseMarkdown(reply);
        appendBotMessage(parsedHtml);
      } catch (err) {
        appendBotMessage(`<span style="color:var(--crimson);">Error: ${err.message}</span>`);
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
      }
    });
  });
})();