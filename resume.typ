#import "@preview/basic-resume:0.2.3": *

#let name = "Ishaat Chowdhury"
#let email = "ishaatchowdhury@gmail.com"
#let github = "github.com/ishchow"
#let linkedin = "linkedin.com/in/ishaatc"
#let personal-site = "ishaat.ca"
#let phone = sys.inputs.at("phone", default: none)

#show: resume.with(
  author: name,
  email: email,
  github: github,
  linkedin: linkedin,
  personal-site: personal-site,
  phone: phone,
  accent-color: "#000000",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: center,
  personal-info-position: center,
)

== Experience

#work(
  title: "Senior Software Engineer",
  location: "Redmond, WA, USA",
  company: "Microsoft",
  dates: dates-helper(start-date: "Sep 2024", end-date: "Present"),
)
- Lead internal re-architecture of #link("https://web.archive.org/web/20250821160929/https://learn.microsoft.com/en-us/fabric/enterprise/azure-billing")[usage reporting system] for PowerBI and Fabric capacities which keeps existing customer facing functionality (ie. reporting, throttling, billing) intact while allowing system to scale at least 20X higher than current highest usage, lowering operational complexity, and enabling new features which are infasible with current architecture.
- Designed and lead implementation of mirrored storage billing for Fabric capacities, enabling customers to be charged for storage usage above a certain free quota based on sku of capacity.
- Supported establishment of a new engineering team within the Fabric org during re‑org by documenting and transferring areas of my architectural ownership to new teams, interviewing candidates, and enabling rapid onboarding of new engineers.
- Scaled organizational effectiveness through durable documentation and operational enablement by authoring and maintaining architecture and process documentation, onboarding the team to existing on‑call and alerting workflows post‑reorg, and sharing best practices for writing and maintaining documentation at scale.

#work(
  title: "Software Engineer II",
  location: "Redmond, WA, USA",
  company: "Microsoft",
  dates: dates-helper(start-date: "Jun 2022", end-date: "Aug 2024"),
)
- Architected and lead team of three engineers to deliver the usage reporting system underlying compute and non-mirrored storage billing for Fabric capacities. This system handled #link("https://web.archive.org/web/20260301034249/https://msdynamicsworld.com/story/microsoft-q2-2026-earnings-announcement-highlights-fabric-performance")[\$2 billion] in annual recurring revenue (ARR) in 2026.
- Eliminated under-billing of PowerBI Premium and Embedded capacities as well as reduced emission latency by 3.5X through improved Azure Table Storage partitioning when emitting billing records to internal commerce system.
- Implemented custom Azure Files directory sync algorithm which reduced replication lag between cross-region file shares by up to 30X, unblocked #link("https://web.archive.org/web/20250124124559/https://learn.microsoft.com/en-us/power-bi/transform-model/service-edit-data-models")[critical user facing features], and improved file share replication job reliability.
- Secured internal access to SQL Server within #link("https://web.archive.org/web/20260104154922/https://learn.microsoft.com/en-us/analysis-services/azure-analysis-services/analysis-services-overview?view=sql-analysis-services-2025")[Azure Analysis Services] backend by migrating from user and password authentication to Managed Identity authentication as part of company wide #link("https://web.archive.org/web/20260315212551/https://www.microsoft.com/en-us/trust-center/security/secure-future-initiative")[Secure Future Initiative].
- Created foundations of Fabric ARM API — extracting business logic from API controllers into reusable components, restructuring common code from PowerBI Dedicated ARM #link("https://github.com/Azure/azure-rest-api-specs/blob/main/specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/PowerBIDedicated/DedicatedCapacity.tsp")[API] logic, implementing core SQL changes and data contracts for Fabric RP — enabling the team to build remaining APIs on this foundation. Delivered the #link("https://learn.microsoft.com/en-us/rest/api/microsoftfabric/fabric-capacities/update?view=rest-microsoftfabric-2023-11-01&tabs=HTTP")[Provision], #link("https://learn.microsoft.com/en-us/rest/api/microsoftfabric/fabric-capacities/get?view=rest-microsoftfabric-2023-11-01&tabs=HTTP")[Get], and #link("https://learn.microsoft.com/en-us/rest/api/microsoftfabric/fabric-capacities/delete?view=rest-microsoftfabric-2023-11-01&tabs=HTTP")[Delete] APIs.

#work(
  title: "Software Engineer",
  location: "Bellevue, WA, USA",
  company: "Microsoft",
  dates: dates-helper(start-date: "Aug 2020", end-date: "May 2022"),
)
- Introduced feature to garbage collect files from backup share as part of cross-region share replication job, eliminating 430 TB of data and saving 50K per month in cloud spend.
- Developed Powershell script to hot swap running processes and DLLs of local Service Fabric applications, reducing local deployment time from 10 mins to 30 seconds.
- Improved service reliability by onboarding PowerBI Premium service to Azure Monitor alerting, allowing for proactive detection of issues with dependent services (Redis, Storage, Key Vault, etc.).
- Programmed cluster placement algorithm for #link("https://web.archive.org/web/20221129061847/https://learn.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-bi/premium-gen-2")[PowerBI Premium Gen 2 capacities], improving utilization across Service Fabric clusters within an Azure region.
/*
TODO: Should I convert the following from perf review to a bullet point? PAYG == Autoscale VCore.

Worked on PAYG. Did initial metadata store changes as well as other foundation of resource provider work (provision logic, controllers and authenticators, model classes etc.). Emitted data about autoscale vcores for customer capacity to CES so that capacity metrics app can use this information. Supported work of colleagues (Shane, Arsenii, Anand) through code reviews. My contributions to PAYG helped us complete the feature which helps the overall AutoPremium/Gen2 project.
*/

== Technical Skills

- *Languages & Frameworks:* C\#, Powershell, T-SQL (SQL Server)
- *Cloud & Infra:* Azure (SQL, Redis, Storage, Cosmos DB, Service Bus, Service Fabric, VMSS, Entra, Monitor)
- *Engineering & DevOps:* Stateful & Stateless Microservices, Distributed Systems, Site Reliability Engineering

== Education

#edu(
  institution: "University of Alberta",
  location: "Edmonton, AB, Canada",
  dates: dates-helper(start-date: "Sep 2015", end-date: "May 2020"),
  degree: "Bachelor of Science in Computer Engineering, Cooperative Program",
)
