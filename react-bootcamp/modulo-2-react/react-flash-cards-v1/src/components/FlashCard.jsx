export default function FlashCard({
  title = "Título do card",
  description = "Descrição do card, que pode conter mais palavras que o título",
  showFlashCardTitle = true,
  onToggleFlashCard = null,
  id,
}) {
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  const fontSizeClassName = showFlashCardTitle ? "text-xl" : "text-sm";
  return (
    <div
      className={`shadow-lg m-2 p-4 w-80 h-40 cursor-pointer
                  flex flex-row items-center justify-center 
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "monospace" }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
