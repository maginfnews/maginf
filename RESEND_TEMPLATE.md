# Template Resend

Use o arquivo `.env.local.template` como base e copie para `.env.local`.

Campos principais:

```env
RESEND_API_KEY=re_sua_chave_aqui
RESEND_FROM_EMAIL=contato@notificacao.maginf.com.br
RESEND_FROM_NAME=Site MAGINF
RESEND_CONTACT_TO=maicon@magpass.com.br
```

Regras importantes:

- `RESEND_API_KEY`: precisa ter acesso ao dominio verificado no Resend.
- `RESEND_FROM_EMAIL`: precisa usar um dominio/remetente validado no painel do Resend.
- `RESEND_CONTACT_TO`: e o email que vai receber os leads do formulario e do diagnostico.

Arquivo de referencia:

- `.env.local.template`
- `pages/api/contact.ts`
