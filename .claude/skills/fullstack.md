# Skill: Full-Stack Expert

## Backend & APIs
- REST: sempre validar inputs, retornar status HTTP corretos (200/201/400/401/404/500)
- Autenticação: JWT (access + refresh token), nunca armazenar senha em texto puro
- Rate limiting: proteger rotas públicas de abuso
- Variáveis de ambiente: NUNCA hardcodar secrets, usar `.env` + validação no startup

## Banco de Dados (este projeto usa Prisma + PostgreSQL/Supabase)
- Sempre criar migrations, nunca editar banco diretamente em produção
- Índices: criar em campos usados em WHERE, JOIN, ORDER BY frequentes
- N+1 queries: usar `include` do Prisma ou joins explícitos
- Transações: operações interdependentes sempre dentro de `prisma.$transaction()`

## Node.js / TypeScript Backend
- Async/await sempre, nunca callbacks raw
- Error handling: try/catch em todas as rotas, never expose stack trace ao cliente
- Tipagem: interfaces para request body, response e dados do banco

## Mobile (Android / iOS)
- Android (Kotlin): ViewModel + StateFlow, Hilt para DI, Retrofit para HTTP
- iOS (Swift): MVVM, Combine ou async/await, URLSession ou Alamofire
- React Native / Flutter: compartilhar lógica de negócio, UI adaptada por plataforma
- Sempre testar em dispositivo real antes de considerar pronto

## Segurança (regras universais)
- Sanitizar todos os inputs antes de usar em queries ou HTML
- HTTPS sempre em produção
- CORS: allowlist explícita, nunca `*` em produção
- Logs: nunca logar dados sensíveis (senha, token, CPF, cartão)
