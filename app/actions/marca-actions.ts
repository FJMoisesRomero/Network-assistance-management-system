'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const marcaSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  descripcion: z.string().optional(),
  sitio_web: z.string().url({ message: "Debe ser una URL válida" }).optional().or(z.literal("")),
})

export async function createMarca(formData: FormData) {
  const validatedFields = marcaSchema.parse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    sitio_web: formData.get('sitio_web'),
  })

  try {
    await prisma.marcas.create({
      data: {
        ...validatedFields,
        parabolas: { create: [] },
        equipos_modelos: { create: [] },
        casillas: { create: [] },
      },
    })

    revalidatePath('/marcas')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Error al crear la marca' }
  }
}

export async function updateMarca(id: number, formData: FormData) {
  const validatedFields = marcaSchema.parse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    sitio_web: formData.get('sitio_web'),
  })

  try {
    await prisma.marcas.update({
      where: { id },
      data: validatedFields,
    })

    revalidatePath('/marcas')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Error al actualizar la marca' }
  }
}

export async function getMarcas() {
  try {
    return await prisma.marcas.findMany({
      include: {
        _count: {
          select: {
            parabolas: true,
            equipos_modelos: true,
            casillas: true,
          },
        },
      },
    })
  } catch (error) {
    throw new Error('Error al obtener las marcas')
  }
}