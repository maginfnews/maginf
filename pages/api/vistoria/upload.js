export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { imageBase64, fileName } = req.body

    if (!imageBase64) {
      return res.status(400).json({ error: 'Imagem não fornecida' })
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dxr6mywet'
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'vistoria_maginf'

    const formData = new URLSearchParams()
    formData.append('file', imageBase64)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', 'vistorias/marriott')
    if (fileName) formData.append('public_id', fileName)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Cloudinary error:', error)
      return res.status(500).json({ error: 'Erro ao fazer upload da imagem' })
    }

    const data = await response.json()

    return res.status(200).json({
      url: data.secure_url,
      publicId: data.public_id,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ error: error.message })
  }
}
