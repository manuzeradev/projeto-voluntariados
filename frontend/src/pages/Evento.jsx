import { useEffect, useState } from 'react'
import { http } from '../api/http'
import '../Table.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Evento() {
  const navigate = useNavigate()
  const [eventos, setEventos] = useState({ listagem: [] })
  const [inscricoes, setInscricoes] = useState({ listagem: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    Promise.all([http.get('/events'), http.get('/events/subscribes')])
      .then(([{ data: eventosData }, { data: subscribesData }]) => {
        setEventos(eventosData)

        const inscricoesUser = subscribesData
          .filter((s) => s.idUser === user?.id)
          .map((s) => s.idEvent)

        setInscricoes(new Set(inscricoesUser))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [user])

  const excluirEvento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      http
        .delete(`/events/${id}`)
        .then(() => {
          setEventos({
            listagem: eventos.listagem.filter((evento) => evento.id !== id),
          })
          alert('Evento excluído com sucesso!')
        })
        .catch(() => {
          alert('Erro ao excluir o evento. Tente novamente mais tarde.')
        })
    }
  }

  const inscreverEvento = (idEvento) => {
    http
      .post(`/events/${idEvento}/user/${user.id}`)
      .then(() => {
        alert('Inscrição realizada com sucesso!')
        setInscricoes((prev) => new Set([...prev, idEvento]))
      })
      .catch(() => {
        alert('Erro ao se inscrever. Tente novamente.')
      })
  }

  const desinscreverEvento = (idEvento) => {
    http
      .delete(`/events/${idEvento}/user/${user.id}`)
      .then(() => {
        alert('Você saiu do evento!')
        setInscricoes((prev) => {
          const novo = new Set(prev)
          novo.delete(idEvento)
          return novo
        })
      })
      .catch(() => {
        alert('Erro ao sair do evento. Tente novamente.')
      })
  }

  if (loading) {
    return (
      <section className="card">
        <p>Carregando dados...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="card">
        <p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>
      </section>
    )
  }

  return (
    <section className="card">
      <h1>Listagem de Eventos</h1>
      {user != null && user.role == 'admin' && (
        <>
          <button className="btn" onClick={() => navigate('/IncluirEvento')}>
            Incluir
          </button>
          <hr />
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {}
          {eventos.listagem.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.nome}</td>
              <td>{new Date(evento.data).toLocaleDateString('pt-BR')}</td>
              {user != null && user.role == 'admin' && (
                <td>
                  <button
                    className="btnEdt"
                    onClick={() => navigate(`/EditarEvento/${evento.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btnDel"
                    onClick={() => excluirEvento(evento.id)}
                  >
                    Excluir
                  </button>
                </td>
              )}
              {user?.role === 'user' && (
                <td>
                  {inscricoes.has(evento.id) ? (
                    <button
                      className="btnDel"
                      onClick={() => desinscreverEvento(evento.id)}
                    >
                      Desinscrever
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => inscreverEvento(evento.id)}
                    >
                      Inscrever
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
