'use client'

import { Button } from '@/components/button'
import { FormFieldsGroup, FormField } from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { useFormStatus } from 'react-dom'

interface FormFieldsCategoryProps {
  category?: categoryType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCategory({
  category,
  readOnly,
  error,
}: FormFieldsCategoryProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {category && (
          <Input defaultValue={category.id} type="text" name="id" hidden />
        )}
        {
          /* adicionado o label para o nome e o input para colocar-lo */
          <FormField>
            <Label htmlFor="name" required={!category}>
              Nome
            </Label>
            <Input
              name="name"
              id="name"
              placeholder="Insira o nome da categoria"
              defaultValue={category?.name}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.name}
            ></Input>
          </FormField>
        }
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
