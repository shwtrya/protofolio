import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastNotification';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const showShortcutsModal = useCallback(() => {
    const shortcuts = [
      { keys: 'Ctrl/Cmd + H', action: 'Go to Home' },
      { keys: 'Ctrl/Cmd + K', action: 'Go to Contact' },
      { keys: 'Ctrl/Cmd + P', action: 'Go to Projects' },
      { keys: 'Ctrl/Cmd + E', action: 'Go to Experience' },
      { keys: '?', action: 'Show this help' }
    ];

    const message = shortcuts
      .map((shortcut) => `${shortcut.keys}: ${shortcut.action}`)
      .join(' | ');

    showToast('info', `Keyboard shortcuts: ${message}`, 8000);
  }, [showToast]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target;
      const isEditableTarget =
        target instanceof Element &&
        target.closest('input, textarea, select, [contenteditable="true"]');

      if (isEditableTarget) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
          case 'k':
            e.preventDefault();
            navigate('/contact');
            break;
          case 'p':
            e.preventDefault();
            navigate('/projects');
            break;
          case 'e':
            e.preventDefault();
            navigate('/experience');
            break;
        }
      }

      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        showShortcutsModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, showShortcutsModal]);
};
