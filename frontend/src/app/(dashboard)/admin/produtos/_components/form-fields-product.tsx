'use client'

import { Button } from '@/components/button'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType, api } from '@/services/api'
import { categoryType } from '@/types/category'
import { productType } from '@/types/product'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsProductProps {
  product?: productType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsProduct({
  product,
  readOnly,
  error,
}: FormFieldsProductProps) {
  const { pending } = useFormStatus()

  // 'categories' é a constante que vai ficar todas as categorias
  // 'setCategories' é a função que vai permitir pegar todas elas sem atualizar a página
  const [categories, setCategories] = useState<categoryType[]>()

  const [updateImage, setUpdateImage] = useState<string | undefined>()

  // é feito a requisição das categorias de forma assíncrona com GET.
  // Para serem usadas no campo select
  const requestData = async () => {
    try {
      const response: categoryType[] = await api.get('/categories')
      setCategories(response)
    } catch (e) {
      return (
        // MUDAR
        <DashboardContainer className="text-destructive">
          Não foi possível obter as categorias
        </DashboardContainer>
      )
    }
  }

  // assim que o formField for aberto ele vai pegar todos os dados das categorias, chamando a função 'requestData()'
  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {product && (
          <Input defaultValue={product.id} type="text" name="id" hidden />
        )}
        {
          /* adicionado o label para o nome e o input para colocar-los */
          <FormField>
            <Label htmlFor="name" required={!product}>
              Nome
            </Label>
            <Input
              name="name"
              id="name"
              placeholder="Insira o nome do produto"
              defaultValue={product?.name}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.name}
            />
          </FormField>
        }
        {
          <FormField>
            <Label htmlFor="amount" required={!product}>
              Quantidade
            </Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              placeholder="Insira a quantidade do produto"
              defaultValue={product?.amount}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.amount}
            />
          </FormField>
        }
        {
          <FormField>
            <Label htmlFor="price" required={!product}>
              Preço
            </Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Insira o preço do produto"
              defaultValue={product?.price}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.price}
            />
          </FormField>
        }
        {
          <FormField>
            <Label htmlFor="category_id" required={!product}>
              Categoria
            </Label>
            <Select
              disabled={pending}
              name="category_id"
              defaultValue={product?.category.id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria que o produto possui" />
              </SelectTrigger>
              <SelectContent id="category_id">
                <SelectGroup id="category_id">
                  <SelectLabel>Categorias</SelectLabel>
                  {/* pega cada categoria e mostra o nome dela */}
                  {categories?.map((category: categoryType, index: number) => (
                    <SelectItem value={category.id} key={index}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>
        }
        {
          <FormField>
            <Label htmlFor="description" required={!product}>
              Descrição
            </Label>
            <Input
              name="description"
              id="description"
              placeholder="Insira a descrição do produto"
              defaultValue={product?.description}
              disabled={pending}
              readOnly={readOnly}
              error={error?.errors?.description}
            />
          </FormField>
        }
        {
          <FormField>
            <Label
              htmlFor="image"
              hidden={readOnly && !product?.image}
              required={!product}
            >
              Imagem
            </Label>
            <Input
              type="file" // pega o arquivo
              name="image"
              id="image"
              accept="image/*"
              disabled={pending}
              hidden={readOnly}
              onChange={(e) => handleImageChange(e, setUpdateImage)}
              error={error?.errors?.image}
            />
            <ImageForm
              className="aspect-square"
              src={updateImage || product?.image}
            />
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
