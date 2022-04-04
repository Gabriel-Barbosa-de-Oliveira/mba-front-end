export default function SelectInput({
  options = [],
  onSelectChange = null,
  autoFocus = false,
}) {
  function handleSelectChange({ currentTarget }) {
    if (onSelectChange) {
      onSelectChange(currentTarget.value);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <select
        autoFocus={autoFocus}
        id="1"
        className="border p-1"
        onChange={handleSelectChange}
      >
        {options.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
