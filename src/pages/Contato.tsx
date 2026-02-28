import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { submitContact } from '../lib/api'
import { services } from '@/data/services'

const schema = z.object({
  name: z.string().min(2, 'Nome curto demais'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Mensagem curta demais'),
  consentLgpd: z.literal(true, { errorMap: () => ({ message: 'Aceite o uso dos dados.' }) }),
})

type FormData = z.infer<typeof schema>

export function Contato() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      await submitContact(data)
      setSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao enviar.')
    }
  }

  if (sent) {
    return (
      <main className="py-20">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <h1 className="font-display text-3xl text-heavy">Mensagem enviada!</h1>
            <p className="mt-4 text-neutral">Em breve entraremos em contato.</p>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="py-20">
      <Container>
        <SectionHeader
          label="Contato"
          title="Fale conosco"
          subtitle="Preencha o formulário e retornaremos em breve."
        />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-4">
          {error && <p className="text-accent-danger">{error}</p>}
          <div>
            <label className="block font-mono text-sm text-heavy">Nome *</label>
            <input {...register('name')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.name && <p className="text-sm text-accent-danger">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">Email *</label>
            <input type="email" {...register('email')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">Telefone</label>
            <input {...register('phone')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">Empresa</label>
            <input {...register('company')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">Serviço de interesse</label>
            <select {...register('service')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2">
              <option value="">Selecione</option>
              {services.map((s) => (
                <option key={s.id} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">Mensagem *</label>
            <textarea {...register('message')} rows={4} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.message && <p className="text-sm text-accent-danger">{errors.message.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('consentLgpd')} />
            <label className="text-sm text-neutral">Aceito o uso dos dados conforme LGPD.</label>
          </div>
          {errors.consentLgpd && <p className="text-sm text-accent-danger">{errors.consentLgpd.message}</p>}
          <Button type="submit" variant="primary">Enviar</Button>
        </form>
      </Container>
    </main>
  )
}
