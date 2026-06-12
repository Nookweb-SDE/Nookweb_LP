import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { submitContact } from '../lib/api'
import { services } from '@/data/services'
import { useI18n } from '@/lib/i18n'

type FormData = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message: string
  consentLgpd: true
}

export function Contato() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { t, tArr, lang } = useI18n()

  const schema = z.object({
    name:        z.string().min(2, t('contato', 'erroCurto')),
    email:       z.string().email(t('contato', 'erroEmail')),
    phone:       z.string().optional(),
    company:     z.string().optional(),
    service:     z.string().optional(),
    budget:      z.string().optional(),
    message:     z.string().min(10, t('contato', 'erroMensagem')),
    consentLgpd: z.literal(true, { errorMap: () => ({ message: t('contato', 'erroLgpd') }) }),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      await submitContact(data)
      setSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : t('geral', 'erro'))
    }
  }

  const budgetOptions = tArr('contato', 'budgetOptions')

  if (sent) {
    return (
      <main className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-xl mx-auto text-center px-2">
            <h1 className="font-display text-2xl sm:text-3xl text-heavy">{t('contato', 'sucesso')}</h1>
            <p className="mt-4 text-neutral">{t('contato', 'sucessoSub')}</p>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="py-20">
      <Container>
        <SectionHeader
          label={t('contato', 'label')}
          title={t('contato', 'title')}
          subtitle={t('contato', 'subtitle')}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-4 w-full">
          {error && <p className="text-accent-danger">{error}</p>}

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'nome')}</label>
            <input {...register('name')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.name && <p className="text-sm text-accent-danger">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'email')}</label>
            <input type="email" {...register('email')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'telefone')}</label>
            <input {...register('phone')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
          </div>

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'empresa')}</label>
            <input {...register('company')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
          </div>

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'servico')}</label>
            <select {...register('service')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2">
              <option value="">{t('contato', 'servicoPlaceholder')}</option>
              {services.map((s) => (
                <option key={s.id} value={s.slug}>
                  {(lang !== 'pt' ? (t as any)('servicesData', s.slug as any) : null) ?? s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'budget')}</label>
            <select {...register('budget')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2">
              <option value=""></option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-sm text-heavy">{t('contato', 'mensagem')}</label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder={t('contato', 'mensagemPlaceholder')}
              className="mt-1 w-full rounded-lg border border-soft px-4 py-2"
            />
            {errors.message && <p className="text-sm text-accent-danger">{errors.message.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('consentLgpd')} />
            <label className="text-sm text-neutral">{t('contato', 'lgpd')}</label>
          </div>
          {errors.consentLgpd && <p className="text-sm text-accent-danger">{errors.consentLgpd.message}</p>}

          <Button type="submit" variant="primary">{t('contato', 'enviar')}</Button>
        </form>
      </Container>
    </main>
  )
}
