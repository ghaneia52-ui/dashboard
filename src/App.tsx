import DashboardContainerPages from "./pages/dashboard/dashboardContainer/dashboardContainer"
import DashboardSidebarPages from "./pages/dashboard/dashboardSideBar/dashboardSidebar"
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";

function App() {

  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <DashboardSidebarPages/>
      <DashboardContainerPages/>
    </QueryClientProvider>
  )
}

export default App