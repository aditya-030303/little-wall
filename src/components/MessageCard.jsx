export default function MessageCard({ message }) {
  const date = new Date(message.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <p className="text-stone-700 mb-3 whitespace-pre-wrap">{message.content}</p>
      <p className="text-xs text-stone-400">{date}</p>
    </div>
  );
}
