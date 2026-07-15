import CloudDashboard from './dashboards/CloudDashboard';
import CCTVDashboard from './dashboards/CCTVDashboard';
import {
  DefaultDashboard,
  OtherDashboard
} from './dashboards/GeneralDashboards';
import {
  ContainerOrchestrationDashboard,
  HCIDashboard,
  StorageDashboard,
  VirtualizationDashboard
} from './dashboards/InfrastructureDashboards';
import NetworkDashboard from './dashboards/NetworkDashboard';
import {
  InterfaceDashboard,
  WANLinkDashboard
} from './dashboards/NetworkExtrasDashboards';
import SDNDashboard from './dashboards/SDNDashboard';
import ServerDashboard from './dashboards/ServerDashboard';
import UPSDashboard from './dashboards/UPSDashboard';
import {
  ContainerDashboard,
  ProcessDashboard,
  ServiceCheckDashboard,
  ServiceDashboard
} from './dashboards/ServiceDashboards';

const DashboardView = ({ category, config, data, dashboardData }) => {
  const upCount = data.filter((d) => d.status === 'Up').length;
  const downCount = data.filter((d) => d.status === 'Down').length;

  switch (category) {
    case 'Server & Apps':
      return <ServerDashboard data={data} />;
    case 'Network':
      return <NetworkDashboard data={data} dashboardData={dashboardData} />;
    case 'CCTV':
      return <CCTVDashboard data={data} />;
    case 'UPS':
      return <UPSDashboard data={data} />;
    case 'SDN':
      return <SDNDashboard />;
    case 'Cloud':
      return <CloudDashboard />;
    case 'Service Check':
      return <ServiceCheckDashboard />;
    case 'HCI':
      return <HCIDashboard />;
    case 'Storage':
      return <StorageDashboard />;
    case 'Container Orchestration':
      return <ContainerOrchestrationDashboard />;
    case 'Virtualization':
      return <VirtualizationDashboard />;
    case 'Service':
      return <ServiceDashboard />;
    case 'Process':
      return <ProcessDashboard />;
    case 'Container':
      return <ContainerDashboard />;
    case 'Interface':
      return <InterfaceDashboard />;
    case 'WAN Link':
      return <WANLinkDashboard />;
    case 'Other':
      return <OtherDashboard upCount={upCount} downCount={downCount} />;
    default:
      return (
        <DefaultDashboard
          category={category}
          config={config}
          data={data}
          upCount={upCount}
          downCount={downCount}
        />
      );
  }
};

export default DashboardView;
