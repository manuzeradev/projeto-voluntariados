import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
export default function IncluirEvento() {
  const { saveEvent } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [form, setForm] = useState({ evento: '', data: '' })
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
      await saveEvent({ form })
      navigate(state?.from?.pathname || '/events', { replace: true })
    } catch (error) {
      setErr(error.message || 'Dados inválidos')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="card">
      <h1>Cadastrar Evento</h1>
      {err && <p className="alert">{err}</p>}
      <form onSubmit={handleSubmit} className="form form--inline">
        <FormInput
          label="Nome evento"
          type="string"
          name="evento"
          value={form.evento}
          placeholder="Evento tarara"
          onChange={updateField}
          required
        />
        <FormInput
          label="Data"
          type="date"
          name="data"
          value={form.data}
          placeholder="12/12/12"
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