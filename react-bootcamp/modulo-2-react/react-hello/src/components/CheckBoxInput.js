
export default function CheckBoxInput({
  id = "inputCheckbox",
  labelDescription = "Descrição da Label",
  inputValue = "Valor padrão do input",
  onCheckboxChange = null,
  autoFocus = false
}) {

  function handleCheckboxChange() {
    if (onCheckboxChange) {
      onCheckboxChange()

    }
  }

  return (
    <div className="flex flex-row mx-4 items-center space-x-2">
      <input autoFocus={autoFocus} id={id} className="border p-1" type='checkbox'
        value={inputValue} onChange={handleCheckboxChange}
      />
      <label htmlFor={id} className="text-sm mb-1">{labelDescription}</label>
    </div>
  )

}