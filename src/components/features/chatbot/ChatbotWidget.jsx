import { useChatbot } from '@/hooks/chatbot/useChatbot';
import { useAuthContext } from '@/hooks/useauth';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import styles from './chatbot.module.css';

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const { user } = useAuthContext();
  const userId = user?.id || 1;

  const {
    suggestedQueries,
    chatHistory,
    isLoading,
    isAsking,
    fetchSuggestedQueries,
    fetchChatHistory,
    sendQuestion,
  } = useChatbot();

  useEffect(() => {
    if (isOpen) {
      if (suggestedQueries.length === 0) fetchSuggestedQueries();
      fetchChatHistory(userId);
    }
  }, [
    isOpen,
    userId,
    suggestedQueries.length,
    fetchSuggestedQueries,
    fetchChatHistory,
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isAsking]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendQuestion(userId, inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestedClick = (queryText) => {
    sendQuestion(userId, queryText);
  };

  return (
    <>
      <div className={styles.chatbotFab} onClick={toggleChat}>
        <Icon
          icon={isOpen ? 'mdi:close' : 'mdi:robot-outline'}
          width={32}
          height={32}
        />
      </div>

      <div className={`${styles.chatbotWindow} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.headerIcon}>
              <Icon icon="mdi:robot-outline" width={24} height={24} />
            </div>
            <div className={styles.headerText}>
              <h3>NMS Assistant</h3>
              <p>Online & Ready</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={toggleChat}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <div className={styles.body}>
          {isLoading && chatHistory.length === 0 ? (
            <div className={styles.loadingState}>
              <Icon
                icon="mdi:loading"
                width={40}
                height={40}
                className={styles.loadingSpinner}
              />
              <p>Initializing assistant...</p>
            </div>
          ) : (
            <>
              <div className={styles.welcomeSection}>
                <h2>How can I help you?</h2>
                <p>Select a common query or ask your own question below.</p>
              </div>

              <div className={styles.suggestionsContainer}>
                {suggestedQueries.map((category, idx) => (
                  <div key={idx} className={styles.suggestionCategory}>
                    <div className={styles.categoryTitle}>
                      <Icon icon={category.icon} width={16} />
                      {category.category}
                    </div>
                    <div className={styles.queryGrid}>
                      {category.queries.map((q) => (
                        <button
                          key={q.id}
                          className={styles.queryPill}
                          onClick={() => handleSuggestedClick(q.text)}
                        >
                          <span>{q.text}</span>
                          <Icon icon="mdi:arrow-right" width={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {chatHistory.length > 0 && (
                <div className={styles.chatHistory}>
                  {chatHistory.map((msg, index) => (
                    <div key={msg.id || index} className={styles.messageGroup}>
                      <div className={`${styles.messageRow} ${styles.user}`}>
                        <div className={styles.messageBubble}>
                          {msg.question}
                        </div>
                      </div>
                      {msg.answer && (
                        <div className={`${styles.messageRow} ${styles.bot}`}>
                          <div className={styles.messageBubble}>
                            {msg.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isAsking && (
                    <div className={`${styles.messageRow} ${styles.bot}`}>
                      <div className={styles.messageBubble}>
                        <div className={styles.typingIndicator}>
                          <div className={styles.typingDot}></div>
                          <div className={styles.typingDot}></div>
                          <div className={styles.typingDot}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form className={styles.footer} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <textarea
              className={styles.input}
              placeholder="Type your question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!inputValue.trim() || isAsking}
            >
              <Icon icon="mdi:send" width={18} height={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
