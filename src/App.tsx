import {
    WelcomePage,
    GitHubBanner,
    Refine,
    Authenticated,
  } from "@refinedev/core";
  import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
  import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
  
  
  import { useNotificationProvider } from "@refinedev/antd";
  import "@refinedev/antd/dist/reset.css";
  
  
  import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages";
  
  
  import { dataProvider, liveProvider } from "./Providers";
  import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    UnsavedChangesNotifier,
  } from "@refinedev/react-router-v6";
  
  
  import { App as AntdApp } from "antd";
  import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
  import { authProvider } from "./Providers";
  import Layout from "./components/layout";
  import { resources } from "./config/resources";
  import Create from "./pages/company/create";
  import EditPage from "./pages/company/edit";
  
  
  function App() {
    return (
      <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "zxb4Am-piUzGC-vyi7j1",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
  
  
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<EditPage />} />
                    </Route>
                  </Route>
                </Routes>
  
  
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </RefineKbarProvider>
      </BrowserRouter>
    );
  }
  
  
  export default App;
  
  
  
  
  