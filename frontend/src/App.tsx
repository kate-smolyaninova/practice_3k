import AgreementTrendsChart from "./components/сharts/AgreementTrendsChart.tsx";
import IndustryCoverageChart from "./components/сharts/IndustryCoverageChart.tsx";
import OrganizationTypesChart from "./components/сharts/OrganizationTypesChart.tsx";
import OwnershipStructureChart from "./components/сharts/OwnershipStructureChart.tsx";
import QuarterlyTrendsCharts from "./components/сharts/QuarterlyTrendsCharts.tsx";
import CompareAreasWithRegionChart from "./components/сharts/CompareAreasWithRegionChart.tsx";
import ActualizationStatusChart from "./components/сharts/ActualizationStatusChart.tsx";
import InfoblockRow from "./components/infoblock/InfoblockRow.tsx";
import "./styles/app.css";
import Header from "./components/header/index.tsx";

function App() {
  return (
    <div className="app-wrapper">
      <div className="chart-row-01">
        <Header />
        <InfoblockRow />
      </div>

      <div className="chart-row-0">
        <IndustryCoverageChart />
      </div>

      <div className="chart-row-1">
        <QuarterlyTrendsCharts />
        <CompareAreasWithRegionChart />
        <ActualizationStatusChart />
      </div>

      <div className="chart-row-2">
        <div className="pie-wrapper">
          <OwnershipStructureChart />
          <OrganizationTypesChart />
        </div>

        <div className="ATCWrapper">
          <AgreementTrendsChart />
        </div>
      </div>
    </div>
  );
}

export default App;
