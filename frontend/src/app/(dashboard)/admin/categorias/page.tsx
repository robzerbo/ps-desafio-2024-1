import { Button } from '@/components/button'
import {
  DashboardContainer,
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuPackage, LuPlusCircle } from 'react-icons/lu'
import { DialogCreateCategory } from './_components/dialog-create-category'
import ListCategories from './_components/list-categories'

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
          <DialogCreateCategory>
            <Button>
              <LuPlusCircle />
              Novo usuário
            </Button>
          </DialogCreateCategory>
        </DashboardContainer>
        <ListCategories />
      </DashboardMain>
    </>
  )
}
