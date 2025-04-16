import React, { useState, useRef } from 'react';
import { Send, Upload, ChevronLeft } from 'react-feather';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const MISTRAL_API_KEY = 'your-mistral-api-key';

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: 'mistral-tiny',
          messages: [...messages, newMessage]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, data.choices[0].message]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        setMessages(prev => [...prev, {
          role: 'user',
          content: `Analyzing file: ${file.name}\n\n${content}`
        }]);
        // Handle file content with Mistral API
      };
      reader.readAsText(file);
      setSelectedFile(file);
    }
  };

  return (
    <div className="ai-assistant">
      <div className="assistant-sidebar">
        <button className="new-chat">
          <span>New Chat</span>
        </button>
        <div className="chat-history">
          {/* Chat history items */}
        </div>
      </div>
      
      <div className="chat-container">
        <div className="chat-header">
          <h2>BalanceGPT</h2>
        </div>
        
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.role === 'assistant' ? '🤖 BalanceGPT: ' : '👤 You: '}
              {message.content}
            </div>
          ))}
          {loading && <div className="loading">BalanceGPT is thinking...</div>}
        </div>
        
        <div className="input-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button 
            className="upload-button"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask BalanceGPT anything..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={loading}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;