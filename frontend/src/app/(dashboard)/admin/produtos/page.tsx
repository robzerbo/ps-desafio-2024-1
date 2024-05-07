import { Button } from '@/components/button'
import {
  DashboardContainer,
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuPackage, LuPlusCircle } from 'react-icons/lu'
import { DialogCreateProduct } from './_components/dialog-create-product'
import ListProducts from './_components/list-products'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuPackage />
          Produtos
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua produtos.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <DashboardContainer className="flex justify-end">
          <DialogCreateProduct>
            <Button>
              <LuPlusCircle />
              Novo usuário
            </Button>
          </DialogCreateProduct>
        </DashboardContainer>
        <ListProducts />
      </DashboardMain>
    </>
  )
}
