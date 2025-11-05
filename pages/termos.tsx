import React from 'react';
import { FileText, AlertCircle, CheckCircle, Scale } from 'lucide-react';

export default function Termos() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maginf-gray to-maginf-gray-light text-white py-20">
        <div className="container-max">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-16 w-16 text-maginf-orange" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            Termos de Uso
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Leia atentamente os termos e condições de uso de nosso site e serviços.
          </p>
          <p className="text-center text-gray-400 mt-4">
            Última atualização: 05 de Novembro de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* Aceitação */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-maginf-orange" />
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ao acessar e usar o site da <strong>MAGINF Tecnologia</strong> (www.maginf.com.br) 
              ou contratar nossos serviços, você concorda em cumprir e estar vinculado a estes 
              Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize 
              nosso site ou serviços.
            </p>
          </section>

          {/* Serviços */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              2. Serviços Oferecidos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A MAGINF oferece serviços de tecnologia da informação, incluindo mas não limitado a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Serviços Gerenciados de TI (MSP)</li>
              <li>Infraestrutura e Cloud Computing</li>
              <li>Sistemas de CFTV e Segurança</li>
              <li>Suporte Técnico 24/7</li>
              <li>Fornecimento de Hardware e Software</li>
              <li>Consultoria em Tecnologia</li>
            </ul>
          </section>

          {/* Uso do Site */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              3. Uso Aceitável do Site
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Você concorda em NÃO:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Usar o site para fins ilegais ou não autorizados</li>
                <li>Tentar obter acesso não autorizado a sistemas ou redes</li>
                <li>Interferir ou interromper o funcionamento do site</li>
                <li>Transmitir vírus, malware ou código malicioso</li>
                <li>Coletar informações de outros usuários sem consentimento</li>
                <li>Fazer uso comercial não autorizado do conteúdo</li>
              </ul>
            </div>
          </section>

          {/* Propriedade Intelectual */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              4. Propriedade Intelectual
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Todo o conteúdo deste site, incluindo textos, gráficos, logos, imagens, vídeos e 
              software, é propriedade da MAGINF Tecnologia ou de seus fornecedores e está protegido 
              por leis de direitos autorais e propriedade intelectual.
            </p>
            <p className="text-gray-700 leading-relaxed">
              É proibida a reprodução, distribuição ou modificação de qualquer conteúdo sem 
              autorização prévia por escrito.
            </p>
          </section>

          {/* Contratos de Serviço */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              5. Contratos de Serviço
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Os serviços de TI são fornecidos mediante contrato específico que estabelece:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Escopo:</strong> Detalhamento dos serviços contratados</li>
              <li><strong>SLA:</strong> Acordos de nível de serviço e prazos de atendimento</li>
              <li><strong>Valores:</strong> Preços, forma de pagamento e reajustes</li>
              <li><strong>Vigência:</strong> Prazo de duração e condições de renovação</li>
              <li><strong>Responsabilidades:</strong> Obrigações de ambas as partes</li>
            </ul>
          </section>

          {/* Pagamentos */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              6. Pagamentos e Faturamento
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>6.1. Formas de Pagamento:</strong> Aceitamos boleto bancário, 
                transferência bancária e PIX, conforme especificado no contrato.
              </p>
              <p>
                <strong>6.2. Vencimento:</strong> Os pagamentos devem ser realizados nas datas 
                estabelecidas no contrato. Atrasos podem resultar em juros e multa.
              </p>
              <p>
                <strong>6.3. Suspensão:</strong> Inadimplência pode resultar na suspensão 
                temporária dos serviços até regularização.
              </p>
            </div>
          </section>

          {/* Garantias e Limitações */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-maginf-orange" />
              7. Garantias e Limitações
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>7.1. Garantia de Serviços:</strong> Nos comprometemos a fornecer serviços 
              de qualidade conforme especificado nos SLAs contratados.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>7.2. Limitação de Responsabilidade:</strong> A MAGINF não se responsabiliza 
              por danos indiretos, lucros cessantes ou perda de dados causados por fatores externos 
              ao nosso controle (força maior, falhas de terceiros, etc.).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>7.3. Backup:</strong> Recomendamos fortemente que clientes mantenham backups 
              independentes de dados críticos.
            </p>
          </section>

          {/* Confidencialidade */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              8. Confidencialidade
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ambas as partes concordam em manter confidenciais todas as informações sensíveis 
              compartilhadas durante a prestação de serviços, incluindo dados técnicos, comerciais 
              e estratégicos. Esta obrigação permanece válida mesmo após o término do contrato.
            </p>
          </section>

          {/* Rescisão */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              9. Rescisão
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>9.1. Rescisão pelo Cliente:</strong> O cliente pode rescindir o contrato 
              mediante aviso prévio de 30 dias, conforme condições contratuais.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>9.2. Rescisão pela MAGINF:</strong> Podemos rescindir em caso de 
              inadimplência, violação dos termos ou uso indevido dos serviços.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>9.3. Devolução de Dados:</strong> Após rescisão, forneceremos os dados 
              do cliente em formato adequado, conforme acordado.
            </p>
          </section>

          {/* Alterações */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              10. Alterações nos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
              Alterações significativas serão comunicadas através do site ou por e-mail. 
              O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          {/* Lei Aplicável */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6">
              11. Lei Aplicável e Foro
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
              Fica eleito o foro da comarca de Guarulhos, Estado de São Paulo, para dirimir 
              quaisquer controvérsias decorrentes destes termos.
            </p>
          </section>

          {/* Contato */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-maginf-gray mb-6 flex items-center gap-3">
              <FileText className="h-8 w-8 text-maginf-orange" />
              12. Contato
            </h2>
            <div className="bg-maginf-orange/10 border-l-4 border-maginf-orange p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Para dúvidas sobre estes Termos de Uso ou sobre nossos serviços:
              </p>
              <div className="space-y-2 text-gray-800">
                <p><strong>MAGINF Tecnologia</strong></p>
                <p><strong>E-mail:</strong> sac@maginf.com.br</p>
                <p><strong>Telefone:</strong> (11) 4610-6363</p>
                <p><strong>Endereço:</strong> Rua Carmela Antónia Fanganiello Cecchinato, 301 - Guarulhos, SP</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t pt-8 mt-12">
            <p className="text-center text-gray-600">
              Ao utilizar nossos serviços, você declara ter lido, compreendido e concordado com estes Termos de Uso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
