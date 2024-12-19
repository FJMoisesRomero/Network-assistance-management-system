// marcas/marca-dialog.tsx

import { useEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createMarca, updateMarca } from "@/app/actions/marca-actions"
import { useTransition } from "react"

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  descripcion: z.string().optional(),
  sitio_web: z.string().url({ message: "Debe ser una URL válida" }).optional().or(z.literal("")),
})

interface MarcaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  marca: any
  onClose: () => void
}

export function MarcaDialog({
  open,
  onOpenChange,
  marca,
  onClose,
}: MarcaDialogProps) {
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      sitio_web: "",
    },
  })

  // Sincroniza los valores del formulario con la marca seleccionada
  useEffect(() => {
    if (marca) {
      form.reset({
        nombre: marca.nombre || "",
        descripcion: marca.descripcion || "",
        sitio_web: marca.sitio_web || "",
      })
    } else {
      form.reset({
        nombre: "",
        descripcion: "",
        sitio_web: "",
      })
    }
  }, [marca, form])

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      if (marca) {
        await updateMarca(marca.id, formData)
      } else {
        await createMarca(formData)
      }

      form.reset()
      onClose() // Cierra el diálogo y refresca la tabla en `MarcasPage`
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {marca ? "Editar Marca" : "Crear Nueva Marca"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la marca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción de la marca"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sitio_web"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio Web</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
