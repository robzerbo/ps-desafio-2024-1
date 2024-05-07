'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsUser from './form-fields-user'
import { updateUser } from '@/actions/user'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { userType } from '@/types/user'
import { ResponseErrorType } from '@/services/api'

interface DialogUpdateUserProps {
  user?: userType
  children: React.ReactNode
}

export function DialogUpdateUser({ user, children }: DialogUpdateUserProps) {
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

    const response = await updateUser(newForm)
    if (response) {
      setError(await JSON.parse(response))
      toast({
        title: 'Não foi possível editar o usuário!',
      })
      return
    } else {
      toast({
        title: 'Usuário editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsUser error={error} user={user} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
