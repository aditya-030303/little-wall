import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MessageForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > 300) return;

    setIsSubmitting(true);
    await supabase.from('messages').insert([{ content: trimmed }]);
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
        placeholder="Write something you want to leave here…"
        className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-shadow bg-white shadow-sm"
        rows="3"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-stone-400">{content.length}/300</span>
        <button 
          type="submit" 
          disabled={isSubmitting || content.trim().length === 0}
          className="bg-stone-800 text-white px-6 py-2 rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </form>
  );
}
