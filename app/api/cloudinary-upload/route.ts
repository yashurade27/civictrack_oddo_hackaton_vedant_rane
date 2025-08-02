import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const res = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, function (error, result) {
        if (error) reject(error)
        resolve(result)
      })
      .end(buffer)
  })

  return NextResponse.json(res)
}
