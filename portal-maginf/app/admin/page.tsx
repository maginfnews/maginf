'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Building, 
  Mail, 
  Phone,
  MapPin,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react'
import AdminProtection from '../../components/AdminProtection'

interface Client {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  address?: string
  active: boolean
  createdAt: string
  _count: {
    users: number
    monitors: number
  }
}

function AdminPageContent() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937'
  })

  // Carregar dados quando componente monta
  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      const data = await response.json()
      if (data.success) {
        setClients(data.clients)
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingClient ? `/api/admin/clients/${editingClient.id}` : '/api/admin/clients'
      const method = editingClient ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        await fetchClients()
        setShowForm(false)
        setEditingClient(null)
        setFormData({
          name: '',
          slug: '',
          email: '',
          phone: '',
          address: '',
          adminName: '',
          adminEmail: '',
          adminPassword: '',
          primaryColor: '#3B82F6',
          secondaryColor: '#1F2937'
        })
      } else {
        alert('Erro: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      alert('Erro ao salvar cliente')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      slug: client.slug,
      email: client.email,
      phone: client.phone || '',
      address: client.address || '',
      adminName: '',
      adminEmail: '',
      adminPassword: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1F2937'
    })
    setShowForm(true)
  }

  const handleDelete = async (clientId: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        await fetchClients()
      } else {
        alert('Erro: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error)
      alert('Erro ao excluir cliente')
    }
  }

  // Loading dos dados
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maginf-orange mx-auto"></div>
          <p className="mt-4 text-maginf-gray-dark">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-title text-maginf-dark">Administração de Clientes</h1>
            <p className="text-maginf-gray-dark">Gerencie os clientes do Portal MAGINF</p>
          </div>
          <button
            onClick={() => {
              setEditingClient(null)
              setFormData({
                name: '',
                slug: '',
                email: '',
                phone: '',
                address: '',
                adminName: '',
                adminEmail: '',
                adminPassword: '',
                primaryColor: '#3B82F6',
                secondaryColor: '#1F2937'
              })
              setShowForm(true)
            }}
            className="flex items-center space-x-2 bg-maginf-orange text-white px-4 py-2 rounded-maginf hover:bg-maginf-orange-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Novo Cliente</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-maginf">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-maginf flex items-center justify-center">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-maginf-gray-dark">Total de Clientes</p>
                <p className="text-2xl font-bold text-maginf-dark">{clients.length}</p>
              </div>
            </div>
          </div>
          <div className="card-maginf">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-maginf flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-maginf-gray-dark">Clientes Ativos</p>
                <p className="text-2xl font-bold text-maginf-dark">
                  {clients.filter(c => c.active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="card-maginf">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-maginf flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-maginf-gray-dark">Total de Usuários</p>
                <p className="text-2xl font-bold text-maginf-dark">
                  {clients.reduce((acc, c) => acc + c._count.users, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="card-maginf">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-maginf-dark">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-maginf-dark">Contato</th>
                  <th className="text-left py-3 px-4 font-medium text-maginf-dark">Usuários</th>
                  <th className="text-left py-3 px-4 font-medium text-maginf-dark">Monitores</th>
                  <th className="text-left py-3 px-4 font-medium text-maginf-dark">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-maginf-dark">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-maginf-dark">{client.name}</p>
                        <p className="text-sm text-maginf-gray-dark">/{client.slug}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-maginf-gray-dark" />
                          <span className="text-sm text-maginf-gray-dark">{client.email}</span>
                        </div>
                        {client.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-maginf-gray-dark" />
                            <span className="text-sm text-maginf-gray-dark">{client.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-maginf-dark">{client._count.users}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-maginf-dark">{client._count.monitors}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-maginf max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-title text-maginf-dark mb-6">
                  {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Dados da Empresa */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-maginf-dark mb-2">
                        Nome da Empresa *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maginf-dark mb-2">
                        Slug (URL) *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-maginf-dark mb-2">
                        Email da Empresa *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maginf-dark mb-2">
                        Telefone
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-maginf-dark mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                      placeholder="Cidade, Estado"
                    />
                  </div>

                  {/* Usuário Administrador */}
                  {!editingClient && (
                    <>
                      <div className="border-t pt-4 mt-6">
                        <h3 className="text-lg font-medium text-maginf-dark mb-4">Usuário Administrador</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-maginf-dark mb-2">
                            Nome do Admin *
                          </label>
                          <input
                            type="text"
                            value={formData.adminName}
                            onChange={(e) => setFormData(prev => ({ ...prev, adminName: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                            required={!editingClient}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-maginf-dark mb-2">
                            Email do Admin *
                          </label>
                          <input
                            type="email"
                            value={formData.adminEmail}
                            onChange={(e) => setFormData(prev => ({ ...prev, adminEmail: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                            required={!editingClient}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-maginf-dark mb-2">
                          Senha Inicial *
                        </label>
                        <input
                          type="password"
                          value={formData.adminPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, adminPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-maginf focus:outline-none focus:ring-2 focus:ring-maginf-orange"
                          placeholder="Mínimo 6 caracteres"
                          required={!editingClient}
                          minLength={6}
                        />
                      </div>
                    </>
                  )}

                  {/* Personalização */}
                  <div className="border-t pt-4 mt-6">
                    <h3 className="text-lg font-medium text-maginf-dark mb-4">Personalização</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-maginf-dark mb-2">
                        Cor Primária
                      </label>
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-full h-10 border border-gray-300 rounded-maginf"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maginf-dark mb-2">
                        Cor Secundária
                      </label>
                      <input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-full h-10 border border-gray-300 rounded-maginf"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-maginf-gray-dark hover:text-maginf-dark"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-maginf-orange text-white rounded-maginf hover:bg-maginf-orange-dark disabled:opacity-50"
                    >
                      {loading ? 'Salvando...' : editingClient ? 'Atualizar' : 'Criar Cliente'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminProtection>
      <AdminPageContent />
    </AdminProtection>
  )
}
