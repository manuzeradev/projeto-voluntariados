export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  name,
  placeholder,
  required,
}) {
  return (
    <label className="form-group">
      <span className="form-label">{label}</span>

      {type === 'select' ? (
        <select
          className="form-input"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">Selecione</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      ) : (

        <input
          className="form-input"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      )}
    </label>
  )
}
