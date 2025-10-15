import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../api/http'
import Button from '../components/Button'
import FormInput from '../components/FormInput'

export default function EditarUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: '' })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    http
      .get('/users')
      .then(({ data }) => {
        const usuarioEncontrado = data.listagem.find(
          (user) => user.id === parseInt(id),
        )
        if (usuarioEncontrado) {
          setForm({
            email: usuarioEncontrado.email,
            password: '',
            role: usuarioEncontrado.role,
          })
        } else {
          setErr('Usuário não encontrado!')
        }
      })
      .catch(() => {
        setErr('Erro ao carregar os usuários.')
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
      await http.put(`/users/${id}`, form)
      alert('Usuário atualizado com sucesso!')
      navigate('/users')
    } catch {
      setErr('Erro ao atualizar usuário.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h1>Editar Usuário</h1>
      {err && <p className="alert">{err}</p>}
      <form onSubmit={handleSubmit} className="form form--inline">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          required
        />
        <FormInput
          label="senha"
          type="password"
          name="password"
          value={form.password}
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
          {loading ? 'Atualizando...' : 'Salvar'}
        </Button>
      </form>
    </section>
  )
}