This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

==

OBJECTIVE:

### `/alerts` & `/trap-explorer` (Event Management)

- **Concept**: Real-time fault detection.
- **Backend Architecture**:
  - *Active Polling*: If the Go poller detects CPU > 90% or a Node Down, it inserts a record into the `alerts` table.
  - *Passive Listening (Traps)*: A UDP listener daemon runs on port 162. When a switch interface goes down, it sends an SNMP Trap. The daemon parses the trap and streams it to the `/trap-explorer` via WebSockets, and evaluates it against Alert Rules.
============================================

IT IS THE MAJOR CORE MODULE OKAY DONE WITH MORE CAREFULLY MORE EFFECTIVELY WITH OUT ANY ISSUES 
check this table how data is there based on this done it okay 
select * from discovered_devices

select * from device_monitoring

select * from device_metrics_history

db tables based on this neatly display the data if not check the missing oid and relevant mib and get the response of it neatly fit it okay no more data placing in the backend as well okay everything is dynamic and no more stale dummy and statistics from the db basis it needed okay

 we need to develop this /reports apis okay for this first screen related
/home/snr/Downloads/Downloads/Projects/NMS/NMS-SYSTEM-ENTERPRISE-FRONTEND/src/screens/reports
/home/snr/Downloads/Downloads/Projects/NMS/NMS-SYSTEM-ENTERPRISE-FRONTEND/src/components/features/reports

end to check based on this front end expectation we are the current data
we are able to have and able o display wont miss any single widget single detailing okay every thing needed thats why take time first
 analyze this and if we are okay with in this then go head develop the apis okay if need check the db tables discovered_devices
device_monitoring
device_metric_history okay
so that  what is the we have till now you will get clarity okay take time done this once
everything is fine develop the apis and then g head with the front e end integrations as well okay
with out breaking the ui and ux and functionality handle it gracefully okay

implement it effectively okay as per the front end expectation neatly what are all the apis
needed write it okay

it is the major module right thats why    

once everything is fine remove the dummy data okay no need it once every thing is dynamic one


-NAME OF THE SCREENS: trap-explorer and alerts
-DESCRIPTION:
NEED AN GENUINE FEED BACK ALL SLO INTEGRATIONS COMPLETED OR NOT PLEASE CHECK THE BACKEND AND FRONT END GAVE ME THE CONFIRMATION MESSAGE 
ON IT 
so here i need one confirmation in backend and front end regarding this slo we don't have amy dummy data and dummy calculations right just gave me confirmation okay.



IT IS THE MAIN CONCERN RIGHT THATS WHY IAM SAYING
what ever the packages you installed
please check this
/home/snr/Downloads/Downloads/Projects/NMS/NMS-SYSTEM-ENTERPRISE-BACKEND/requirements.txt

we have already the environment nms-enterprise-backend
so in this using relevant pip package install it okay 

so that only easily we can reproduce this one other systems as well thats why

instead system base installation sudo avoid this one okay

OR ELSE GAVE ME THE PACKAGES INSTALLATION IN THE requirements.txt i can install it okay



=====
now go head with this screen okay 
/slo
/slo/availability-all-monitored-devices screen related everything okay end to component and feature wont miss
based on this done it okay
 take your own time handle this gracefully with out any issues
with out breaking the ui and ux and functionality and integrations okay