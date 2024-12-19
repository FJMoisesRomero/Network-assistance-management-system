// marcas/page.tsx

"use client"
import { Suspense, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle, Pencil } from 'lucide-react'
import { MarcaDialog } from '@/components/marcas/marca-dialog'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getMarcas } from '../actions/marca-actions'

export interface Marca {
  id: number
  nombre: string
  descripcion: string | null
  sitio_web: string | null
  created_at: Date
  updated_at: Date
  _count?: {
    parabolas: number
    equipos_modelos: number
    casillas: number
  }
}

async function fetchMarcas() {
  const marcas = await getMarcas()
  return marcas
}

export default function MarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null)

  // Función para obtener y actualizar las marcas
  const loadMarcas = async () => {
    const data = await fetchMarcas()
    setMarcas(data)
  }

  // Abrir el diálogo para crear o editar una marca
  const handleOpenDialog = (marca?: Marca) => {
    setSelectedMarca(marca || null)
    setDialogOpen(true)
  }

  // Cargar las marcas cuando el componente se monta
  useEffect(() => {
    loadMarcas()
  }, [])

  return (
    <div className="container mx-auto py-10 flex flex-col ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex-1">Marcas</h1>
        <Button onClick={() => handleOpenDialog()} className="ml-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Marca
        </Button>
      </div>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Sitio Web</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead>Actualizado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marcas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No hay marcas registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  marcas.map((marca) => (
                    <TableRow key={marca.id}>
                      <TableCell className="font-medium">{marca.nombre}</TableCell>
                      <TableCell>{marca.descripcion || '-'}</TableCell>
                      <TableCell>
                        {marca.sitio_web ? (
                          <a
                            href={marca.sitio_web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {marca.sitio_web}
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(marca.created_at), 'PPp', { locale: es })}
                      </TableCell>
                      <TableCell>
                        {format(new Date(marca.updated_at), 'PPp', { locale: es })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(marca)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Suspense>
        </div>
      </div>

      <MarcaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        marca={selectedMarca}
        onClose={() => {
          setDialogOpen(false)
          loadMarcas() // Refresca las marcas después de cerrar el diálogo
        }}
      />
    </div>
  )
}
