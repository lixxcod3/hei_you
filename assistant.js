/* assistant.js — Professor Wáng AI (Local WebLLM with Streaming) */
(function () {
  "use strict";

  // 1. Condense the Curriculum Context (To speed up the GPU "prefill" phase)
  function buildCurriculumContext() {
    if (typeof curriculum === "undefined" || !curriculum) {
      return "Foundational C tutor.";
    }
    let summary = "CURRICULUM TOPICS:\n";
    for (let modId in curriculum) {
      if (Object.prototype.hasOwnProperty.call(curriculum, modId)) {
        const mod = curriculum[modId];
        summary += `- ${mod.title || "Module"}\n`;
      }
    }
    return summary;
  }

  const SYSTEM_INSTRUCTION = `
You are Professor Wáng (老师 Wáng), a scholar teaching C programming on Hei You.
- Keep replies extremely concise to save browser processing power.
- Give conceptual hints first, standard C (C99/C11).
${buildCurriculumContext()}
`;

  // 2. Markdown Parser
  function parseMarkdown(md) {
    if (!md) return "";
    let text = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const codeBlocks = [];
    text = text.replace(/```(?:c|C)?\n?([\s\S]*?)```/g, function (_, code) {
      codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
    text = text.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => codeBlocks[Number(idx)]);
    return text;
  }

  // 3. Inject Widget DOM
  function injectWidget() {
    if (document.getElementById("ai-chat-window")) return;
    const fab = document.createElement("button");
    fab.className = "ai-fab";
    fab.id = "ai-fab";
    fab.innerHTML = `
      <svg class="ai-fab-icon" viewBox="0 0 40 40">
        <rect x="2" y="9" width="7" height="4" fill="#C58F3A" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="31" y="9" width="7" height="4" fill="#C58F3A" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="10" y="3" width="20" height="8" fill="#2E3A55" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="11" y="13" width="18" height="14" fill="#E8C48E" stroke="#1C2436" stroke-width="1.5"/>
        <rect x="8" y="30" width="24" height="9" fill="#A8324A" stroke="#1C2436" stroke-width="1.5"/>
      </svg>
      <span>Ask Wáng</span>`;
    
    const chat = document.createElement("div");
    chat.className = "ai-chat-window hidden";
    chat.id = "ai-chat-window";
    chat.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-title"><span>老师 Wáng (Local AI)</span></div>
        <button class="ai-chat-close" id="ai-chat-close" type="button">&times;</button>
      </div>
      <div class="ai-messages" id="ai-messages">
        <div class="ai-bubble bot"><strong>老师 Wáng:</strong> Booting local brain...</div>
      </div>
      <div id="ai-loading-bar" style="height:4px; background:var(--crimson); width:0%; transition: width 0.2s;"></div>
      <form class="ai-chat-form" id="ai-chat-form">
        <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Loading model..." disabled required />
        <button type="submit" class="ai-chat-send" id="ai-chat-send" disabled>Load</button>
      </form>`;
    
    document.body.appendChild(fab);
    document.body.appendChild(chat);
  }

  // 4. WebLLM Initialization with Streaming
  async function initWebLLM() {
    injectWidget();
    
    const fab = document.getElementById("ai-fab");
    const chatWindow = document.getElementById("ai-chat-window");
    const closeBtn = document.getElementById("ai-chat-close");
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const sendBtn = document.getElementById("ai-chat-send");
    const loadingBar = document.getElementById("ai-loading-bar");

    let engine = null;
    let chatHistory = [{ role: "system", content: SYSTEM_INSTRUCTION }];

    fab.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
      if (!chatWindow.classList.contains("hidden") && !input.disabled) input.focus();
    });
    closeBtn.addEventListener("click", () => chatWindow.classList.add("hidden"));

    function appendMessage(text, isUser) {
      const bubble = document.createElement("div");
      bubble.className = `ai-bubble ${isUser ? "user" : "bot"}`;
      if (isUser) bubble.textContent = text;
      else bubble.innerHTML = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    }

    try {
      const webllm = await import("https://esm.run/@mlc-ai/web-llm");
      const selectedModel = "Phi-3-mini-4k-instruct-q4f16_1-MLC";
      
      engine = await webllm.CreateMLCEngine(selectedModel, {
        initProgressCallback: (progress) => {
          const percent = Math.round(progress.progress * 100);
          loadingBar.style.width = `${percent}%`;
          input.placeholder = `Downloading... ${percent}%`;
        }
      });

      loadingBar.style.opacity = "0";
      input.disabled = false;
      sendBtn.disabled = false;
      input.placeholder = "Ask about C, pointers, tasks...";
      messages.innerHTML = `<div class="ai-bubble bot"><strong>老师 Wáng:</strong> Fully loaded! “嘿，你！” What do you want to ask today?</div>`;

    } catch (err) {
      messages.innerHTML = `<div class="ai-bubble bot" style="color:red;">Error loading AI.<br>${err.message}</div>`;
      return;
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const userText = input.value.trim();
      if (!userText || !engine) return;

      appendMessage(userText, true);
      chatHistory.push({ role: "user", content: userText });
      
      input.value = "";
      input.disabled = true;
      sendBtn.disabled = true;
      sendBtn.textContent = "...";

      // Create an empty bubble for the bot's streaming response
      const botBubble = appendMessage("", false);
      let botResponse = "";

      try {
        // stream: true forces the AI to output word-by-word
        const chunks = await engine.chat.completions.create({
          messages: chatHistory,
          temperature: 0.6,
          stream: true
        });

        for await (const chunk of chunks) {
          const textDelta = chunk.choices[0]?.delta?.content || "";
          botResponse += textDelta;
          botBubble.innerHTML = parseMarkdown(botResponse);
          messages.scrollTop = messages.scrollHeight;
        }

        chatHistory.push({ role: "assistant", content: botResponse });
        
        if (chatHistory.length > 7) {
          chatHistory = [chatHistory[0], ...chatHistory.slice(-6)];
        }
      } catch (err) {
        botBubble.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
      } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
        input.focus();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initWebLLM);
  else initWebLLM();
})();