import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const MAX_LENGTH = 300;
const COOLDOWN_MS = 8000;

export default function MessageForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError('Please write a little something first.');
      return;
    }

    if (trimmedContent.length > MAX_LENGTH) {
      setError('Your thought is a little too long.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const { error: insertError } = await supabase
      .from('messages')
      .insert([{ content: trimmedContent }]);

    if (insertError) {
      console.error(insertError);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setContent('');
    setSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setSuccess(false);
    }, 2500);

    setTimeout(() => {}, COOLDOWN_MS);
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        maxLength={MAX_LENGTH}
        rows={4}
        placeholder="Write something you want to leave here..."
        onChange={(event) => {
          setContent(event.target.value);
          setError('');
        }}
      />

      <div className="form-actions">
        <span className="character-count">
          {content.length}/{MAX_LENGTH}
        </span>

        <button
          className="publish-button"
          type="submit"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? 'Pinning...' : success ? 'Pinned ✓' : 'Pin it'}
        </button>
      </div>

      {error && (
        <p style={{ color: '#a34d46', fontSize: '0.78rem', marginBottom: 0 }}>
          {error}
        </p>
      )}
    </form>
  );
}
