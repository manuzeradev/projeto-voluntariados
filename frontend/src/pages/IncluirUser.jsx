import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
export default function IncluirUser() {
  const { saveUser } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [form, setForm] = useState({ email: '', password: '', role: '' })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      await saveUser({ form })
      navigate(state?.from?.pathname || '/users', { replace: true })
    } catch (error) {
      setErr(error.message || 'Dados inválidos')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="card">
      <h1>Cadastrar Usuário</h1>
      {err && <p className="alert">{err}</p>}
      <form onSubmit={handleSubmit} className="form form--inline">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          placeholder="Email@teste.com"
          onChange={updateField}
          required
        />
        <FormInput
          label="senha"
          type="password"
          name="password"
          value={form.password}
          placeholder="***********"
          onChange={updateField}
          required
        />
        <FormInput
          label="Role"
          type="select"
          name="role"
          value={form.role}
          onChange={updateField}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </section>
  )
}