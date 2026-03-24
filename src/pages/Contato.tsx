import { useState, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { submitContact } from '../lib/api'
import { services } from '@/data/services'
import { useI18n } from '@/i18n/I18nProvider'

const RATE_LIMIT_MS = 30_000
const NOTIFY_URL = import.meta.env.VITE_NOTIFY_WEBHOOK_URL ?? ''

type UiText = {
  headerLabel: string
  headerTitle: string
  headerSubtitle: string
  labels: {
    name: string
    email: string
    phone: string
    company: string
    service: string
    select: string
    message: string
    lgpd: string
  }
  buttons: { sending: string; send: string }
  errors: {
    shortName: string
    invalidEmail: string
    shortMessage: string
    acceptData: string
    waitBeforeRetry: string
    sendError: string
  }
  success: { title: string; subtitle: string }
  schedule: {
    cta: string
    ctaSub: string
    pickDate: string
    pickTime: string
    confirm: string
    confirmed: string
    confirmedSub: string
    skip: string
    morning: string
    afternoon: string
    weekdays: string[]
    months: string[]
  }
}

const SCHEDULE_COMMON = {
  weekdays: { pt: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'], en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], es: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'], fr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'], zh: ['日','一','二','三','四','五','六'], hi: ['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'], ar: ['أحد','إثن','ثلا','أرب','خمي','جمع','سبت'], ru: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'] },
  months: { pt: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'], en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'], fr: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], zh: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], hi: ['जन','फर','मार','अप्रै','मई','जून','जुल','अग','सित','अक्टू','नव','दिस'], ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'], ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'] },
}

const uiByLang: Record<string, UiText> = {
  pt: {
    headerLabel: 'Contato', headerTitle: 'Fale conosco', headerSubtitle: 'Preencha o formulário e retornaremos em breve.',
    labels: { name: 'Nome *', email: 'Email *', phone: 'Telefone', company: 'Empresa', service: 'Serviço de interesse', select: 'Selecione', message: 'Mensagem *', lgpd: 'Aceito o uso dos dados conforme LGPD.' },
    buttons: { sending: 'Enviando...', send: 'Enviar' },
    errors: { shortName: 'Nome curto demais', invalidEmail: 'Email inválido', shortMessage: 'Mensagem curta demais', acceptData: 'Aceite o uso dos dados.', waitBeforeRetry: 'Aguarde antes de enviar novamente.', sendError: 'Erro ao enviar.' },
    success: { title: 'Mensagem enviada!', subtitle: 'Um de nossos especialistas entrará em contato em breve.' },
    schedule: { cta: 'Deseja agendar uma reunião?', ctaSub: 'Escolha uma data e horário de sua preferência.', pickDate: 'Selecione a data', pickTime: 'Selecione o horário', confirm: 'Confirmar agendamento', confirmed: 'Reunião agendada!', confirmedSub: 'Você receberá uma confirmação por email.', skip: 'Pular', morning: 'Manhã', afternoon: 'Tarde', weekdays: SCHEDULE_COMMON.weekdays.pt, months: SCHEDULE_COMMON.months.pt },
  },
  en: {
    headerLabel: 'Contact', headerTitle: 'Talk to us', headerSubtitle: 'Fill in the form and we will get back to you shortly.',
    labels: { name: 'Name *', email: 'Email *', phone: 'Phone', company: 'Company', service: 'Service of interest', select: 'Select', message: 'Message *', lgpd: 'I agree to the use of my data according to LGPD.' },
    buttons: { sending: 'Sending...', send: 'Send' },
    errors: { shortName: 'Name is too short', invalidEmail: 'Invalid email', shortMessage: 'Message is too short', acceptData: 'Please accept data usage.', waitBeforeRetry: 'Please wait before sending again.', sendError: 'Error while sending.' },
    success: { title: 'Message sent!', subtitle: 'One of our specialists will contact you shortly.' },
    schedule: { cta: 'Want to schedule a meeting?', ctaSub: 'Pick a date and time that works for you.', pickDate: 'Select a date', pickTime: 'Select a time', confirm: 'Confirm meeting', confirmed: 'Meeting scheduled!', confirmedSub: 'You will receive a confirmation email.', skip: 'Skip', morning: 'Morning', afternoon: 'Afternoon', weekdays: SCHEDULE_COMMON.weekdays.en, months: SCHEDULE_COMMON.months.en },
  },
  es: {
    headerLabel: 'Contacto', headerTitle: 'Habla con nosotros', headerSubtitle: 'Completa el formulario y te responderemos pronto.',
    labels: { name: 'Nombre *', email: 'Correo *', phone: 'Teléfono', company: 'Empresa', service: 'Servicio de interés', select: 'Seleccionar', message: 'Mensaje *', lgpd: 'Acepto el uso de datos según LGPD.' },
    buttons: { sending: 'Enviando...', send: 'Enviar' },
    errors: { shortName: 'Nombre demasiado corto', invalidEmail: 'Correo inválido', shortMessage: 'Mensaje demasiado corto', acceptData: 'Acepta el uso de datos.', waitBeforeRetry: 'Espera antes de enviar nuevamente.', sendError: 'Error al enviar.' },
    success: { title: '¡Mensaje enviado!', subtitle: 'Pronto uno de nuestros especialistas se pondrá en contacto.' },
    schedule: { cta: '¿Desea agendar una reunión?', ctaSub: 'Elija una fecha y hora de su preferencia.', pickDate: 'Seleccione la fecha', pickTime: 'Seleccione la hora', confirm: 'Confirmar reunión', confirmed: '¡Reunión agendada!', confirmedSub: 'Recibirá una confirmación por correo.', skip: 'Omitir', morning: 'Mañana', afternoon: 'Tarde', weekdays: SCHEDULE_COMMON.weekdays.es, months: SCHEDULE_COMMON.months.es },
  },
  fr: {
    headerLabel: 'Contact', headerTitle: 'Parlez-nous', headerSubtitle: 'Remplissez le formulaire et nous vous répondrons rapidement.',
    labels: { name: 'Nom *', email: 'Email *', phone: 'Téléphone', company: 'Entreprise', service: "Service d'intérêt", select: 'Sélectionner', message: 'Message *', lgpd: "J'accepte l'utilisation des données selon la LGPD." },
    buttons: { sending: 'Envoi...', send: 'Envoyer' },
    errors: { shortName: 'Nom trop court', invalidEmail: 'Email invalide', shortMessage: 'Message trop court', acceptData: "Acceptez l'utilisation des données.", waitBeforeRetry: "Veuillez patienter avant d'envoyer à nouveau.", sendError: "Erreur lors de l'envoi." },
    success: { title: 'Message envoyé !', subtitle: 'Un spécialiste vous contactera sous peu.' },
    schedule: { cta: 'Souhaitez-vous planifier une réunion ?', ctaSub: 'Choisissez une date et un horaire.', pickDate: 'Sélectionnez la date', pickTime: "Sélectionnez l'heure", confirm: 'Confirmer le rendez-vous', confirmed: 'Réunion planifiée !', confirmedSub: 'Vous recevrez une confirmation par email.', skip: 'Ignorer', morning: 'Matin', afternoon: 'Après-midi', weekdays: SCHEDULE_COMMON.weekdays.fr, months: SCHEDULE_COMMON.months.fr },
  },
  zh: {
    headerLabel: '联系', headerTitle: '联系我们', headerSubtitle: '请填写表单，我们会尽快回复。',
    labels: { name: '姓名 *', email: '邮箱 *', phone: '电话', company: '公司', service: '感兴趣的服务', select: '请选择', message: '消息 *', lgpd: '我同意根据LGPD使用我的数据。' },
    buttons: { sending: '发送中...', send: '发送' },
    errors: { shortName: '姓名太短', invalidEmail: '邮箱无效', shortMessage: '消息太短', acceptData: '请同意数据使用。', waitBeforeRetry: '请稍后再发送。', sendError: '发送出错。' },
    success: { title: '消息已发送！', subtitle: '我们的专家将尽快与您联系。' },
    schedule: { cta: '需要预约会议吗？', ctaSub: '选择您方便的日期和时间。', pickDate: '选择日期', pickTime: '选择时间', confirm: '确认预约', confirmed: '会议已预约！', confirmedSub: '您将收到确认邮件。', skip: '跳过', morning: '上午', afternoon: '下午', weekdays: SCHEDULE_COMMON.weekdays.zh, months: SCHEDULE_COMMON.months.zh },
  },
  hi: {
    headerLabel: 'संपर्क', headerTitle: 'हमसे बात करें', headerSubtitle: 'फॉर्म भरें, हम जल्द संपर्क करेंगे।',
    labels: { name: 'नाम *', email: 'ईमेल *', phone: 'फ़ोन', company: 'कंपनी', service: 'रुचि की सेवा', select: 'चुनें', message: 'संदेश *', lgpd: 'मैं LGPD के अनुसार डेटा उपयोग से सहमत हूँ।' },
    buttons: { sending: 'भेजा जा रहा है...', send: 'भेजें' },
    errors: { shortName: 'नाम बहुत छोटा है', invalidEmail: 'अमान्य ईमेल', shortMessage: 'संदेश बहुत छोटा है', acceptData: 'कृपया डेटा उपयोग स्वीकार करें।', waitBeforeRetry: 'कृपया दोबारा भेजने से पहले प्रतीक्षा करें।', sendError: 'भेजने में त्रुटि।' },
    success: { title: 'संदेश भेजा गया!', subtitle: 'जल्द ही हमारा विशेषज्ञ आपसे संपर्क करेगा।' },
    schedule: { cta: 'मीटिंग शेड्यूल करना चाहेंगे?', ctaSub: 'अपनी सुविधा अनुसार दिनांक और समय चुनें।', pickDate: 'तारीख चुनें', pickTime: 'समय चुनें', confirm: 'मीटिंग की पुष्टि करें', confirmed: 'मीटिंग शेड्यूल हो गई!', confirmedSub: 'आपको ईमेल पर पुष्टि मिलेगी।', skip: 'छोड़ें', morning: 'सुबह', afternoon: 'दोपहर', weekdays: SCHEDULE_COMMON.weekdays.hi, months: SCHEDULE_COMMON.months.hi },
  },
  ar: {
    headerLabel: 'اتصل بنا', headerTitle: 'تحدث معنا', headerSubtitle: 'املأ النموذج وسنرد عليك قريبًا.',
    labels: { name: 'الاسم *', email: 'البريد الإلكتروني *', phone: 'الهاتف', company: 'الشركة', service: 'الخدمة المطلوبة', select: 'اختر', message: 'الرسالة *', lgpd: 'أوافق على استخدام البيانات وفقًا لـ LGPD.' },
    buttons: { sending: 'جارٍ الإرسال...', send: 'إرسال' },
    errors: { shortName: 'الاسم قصير جدًا', invalidEmail: 'بريد إلكتروني غير صالح', shortMessage: 'الرسالة قصيرة جدًا', acceptData: 'يرجى قبول استخدام البيانات.', waitBeforeRetry: 'يرجى الانتظار قبل الإرسال مرة أخرى.', sendError: 'حدث خطأ أثناء الإرسال.' },
    success: { title: 'تم إرسال الرسالة!', subtitle: 'سيتواصل معك أحد المختصين قريبًا.' },
    schedule: { cta: 'هل تريد جدولة اجتماع؟', ctaSub: 'اختر التاريخ والوقت المناسبين لك.', pickDate: 'اختر التاريخ', pickTime: 'اختر الوقت', confirm: 'تأكيد الاجتماع', confirmed: 'تم جدولة الاجتماع!', confirmedSub: 'ستتلقى تأكيدًا عبر البريد الإلكتروني.', skip: 'تخطي', morning: 'صباحًا', afternoon: 'مساءً', weekdays: SCHEDULE_COMMON.weekdays.ar, months: SCHEDULE_COMMON.months.ar },
  },
  ru: {
    headerLabel: 'Контакты', headerTitle: 'Свяжитесь с нами', headerSubtitle: 'Заполните форму, и мы скоро ответим.',
    labels: { name: 'Имя *', email: 'Email *', phone: 'Телефон', company: 'Компания', service: 'Интересующая услуга', select: 'Выбрать', message: 'Сообщение *', lgpd: 'Я согласен на использование данных согласно LGPD.' },
    buttons: { sending: 'Отправка...', send: 'Отправить' },
    errors: { shortName: 'Слишком короткое имя', invalidEmail: 'Некорректный email', shortMessage: 'Сообщение слишком короткое', acceptData: 'Примите использование данных.', waitBeforeRetry: 'Подождите перед повторной отправкой.', sendError: 'Ошибка при отправке.' },
    success: { title: 'Сообщение отправлено!', subtitle: 'Один из наших специалистов скоро свяжется с вами.' },
    schedule: { cta: 'Хотите запланировать встречу?', ctaSub: 'Выберите удобную дату и время.', pickDate: 'Выберите дату', pickTime: 'Выберите время', confirm: 'Подтвердить встречу', confirmed: 'Встреча запланирована!', confirmedSub: 'Вы получите подтверждение на email.', skip: 'Пропустить', morning: 'Утро', afternoon: 'День', weekdays: SCHEDULE_COMMON.weekdays.ru, months: SCHEDULE_COMMON.months.ru },
  },
}

function getUi(lang: string): UiText {
  return uiByLang[lang] ?? uiByLang.pt
}

/* ── Mini calendar + time picker ── */
const TIME_SLOTS = [
  { time: '09:00', period: 'morning' },
  { time: '10:00', period: 'morning' },
  { time: '11:00', period: 'morning' },
  { time: '14:00', period: 'afternoon' },
  { time: '15:00', period: 'afternoon' },
  { time: '16:00', period: 'afternoon' },
  { time: '17:00', period: 'afternoon' },
] as const

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  return days
}

function SchedulePicker({ ui, onConfirm, onSkip }: { ui: UiText; onConfirm: (date: string, time: string) => void; onSkip: () => void }) {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const days = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth])

  const getDayStatus = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    const dow = d.getDay()
    const isWeekend = dow === 0 || dow === 6
    const isPast = d <= todayStart
    const isToday = d.getTime() === todayStart.getTime()
    return { isWeekend, isPast, isToday, disabled: isWeekend || isPast }
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      {/* Calendar */}
      <div>
        <p className="font-mono text-xs text-heavy/60 uppercase tracking-widest mb-3">{ui.schedule.pickDate}</p>
        <div className="rounded-xl border border-soft bg-pure p-4 sm:p-5">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} disabled={!canGoPrev} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-heavy/5 disabled:opacity-20 text-heavy/60 transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 3l-6 6 6 6"/></svg>
            </button>
            <span className="font-mono text-sm text-heavy font-semibold tracking-wide">{ui.schedule.months[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-heavy/5 text-heavy/60 transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 3l6 6-6 6"/></svg>
            </button>
          </div>

          {/* Weekday headers — weekend columns dimmed */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {ui.schedule.weekdays.map((w, idx) => {
              const isWeekendCol = idx === 0 || idx === 6
              return (
                <div key={w} className={`text-[10px] font-mono uppercase py-1.5 ${isWeekendCol ? 'text-heavy/20' : 'text-heavy/50 font-medium'}`}>
                  {w}
                </div>
              )
            })}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} />
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const { isWeekend, isPast, isToday, disabled } = getDayStatus(day)
              const selected = selectedDate === dateStr
              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={disabled}
                  onClick={() => { setSelectedDate(dateStr); setSelectedTime(null) }}
                  className="relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-mono transition-all group"
                  style={{
                    ...(selected
                      ? { background: '#1a5c3a', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px rgba(26,92,58,0.35)' }
                      : isPast
                        ? { color: 'rgba(0,0,0,0.18)', cursor: 'not-allowed' }
                        : isWeekend
                          ? { color: 'rgba(0,0,0,0.15)', cursor: 'not-allowed', background: 'rgba(0,0,0,0.02)' }
                          : {}),
                  }}
                  title={
                    isPast && !isToday ? 'Data passada' : isToday ? 'Hoje' : isWeekend ? 'Fim de semana' : undefined
                  }
                >
                  {/* Today indicator ring */}
                  {isToday && !selected && (
                    <span className="absolute inset-1 rounded-xl border-2 border-dashed border-heavy/15 pointer-events-none" />
                  )}

                  {/* Past day: strikethrough line */}
                  {isPast && !isToday && (
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ width: '60%', height: '1.5px', background: 'rgba(0,0,0,0.12)', borderRadius: '1px' }}
                    />
                  )}

                  {/* Weekend: small dot below number */}
                  {isWeekend && !isPast && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.10)' }}
                    />
                  )}

                  {/* Available day: subtle green dot on hover */}
                  {!disabled && !selected && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1a5c3a' }}
                    />
                  )}

                  <span className={`relative z-10 ${isPast && !isToday ? 'line-through decoration-heavy/15' : ''}`} style={isPast && !isToday ? { textDecorationThickness: '1.5px' } : undefined}>
                    {day}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-soft">
            <div className="flex items-center gap-1.5">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a5c3a', display: 'inline-block' }} />
              <span className="text-[10px] font-mono text-heavy/40 uppercase">Disponível</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ width: '8px', height: '2px', borderRadius: '1px', background: 'rgba(0,0,0,0.20)', display: 'inline-block' }} />
              <span className="text-[10px] font-mono text-heavy/40 uppercase">Passado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.15)', display: 'inline-block' }} />
              <span className="text-[10px] font-mono text-heavy/40 uppercase">Hoje</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div style={{ animation: 'fadeSlideUp 0.35s ease-out both' }}>
          <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <p className="font-mono text-xs text-heavy/60 uppercase tracking-widest mb-3">{ui.schedule.pickTime}</p>

          {/* Morning */}
          <p className="text-[10px] font-mono text-heavy/35 uppercase tracking-wider mb-2 ml-1">{ui.schedule.morning}</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {TIME_SLOTS.filter(s => s.period === 'morning').map(({ time }) => {
              const selected = selectedTime === time
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className="relative px-3 py-3 rounded-xl border text-sm font-mono transition-all text-center"
                  style={selected
                    ? { borderColor: '#1a5c3a', background: 'rgba(26,92,58,0.08)', color: '#1a5c3a', fontWeight: 700, boxShadow: '0 0 0 1px #1a5c3a' }
                    : { borderColor: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.55)' }
                  }
                >
                  {time}
                  {selected && (
                    <span className="absolute top-1 right-1.5">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1a5c3a" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Afternoon */}
          <p className="text-[10px] font-mono text-heavy/35 uppercase tracking-wider mb-2 ml-1">{ui.schedule.afternoon}</p>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.filter(s => s.period === 'afternoon').map(({ time }) => {
              const selected = selectedTime === time
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className="relative px-3 py-3 rounded-xl border text-sm font-mono transition-all text-center"
                  style={selected
                    ? { borderColor: '#1a5c3a', background: 'rgba(26,92,58,0.08)', color: '#1a5c3a', fontWeight: 700, boxShadow: '0 0 0 1px #1a5c3a' }
                    : { borderColor: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.55)' }
                  }
                >
                  {time}
                  {selected && (
                    <span className="absolute top-1 right-1.5">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1a5c3a" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Selection summary */}
      {selectedDate && selectedTime && (
        <div
          className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 flex items-center gap-3"
          style={{ animation: 'fadeSlideUp 0.25s ease-out both' }}
        >
          <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-mono text-sm text-accent font-medium">
            {selectedDate.split('-').reverse().join('/')} — {selectedTime}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onSkip}
          className="flex-1 px-4 py-3.5 rounded-xl border border-soft text-sm font-mono text-heavy/50 hover:text-heavy/80 hover:border-heavy/20 transition-colors"
        >
          {ui.schedule.skip}
        </button>
        <button
          type="button"
          disabled={!selectedDate || !selectedTime}
          onClick={() => selectedDate && selectedTime && onConfirm(selectedDate, selectedTime)}
          className="flex-1 px-4 py-3.5 rounded-xl text-sm font-mono font-medium transition-all"
          style={{
            background: selectedDate && selectedTime ? '#1a5c3a' : 'rgba(0,0,0,0.06)',
            color: selectedDate && selectedTime ? '#fff' : 'rgba(0,0,0,0.25)',
            cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
            boxShadow: selectedDate && selectedTime ? '0 2px 8px rgba(26,92,58,0.3)' : 'none',
          }}
        >
          {ui.schedule.confirm}
        </button>
      </div>
    </div>
  )
}

function makeSchema(ui: UiText) {
  return z.object({
    name: z.string().min(2, ui.errors.shortName),
    email: z.string().email(ui.errors.invalidEmail),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10, ui.errors.shortMessage),
    consentLgpd: z.literal(true, { errorMap: () => ({ message: ui.errors.acceptData }) }),
  })
}

type FormData = z.infer<ReturnType<typeof makeSchema>>

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="url(#spinner-grad)" strokeWidth="3" />
      <path
        className="opacity-90"
        fill="none"
        stroke="url(#spinner-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        d="M4 12a8 8 0 018-8"
      />
      <defs>
        <linearGradient id="spinner-grad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset="50%" stopColor="#e8e8e8" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Contato() {
  const { language } = useI18n()
  const ui = getUi(language)
  const [sent, setSent] = useState(false)
  const [scheduled, setScheduled] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const lastSubmitRef = useRef(0)
  const formDataRef = useRef<{ name: string; email: string; company?: string } | null>(null)
  const schema = makeSchema(ui)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const now = Date.now()
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      setError(ui.errors.waitBeforeRetry)
      return
    }
    setError('')
    setSubmitting(true)
    lastSubmitRef.current = now
    try {
      await submitContact(data)
      formDataRef.current = { name: data.name, email: data.email, company: data.company }
      reset()
      setSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : ui.errors.sendError)
    } finally {
      setSubmitting(false)
    }
  }

  const handleScheduleConfirm = (date: string, time: string) => {
    const lead = formDataRef.current
    if (NOTIFY_URL && lead) {
      fetch(NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          record: {
            name: lead.name,
            email: lead.email,
            company: lead.company ?? null,
            message: `Agendamento solicitado: ${date} ${time}`,
            source: 'schedule',
          },
        }),
      }).catch(() => {})
    }
    setScheduled(true)
  }

  if (scheduled) {
    return (
      <main className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-xl mx-auto text-center px-2">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-heavy">{ui.schedule.confirmed}</h1>
            <p className="mt-4 text-neutral">{ui.schedule.confirmedSub}</p>
          </div>
        </Container>
      </main>
    )
  }

  if (sent) {
    return (
      <main className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-xl mx-auto text-center px-2">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-heavy">{ui.success.title}</h1>
            <p className="mt-4 text-neutral">{ui.success.subtitle}</p>

            {/* Scheduling CTA */}
            <div className="mt-10 pt-8 border-t border-soft">
              <h2 className="font-display text-xl sm:text-2xl text-heavy">{ui.schedule.cta}</h2>
              <p className="mt-2 text-sm text-neutral">{ui.schedule.ctaSub}</p>
              <SchedulePicker
                ui={ui}
                onConfirm={handleScheduleConfirm}
                onSkip={() => setScheduled(true)}
              />
            </div>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="py-20">
      <Container>
        <SectionHeader
          label={ui.headerLabel}
          title={ui.headerTitle}
          subtitle={ui.headerSubtitle}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-4 w-full">
          {error && <p className="text-accent-danger">{error}</p>}
          <div>
            <label className="block font-mono text-sm text-heavy">{ui.labels.name}</label>
            <input {...register('name')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.name && <p className="text-sm text-accent-danger">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">{ui.labels.email}</label>
            <input type="email" {...register('email')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">{ui.labels.phone}</label>
            <input {...register('phone')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">{ui.labels.company}</label>
            <input {...register('company')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">{ui.labels.service}</label>
            <select {...register('service')} className="mt-1 w-full rounded-lg border border-soft px-4 py-2">
              <option value="">{ui.labels.select}</option>
              {services.map((s) => (
                <option key={s.id} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-sm text-heavy">{ui.labels.message}</label>
            <textarea {...register('message')} rows={4} className="mt-1 w-full rounded-lg border border-soft px-4 py-2" />
            {errors.message && <p className="text-sm text-accent-danger">{errors.message.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('consentLgpd')} />
            <label className="text-sm text-neutral">{ui.labels.lgpd}</label>
          </div>
          {errors.consentLgpd && <p className="text-sm text-accent-danger">{errors.consentLgpd.message}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 font-mono text-sm font-medium transition overflow-hidden text-center min-w-0 bg-accent text-pure hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Spinner />}
            {submitting ? ui.buttons.sending : ui.buttons.send}
          </button>
        </form>
      </Container>
    </main>
  )
}
