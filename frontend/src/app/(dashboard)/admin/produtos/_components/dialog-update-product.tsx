'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProduct from './form-fields-product'
import { updateProduct } from '@/actions/product'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { productType } from '@/types/product'
import { ResponseErrorType } from '@/services/api'

interface DialogUpdateProductProps {
  product?: productType
  children: React.ReactNode
}

export function DialogUpdateProduct({
  product,
  children,
}: DialogUpdateProductProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    setError(null)
    const newForm = await filterFormData(form)

    const response = await updateProduct(newForm)
    if (response) {
      setError(await JSON.parse(response))
      toast({
        title: 'Não foi possível editar o produto!',
      })
      return
    } else {
      toast({
        title: 'Produto editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>
            Atualize as informações do produto abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsProduct error={error} product={product} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
