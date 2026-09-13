function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export default function MessageCard({ message, index }) {
  const colorIndex = index % 5;
  const rotationIndex = index % 6;

  return (
    <article
      className={`wall-note note-color-${colorIndex} note-rotation-${rotationIndex}`}
    >
      <span className="note-pin" aria-hidden="true" />

      <div className="note-content">
        <p>{message.content}</p>

        <time dateTime={message.created_at}>
          {getRelativeTime(message.created_at)}
        </time>
      </div>
    </article>
  );
}
