export const elapsedTime = (point: number): string => {
  const now = Date.now();

  const diff = now - point;

  const seconds = Math.floor(diff / 1000);

  if (seconds < 60)
    return `${seconds} s`;

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60)
    return `${minutes} m`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} h`;

  const days = Math.floor(hours / 24);

  if (days < 7) return `${days} d`;

  const weeks = Math.floor(days / 7);

  return `${weeks} w`;
};
