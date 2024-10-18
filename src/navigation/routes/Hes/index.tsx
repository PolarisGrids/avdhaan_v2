import { lazy } from 'react';
import { Route, Outlet } from 'react-router-dom';
import HesOutlet from '@/navigation/HesOutlet';
import ExecutionHistory from '@/pages/hes/command/includes/ExecutionHistory';
import AlarmEvents from '@/pages/hes/alarms/alarm-events/includes';

const Alarms = lazy(() => import('@/pages/hes/alarms'));
const Dashboard = lazy(() => import('@/pages/hes/dashboard'));
const BlockLoad = lazy(
  () => import('@/pages/hes/meter-profile-data/block-load')
);
const DailyLoad = lazy(
  () => import('@/pages/hes/meter-profile-data/daily-load')
);
const MonthlyBilling = lazy(
  () => import('@/pages/hes/meter-profile-data/monthly-billing')
);
const InstantaneousProfile = lazy(
  () => import('@/pages/hes/meter-profile-data/instantaneous-profile')
);
const PeriodicPush = lazy(
  () => import('@/pages/hes/meter-profile-data/periodic-push')
);

const ScheduledReads = lazy(() => import('@/pages/hes/scheduled-reads'));
const CommandExecution = lazy(
  () => import('@/pages/hes/command/includes/command-execution')
);
const DeviceInformation = lazy(() => import('@/pages/hes/device-information'));
const ConfigureCommand = lazy(() => import('@/pages/hes/configure-command'));
const CommandExecutionHistory = lazy(
  () => import('@/pages/hes/command/includes/command-execution-history')
);


const HesRoutes = (
  <Route path="/hes" element={<HesOutlet />}>
    <Route index element={<Dashboard />} />

    <Route path="meter-profile-data" element={<Outlet />}>
      <Route index element={<BlockLoad />} />
      <Route path="block-load" element={<BlockLoad />} />
      <Route path="daily-load" element={<DailyLoad />} />
      <Route path="monthly-billing" element={<MonthlyBilling />} />
      <Route path="instantaneous-profile" element={<InstantaneousProfile />} />
      <Route path="periodic-push" element={<PeriodicPush />} />
    </Route>

    <Route path="command" element={<Outlet />}>
      <Route path="command-execution" element={<CommandExecution />} />
      <Route
        path="command-execution-history"
        element={<CommandExecutionHistory />}
      />
      <Route
        path="batch-command-execution-details"
        element={<ExecutionHistory />}
      />
    </Route>
    <Route path="scheduled-reads" element={<ScheduledReads />} />
    <Route path="device-information" element={<DeviceInformation />} />
    <Route path="configure-command" element={<ConfigureCommand />} />
    <Route path="alarms" element={<Outlet />} >
    <Route index element = {<Alarms />} />
    <Route path="voltage-events" element={<AlarmEvents dataType={'VEFV'} title={'Voltage Events'}/>} />
    <Route path="current-events" element={<AlarmEvents dataType={'CEFV'} title={'Current Events'}/>} />
    <Route path="power-related-events" element={<AlarmEvents dataType={'PEFV'} title={'Power Related Events'}/>} />
    <Route path="non-roll-over-events" element={<AlarmEvents dataType={'NREFV'} title={'Non Roll Over Events'}/>} />
    <Route path="control-events" element={<AlarmEvents dataType={'DEFV'} title={'Control Events'}/>} />
    <Route path="other-&-additional-events" element={<AlarmEvents dataType={'OEFV'} title={'Other & Additional Events'}/>} />
    <Route path="transactional-events" element={<AlarmEvents dataType={'TEFV'} title={'Transactional Events'}/>} />

    </Route>
  </Route>
);

export default HesRoutes;
