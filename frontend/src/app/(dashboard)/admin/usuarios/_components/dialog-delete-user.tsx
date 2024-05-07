'use client'

import { destroyUser } from '@/actions/user'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogCreateUserProps {
  id: string
  children: React.ReactNode
}

export function DialogUserDelete({ id, children }: DialogCreateUserProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    try {
      await destroyUser(id)
      toast({
        title: 'Usuário deletado com sucesso!',
      })
    } catch (e) {
      toast({
        title: 'Não foi possível excluir o usuário!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de usuário</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este usuário? Esta ação é
            irreversível e removerá permanentemente o usuário do sistema. Deseja
            continuar com a exclusão?
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
