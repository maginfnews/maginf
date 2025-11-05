import React from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
        <div className="container-max">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-maginf-orange" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Seu direito à privacidade é importante para nós. Conheça como coletamos, 
            usamos e protegemos seus dados pessoais.
          </p>
          <p className="text-center text-gray-400 mt-4">
            Última atualização: 05 de Novembro de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* Introdução */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <FileText className="h-8 w-8 text-maginf-orange" />
              1. Introdução
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>MAGINF Tecnologia</strong> ("nós", "nosso" ou "empresa") está comprometida em 
              proteger a privacidade e os dados pessoais de nossos clientes, visitantes do site e usuários 
              de nossos serviços, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
              suas informações pessoais quando você utiliza nosso site ou contrata nossos serviços de TI.
            </p>
          </section>

          {/* Dados Coletados */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <Eye className="h-8 w-8 text-maginf-orange" />
              2. Dados que Coletamos
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.1. Dados Fornecidos por Você</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Dados de Contato:</strong> Nome, e-mail, telefone, empresa</li>
              <li><strong>Dados de Comunicação:</strong> Mensagens enviadas através de formulários</li>
              <li><strong>Dados Contratuais:</strong> Informações fornecidas ao contratar nossos serviços</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.2. Dados Coletados Automaticamente</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
              <li><strong>Cookies:</strong> Informações armazenadas para melhorar sua experiência</li>
              <li><strong>Dados de Uso:</strong> Como você interage com nosso site</li>
            </ul>
          </section>

          {/* Finalidade */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              3. Como Usamos Seus Dados
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>✓ Prestação de Serviços:</strong> Fornecer e gerenciar os serviços de TI contratados</p>
              <p><strong>✓ Comunicação:</strong> Responder suas solicitações e enviar informações relevantes</p>
              <p><strong>✓ Melhorias:</strong> Aprimorar nossos serviços e experiência do usuário</p>
              <p><strong>✓ Segurança:</strong> Proteger contra fraudes e garantir a segurança do site</p>
              <p><strong>✓ Conformidade Legal:</strong> Cumprir obrigações legais e regulatórias</p>
            </div>
          </section>

          {/* Compartilhamento */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              4. Compartilhamento de Dados
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Não vendemos seus dados pessoais.</strong> Podemos compartilhar suas informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Prestadores de Serviço:</strong> Empresas que nos auxiliam (hospedagem, e-mail, etc.)</li>
              <li><strong>Obrigações Legais:</strong> Quando exigido por lei ou ordem judicial</li>
              <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos legais</li>
              <li><strong>Com seu Consentimento:</strong> Quando você autorizar expressamente</li>
            </ul>
          </section>

          {/* Segurança */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <Lock className="h-8 w-8 text-maginf-orange" />
              5. Segurança dos Dados
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backup regular de dados</li>
              <li>Treinamento de equipe em proteção de dados</li>
            </ul>
          </section>

          {/* Seus Direitos */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              6. Seus Direitos (LGPD)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De acordo com a LGPD, você tem os seguintes direitos:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">✓ Confirmação e Acesso</p>
                <p className="text-sm text-gray-600">Saber se tratamos seus dados e acessá-los</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">✓ Correção</p>
                <p className="text-sm text-gray-600">Corrigir dados incompletos ou desatualizados</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">✓ Anonimização/Bloqueio</p>
                <p className="text-sm text-gray-600">Solicitar anonimização ou bloqueio</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">✓ Eliminação</p>
                <p className="text-sm text-gray-600">Excluir dados desnecessários</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">✓ Portabilidade</p>
                <p className="text-sm text-gray-600">Receber seus dados em formato estruturado</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">✓ Revogação</p>
                <p className="text-sm text-gray-600">Revogar consentimento a qualquer momento</p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              7. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode gerenciar 
              suas preferências de cookies através do banner exibido em nosso site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Tipos de cookies utilizados:</strong> Essenciais (funcionamento do site), 
              Analíticos (estatísticas de uso) e Funcionais (preferências do usuário).
            </p>
          </section>

          {/* Retenção */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              8. Retenção de Dados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
              descritas nesta política, salvo se um período de retenção maior for exigido ou permitido 
              por lei (obrigações fiscais, contratuais ou legais).
            </p>
          </section>

          {/* Alterações */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              9. Alterações nesta Política
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
              alterações significativas através de nosso site ou por e-mail. Recomendamos revisar 
              esta página regularmente.
            </p>
          </section>

          {/* Contato */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <Mail className="h-8 w-8 text-maginf-orange" />
              10. Contato - Encarregado de Dados (DPO)
            </h2>
            <div className="bg-maginf-orange/10 border-l-4 border-maginf-orange p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                entre em contato com nosso Encarregado de Proteção de Dados:
              </p>
              <div className="space-y-2 text-gray-800">
                <p><strong>E-mail:</strong> sac@maginf.com.br</p>
                <p><strong>Telefone:</strong> (11) 4610-6363</p>
                <p><strong>Endereço:</strong> Rua Carmela Antónia Fanganiello Cecchinato, 301 - Guarulhos, SP</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t pt-8 mt-12">
            <p className="text-center text-gray-600">
              <strong>MAGINF Tecnologia</strong> - Comprometidos com sua privacidade e segurança de dados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
