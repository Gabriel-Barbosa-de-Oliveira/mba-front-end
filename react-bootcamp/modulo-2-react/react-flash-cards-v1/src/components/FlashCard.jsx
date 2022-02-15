import React, { useEffect, useState } from "react";

export default function FlashCard({
  title = "Título do card",
  description = "Descrição do card, que pode conter mais palavras que o título",
  showFlashCardTitle = true,
}) {
  const [showTitle, setShowTitle] = useState(showFlashCardTitle);
  const fontSizeClassName = showTitle ? "text-xl" : "text-sm";

  useEffect(() => {
    setShowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]);

  function handleCardClick() {
    setShowTitle((currentShowTitle) => !currentShowTitle);
  }

  return (
    <div
      className={`shadow-lg m-2 p-4 w-80 h-40 cursor-pointer
                  flex flex-row items-center justify-center 
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "monospace" }}
      onClick={handleCardClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
