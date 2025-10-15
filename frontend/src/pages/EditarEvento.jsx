import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../api/http'
import Button from '../components/Button'
import FormInput from '../components/FormInput'

export default function EditarEvento() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ evento: '', data: '' })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    http
      .get('/events')
      .then(({ data }) => {
        const eventoEncontrado = data.listagem.find(
          (evento) => evento.id === parseInt(id),
        )
        if (eventoEncontrado) {
          setForm({
            evento: eventoEncontrado.nome,
            data: new Date(eventoEncontrado.data).toISOString().split('T')[0],
          })
        } else {
          setErr('Evento não encontrado!')
        }
      })
      .catch(() => {
        setErr('Erro ao carregar os eventos.')
      })
  }, [id])

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)

    try {
      await http.put(`/events/${id}`, form)
      alert('Evento atualizado com sucesso!')
      navigate('/events')
    } catch {
      setErr('Erro ao atualizar evento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h1>Editar Evento</h1>
      {err && <p className="alert">{err}</p>}
      <form onSubmit={handleSubmit} className="form form--inline">
        <FormInput
          label="Nome do Evento"
          type="text"
          name="evento"
          value={form.evento}
          onChange={updateField}
          required
        />
        <FormInput
          label="Data"
          type="date"
          name="data"
          value={form.data}
          onChange={updateField}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Atualizando...' : 'Salvar'}
        </Button>
      </form>
    </section>
  )
}