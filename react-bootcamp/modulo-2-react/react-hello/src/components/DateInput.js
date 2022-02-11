
export default function DateInput({
  id = "inputDate",
  labelDescription = "Descrição da Label",
  inputValue = "2021-04-30",
  onInputChange = null,
  autoFocus = false
}) {

  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newName = currentTarget.value;
      onInputChange(newName)

    }
  }

  return (
    <div className="flex flex-col my-4">
      <label htmlFor={id} className="text-sm mb-1">{labelDescription}</label>
      <input autoFocus={autoFocus} id={id} className="border p-1" type='date'
        value={inputValue} onChange={handleInputChange}
      />
    </div>
  )

}