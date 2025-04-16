import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Plus, Settings, ChevronLeft } from 'react-feather';
import Markdown from 'markdown-to-jsx';
import '../../styles/AIAssistant.css';

const SYSTEM_PROMPT = {
  role: 'system',
  content: `You are BalanceGPT, an expert AI business and financial consultant specializing in:
- Early-stage startup financial planning
- Tax optimization and compliance
- Business strategy and growth
- Financial analysis and forecasting

Your personality traits:
- Professional yet approachable
- Always introduce yourself as "BalanceGPT"
- Provide actionable, practical advice
- Focus on cost-saving opportunities and tax benefits
- Explain complex financial concepts in simple terms
- Always consider legal compliance and risk management

Format your responses using Markdown:
- Use ## for section headings
- Use bullet points (*) for lists
- Use \`code\` for numbers and calculations
- Use **bold** for emphasis
- Use > for important quotes or tips
- Use --- for separating sections

When analyzing financial data or answering questions:
1. Prioritize tax-saving opportunities
2. Suggest startup-friendly financial strategies
3. Provide step-by-step actionable advice
4. Include relevant regulatory considerations
5. Offer both short-term and long-term perspectives`
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Update chat history when messages change
  useEffect(() => {
    if (activeChatId) {
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: messages }
            : chat
        )
      );
    }
  }, [messages, activeChatId]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    };
    setChatHistory(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setMessages([]);
  };

  const selectChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setActiveChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    // Add immediate loading message
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: '🤔 Analyzing your request...',
      isLoading: true
    }]);

    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistral-medium',  // Using a more capable model
          messages: [SYSTEM_PROMPT, ...messages.filter(m => !m.isLoading), newMessage],
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 0.9,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Remove loading message and add actual response
      setMessages(prev => 
        prev
          .filter(m => !m.isLoading)
          .concat(data.choices[0].message)
      );
    } catch (error) {
      console.error('Error:', error);
      // Remove loading message and add error message
      setMessages(prev => 
        prev
          .filter(m => !m.isLoading)
          .concat({
            role: 'assistant',
            content: 'I apologize, but I encountered an error. As your business consultant, I recommend trying to rephrase your question or breaking it into smaller parts.'
          })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please upload a file smaller than 5MB.');
      return;
    }

    setLoading(true);
    try {
      const content = await readFileContent(file);
      // Add a loading message for file analysis
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `## 📊 Analyzing ${file.name}\nProcessing your financial data...`,
        isLoading: true
      }]);

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistral-medium',
          messages: [
            SYSTEM_PROMPT,
            {
              role: 'user',
              content: `I'm uploading a financial CSV file named ${file.name}. Please analyze this data and provide insights. Focus on:
1. Key financial metrics and trends
2. Tax optimization opportunities
3. Business improvement suggestions
4. Cost-saving recommendations

Here's the data for analysis (format as a structured report):
${content}`
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 0.9,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Replace loading message with analysis results
      setMessages(prev => [
        ...prev.filter(m => !m.isLoading),
        {
          role: 'assistant',
          content: `## 📈 Financial Analysis Report for ${file.name}\n\n${data.choices[0].message.content}`
        }
      ]);
      setSelectedFile(file);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.filter(m => !m.isLoading),
        {
          role: 'assistant',
          content: '## ❌ Analysis Error\nI encountered an error while processing your file. Please ensure it\'s a valid CSV file with financial data and try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Update the readFileContent function to handle CSV specifically
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        // Only take first few rows for summary if the file is large
        const lines = content.split('\n');
        const headers = lines[0];
        const sampleData = lines.slice(1, Math.min(lines.length, 11)).join('\n');
        resolve(`Headers: ${headers}\n\nSample Data (first 10 rows):\n${sampleData}`);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={createNewChat}>
            <Plus size={16} />
            New Chat
          </button>
        </div>
        
        <div className="chat-history">
          {chatHistory.map(chat => (
            <div 
              key={chat.id} 
              className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
              onClick={() => selectChat(chat.id)}
            >
              <span>{chat.title}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="settings-btn">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>BalanceGPT Assistant</h2>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h3>Welcome to BalanceGPT!</h3>
              <p>I'm your dedicated business and financial consultant, specialized in:</p>
              <ul>
                <li>🎯 Startup financial strategy</li>
                <li>💰 Tax optimization</li>
                <li>📊 Financial analysis</li>
                <li>📈 Growth planning</li>
              </ul>
              <p>How can I help you today?</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-content">
                  <div className="message-avatar">
                    {message.role === 'assistant' ? '🤖' : '👤'}
                  </div>
                  <div className="message-text">
                    {message.isLoading ? (
                      message.content
                    ) : (
                      <Markdown
                        options={{
                          overrides: {
                            h1: { props: { className: 'markdown-h1' } },
                            h2: { props: { className: 'markdown-h2' } },
                            h3: { props: { className: 'markdown-h3' } },
                            p: { props: { className: 'markdown-p' } },
                            ul: { props: { className: 'markdown-ul' } },
                            li: { props: { className: 'markdown-li' } },
                            code: { props: { className: 'markdown-code' } },
                            pre: { props: { className: 'markdown-pre' } },
                          },
                        }}
                      >
                        {message.content}
                      </Markdown>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="message-content">
                <div className="message-avatar">🤖</div>
                <div className="message-text loading">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="input-footer">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <div className="input-container">
            <button 
              className="upload-btn"
              onClick={() => fileInputRef.current.click()}
              title="Upload file"
            >
              <Upload size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message BalanceGPT..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;