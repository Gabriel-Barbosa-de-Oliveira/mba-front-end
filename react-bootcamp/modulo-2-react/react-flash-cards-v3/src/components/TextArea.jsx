import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = "Descrição do label:",
  inputValue = "Valor padrão do input",
  onTextAreaChange = null,
  id = getNewId(),
  autoFocus = false,
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = inputValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        autoFocus={autoFocus}
        id={id}
        className="border p-1"
        type="text"
        value={inputValue}
        onChange={handleTextAreaChange}
        maxLength={maxLength}
        rows={rows}
      />
      <div className="text-right mr-1">
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
