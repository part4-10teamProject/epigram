export const highlightText = (
  text: string,
  searchTerm: string,
): JSX.Element => {
  if (!searchTerm) return <span>{text}</span>;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="text-highlight">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};
