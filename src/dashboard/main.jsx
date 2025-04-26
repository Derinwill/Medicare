import Dashboard from "./DashBoard"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </React.StrictMode>
)  