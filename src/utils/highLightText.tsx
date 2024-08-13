export const highlightText = (
  text: string,
  searchTerm: string,
): JSX.Element[] => {
  if (!searchTerm) return [<span key="0">{text}</span>];
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-[#5195ee]" style={{ color: '#5195ee' }}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};
