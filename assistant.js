/* assistant.js — Professor Wáng AI Assistant powered by DeepSeek (via OpenRouter) */
(function () {
  "use strict";

  // 1. Key Retrieval Strategy (Checks config.js -> localStorage -> prompts user)
  function getApiKey() {
    if (typeof LOCAL_GEMINI_API_KEY !== "undefined" && LOCAL_GEMINI_API_KEY.trim() !== "") {
      return LOCAL_GEMINI_API_KEY.trim();
    }
    try {
      return (localStorage.getItem("heiyou_ai_key") || "").trim();
    } catch (e) {
      return "";
    }
  }

  // 2. Build Curriculum Context String from curriculum_data.js
  function buildCurriculumContext() {
    if (typeof curriculum === "undefined" || !curriculum) {
      return "No explicit curriculum loaded. Act as a foundational C tutor.";
    }

    let summary = "CURRENT COURSE CURRICULUM (Hei You - C Programming):\n";
    for (let modId in curriculum) {
      if (Object.prototype.hasOwnProperty.call(curriculum, modId)) {
        const mod = curriculum[modId];
        summary += `\n[Module ${modId}: ${mod.title || "Untitled"}]\n`;
        if (Array.isArray(mod.sub_lessons)) {
          mod.sub_lessons.forEach(sub => {
            const plainTheory = (sub.theory || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            summary += ` - Sub-lesson ${sub.sub_id}: ${sub.title}\n`;
            if (plainTheory) summary += `   Theory: ${plainTheory}\n`;
            if (sub.starter) summary += `   Task Starter Code:\n${sub.starter}\n`;
          });
        }
      }
    }
    return summary;
  }

  // 3. System Instructions for Professor Wáng Persona
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

  // 4. Markdown to HTML Parser
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

  // 5. Inject Assistant Markup into DOM
  function injectWidget() {
    if (document.getElementById("ai-chat-window")) return;

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
        <button class="ai-chat-close" id="ai-chat-close" type="button">&times;</button>
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

  // 6. Client-side AI API Call (OpenRouter/DeepSeek)
  async function callAI(apiKey, prompt, history) {
    const endpoint = "https://openrouter.ai/api/v1/chat/completions";

    const messages = [{ role: "system", content: SYSTEM_INSTRUCTION }];
    
    // Convert history into OpenAI/OpenRouter structure
    history.forEach(msg => {
      messages.push({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text
      });
    });
    
    messages.push({ role: "user", content: prompt });

    const body = {
      model: "minimax/minimax-m3:free",
      messages: messages,
      temperature: 0.6,
      max_tokens: 1024
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href, // Required by OpenRouter API
        "X-Title": "Hei You C Platform"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to contact API (Status: ${response.status})`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Empty response from AI.");
    }

    return data.choices[0].message.content;
  }

  // 7. Event Handlers & Initialization
  function init() {
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

      let key = getApiKey();

      // Trigger prompt if the key isn't provided locally
      if (!key) {
        const userPromptKey = prompt("Please enter your OpenRouter API Key to chat with Professor Wáng:");
        if (userPromptKey && userPromptKey.trim()) {
          key = userPromptKey.trim();
          try {
            localStorage.setItem("heiyou_ai_key", key);
          } catch (err) {}
        } else {
          appendBotMessage(`<span style="color:var(--crimson);">A valid API key is required to start chatting.</span>`);
          return;
        }
      }

      appendUserMessage(text);
      input.value = "";
      sendBtn.disabled = true;
      sendBtn.textContent = "...";

      try {
        const reply = await callAI(key, text, history);
        history.push({ role: "user", text: text });
        history.push({ role: "assistant", text: reply });

        // Maintain context limit to prevent token bloat
        if (history.length > 12) {
          history = history.slice(-12);
        }

        const parsedHtml = parseMarkdown(reply);
        appendBotMessage(parsedHtml);
      } catch (err) {
        appendBotMessage(`<span style="color:var(--crimson);">Error: ${err.message}</span>`);
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
        input.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();