export const sidebarIconsUrlData = [
  '/assets/images/sidebar/dashboard.png',
  '/assets/images/sidebar/schedule.png',
  '/assets/images/sidebar/data-collection.png',
  '/assets/images/sidebar/vee.png',
  '/assets/images/sidebar/energy-audit.png',
  '/assets/images/sidebar/data-report.png',
  '/assets/images/sidebar/hes.png'
];

export const sidebarLinkData = [
  { to: '/dashboard/', title: 'Dashboard' },
  { to: '/scheduling/', title: 'Scheduling' },
  { to: '/data-acquisition/', title: 'Data Acquisition' },
  { to: '/vee/', title: 'Validation Estimation & Editing' },
  { to: '/energy-audit/', title: 'Energy Audit' },
  { to: '/reports/', title: 'Reports' },
  { to: '/hes', title: 'Head End System', isNative: true }
];

export const navbarLinkData = [
  { to: '/hes', title: 'Dashboard' },
  { to: '/hes/scheduled-reads', title: 'Scheduled Reads' },
  {
    to: '/hes/meter-profile-data',
    title: 'Meter Profile Data',
    children: [
      { to: '/hes/meter-profile-data/block-load', title: 'Block Load' },
      { to: '/hes/meter-profile-data/daily-load', title: 'Daily Load' },
      {
        to: '/hes/meter-profile-data/monthly-billing',
        title: 'Monthly Billing'
      },
      {
        to: '/hes/meter-profile-data/instantaneous-profile',
        title: 'Instantaneous Profile'
      },
      { to: '/hes/meter-profile-data/periodic-push', title: 'Periodic Push' }
    ]
  },
  {
    to: '/hes/command',
    title: 'Command',
    children: [
      {
        to: '/hes/command/command-execution-history',
        title: 'Cmd Execution History'
      },
      { to: '/hes/command/command-execution', title: 'Command Execution' }
    ]
  },
  { to: '/hes/alarms', title: 'Alarms' ,
  children: [
    {
      to: '/hes/alarms/voltage-events',
      title: 'Voltage Events'
    },
    {
      to: '/hes/alarms/current-events',
      title: 'Current Events'
    },
    {
      to: '/hes/alarms/power-related-events',
      title: 'Power Related Events'
    },
  {
    to: '/hes/alarms/non-roll-over-events',
    title: 'Non Roll Over Events'
  },
  {
    to: '/hes/alarms/control-events',
    title: 'Control Events'
  },
  {
    to: '/hes/alarms/other-&-additional-events',
    title: 'Other & Additional Events'
  },
  {
    to: '/hes/alarms/transactional-events',
    title: 'Transactional Events'
  },
  ]
  },
  { to: '/hes/command-execution', title: 'Command Execution' },
  { to: '/hes/device-information', title: 'Device Information' },
  { to: '/hes/configure-command', title: 'Configure Command ' }
];
