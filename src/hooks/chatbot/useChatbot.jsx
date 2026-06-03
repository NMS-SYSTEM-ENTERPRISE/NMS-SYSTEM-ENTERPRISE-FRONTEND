import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { getSuggestedQueries, getChatHistory, askQuestion } from '@/networking/chatbot/chatbot-apis';

export const useChatbot = () => {
  const [suggestedQueries, setSuggestedQueries] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const { showError } = useToast();

  const fetchSuggestedQueries = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getSuggestedQueries();
      setSuggestedQueries(data);
    } catch (err) {
      console.error(err);
      showError('Failed to fetch suggested queries');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const fetchChatHistory = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      const data = await getChatHistory(userId);
      setChatHistory(data.reverse()); // Reverse to show oldest first if DB returns descending
    } catch (err) {
      console.error(err);
      showError('Failed to fetch chat history');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const sendQuestion = useCallback(async (userId, question) => {
    if (!question.trim()) return;
    try {
      setIsAsking(true);
      // Optimistically add the question
      const optimisticMessage = { id: Date.now(), user_id: userId, question, answer: null, created_at: new Date().toISOString() };
      setChatHistory(prev => [...prev, optimisticMessage]);

      const response = await askQuestion({ user_id: userId, question });
      
      // Update with the real response
      setChatHistory(prev => prev.map(msg => msg.id === optimisticMessage.id ? response : msg));
    } catch (err) {
      console.error(err);
      showError('Failed to get answer');
      // Remove optimistic message on error
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setIsAsking(false);
    }
  }, [showError]);

  return {
    suggestedQueries,
    chatHistory,
    isLoading,
    isAsking,
    fetchSuggestedQueries,
    fetchChatHistory,
    sendQuestion
  };
};
