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


NOTE:
IT IS THE MAJOR MAJOR MAIN TASK WE NEED TO DONE WITH OUT ANY ISSUES HANDLE THIS ONE GRACEFULLY OKAY 

TAKE YOUR OWN TIME HANDLE IT OKAY HOW MUCH TIME YOU WANT TAKE IT NO PROBLEM BUT DONE IT WITH OUT ANY ISSUES.

DON'T SKIP ANYTHING OKAY WITH OUT ANY ISSUES HANDLE IT GRACEFULLY OKAY 

BECAUSE BASED ON THIS ONLY THE CORE OF THE APPLICATION WILL RUN OKAY THAT WHY IAM SAYING VERY VERY SENSITIVE
IMPORTANT TASK 


CHECK THE DB CURRENTLY WE HAVE NOW PROCESS IS
CREATING CREDENTIAL PROFILE AND THEN DISCOVERY PROFILE WE ARE DISCOVERING THOSE DISCOVERY RELATED DATA WE STORED
IN THE discovered_devices TABLE
HERE YOU DONE GO ENGINE POLLING SNMP OID'S CAPTURING AND MIBS PARSING EVERYTHING IT IS FINE
AND THEN HANDLED
THE COMMISSIONING SO THAT THIS DEVICES ADDED IN TO THE device_monitoring TABLE WITH NEAT DATA STORING AS FRONT END DATA CELL

NOW THIS PROCESS IS FINE

BASED ON THIS YOU DONE THE

ANALYSIS HANDLED THE MULTIPLE TABLES

device_metrics_history
device_monitoring
etc features it is fine

BASED ON THIS YOU DISPLAY THE DATA IN THE DASHBOARD
RESPECTIVE SCREEN AS PER THEIR EXPECTATION
EX:
/dashboard
/network-monitoring
/network-topology
/metric-explorer
/netpath
/flow
/slo
/trap-explorer
/alerts
/reports
/audit
/log-management
/ticketing
/settings

EVERYTHING IS FINE UP TO HERE

NOW ALONG WITH THIS NOW WHAT IS THE PROCESS WE NEEDED IS

IF YOU SEEN THIS SCREEN : /settings/discovery/manual-add
WE ARE ABLE TO ADD THE DEVICE MANUALLY ALSO
EITHER ONE BY ONE OR BULK CSV UPLOAD OR XLSX UPLOAD

SEE HERE WHAT I WANT IS
IT IS THE XLSX FILE FIRST ANALYZE THIS DATA
SO YOU CAN GET CLARITY ABOUT IT AND THEN
UPLOAD THE XLSX STORE THIS DATA IN ONE TABLE SEPARATELY
XLSX PATH :

NOTE : IN THE XLSX WE HAVE THIS FIELDS
IP Address	Device Name	Device Type	Device Group	Protocol	SNMP Community	SNMP Version	SSH Username	SSH Password

BASED ON THIS WHAT EVER THE CHANGES NEEDED IN THE BACKEND AND FRONT END ACCORDINGLY DONE IT OKAY
IP Address Device Name Device Type Protocol SNMP Community SNMP Version SSH Username SSH Password Device Group
IF ANY ONE NOT AVAILABLE LEAVE IT OKAY LATER WE CAN ADD THIS THOSE EDITING AND DELETING FEATURE ALSO NEEDED
IMPLEMENT IT CAREFULLY OKAY
devices_added_manually TABLE ALSO SAME HOW THE DISCOVERED DEVICES SYNCED WITH THE
GO ENGINE POLLING SNMP OID'S CAPTURING AND MIBS PARSING EVERYTHING HANDLED SAME WAY OKAY
THEN ONCE EVERYTHING DONE HERE
THEN ADDED IN TO THE device_monitoring  TABLE WITH OUT ANY ISSUES

SO THAT WE HAVE ACHIEVED THE BOTH AUTOMATED DISCOVERY AND MANUAL PROCESS AS WELL OKAY

AND DATA AUTOMATICALLY  SYNCED NEATLY WITH OUT ANY ISSUES OKAY ALONG WITH THE EXISTING APIS