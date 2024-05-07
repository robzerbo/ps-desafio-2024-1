'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { updateCategory } from '@/actions/category'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { categoryType } from '@/types/category'
import { ResponseErrorType } from '@/services/api'

interface DialogUpdateCategoryProps {
  category?: categoryType
  children: React.ReactNode
}

export function DialogUpdateCategory({
  category,
  children,
}: DialogUpdateCategoryProps) {
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

    const response = await updateCategory(newForm)
    if (response) {
      setError(await JSON.parse(response))
      toast({
        title: 'Não foi possível editar a categoria!',
      })
      return
    } else {
      toast({
        title: 'Categoria editada com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da categoria abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCategory error={error} category={category} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
