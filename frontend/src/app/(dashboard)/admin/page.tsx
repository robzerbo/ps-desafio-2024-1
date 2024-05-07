import {
  DashboardContainer,
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuHome } from 'react-icons/lu'

export default function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuHome />
          Home
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Tela principal da aplicação.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <DashboardContainer></DashboardContainer>
      </DashboardMain>
    </>
  )
}
