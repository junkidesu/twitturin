export const elapsedTime = (point: number): string => {
  const now = Date.now();

  const diff = now - point;

  const seconds = Math.floor(diff / 1000);

  if (seconds < 60)
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.floor(hours / 24);

  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;

  const weeks = Math.floor(days / 7);

  return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
};
