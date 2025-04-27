export const formatDateTime = (
  isoString: string,
  optionsType: 'datetime' | 'date' = 'datetime'
): string => {
  const date = new Date(isoString);

  if (optionsType === 'date') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options).replace(',', ' at');
};
