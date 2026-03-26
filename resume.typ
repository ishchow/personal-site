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
- Designed and implemented ASP.NET middleware that performed DNS based request redirection for Fabric hosted Cosmos DB databases, unblocking #link("https://web.archive.org/web/20250828132647/https://learn.microsoft.com/en-us/fabric/database/cosmos-db/overview")[Cosmos DB in Fabric Public Preview.]
- Designed and lead implementation of mirrored storage billing for Fabric capacities, enabling customers to be charged for storage usage above a certain quota based on sku of capacity.
- Implement custom Azure Files directory sync algorithm which reduced replication lag between cross-region file shares by up to 30X, unblocked #link("https://web.archive.org/web/20250124124559/https://learn.microsoft.com/en-us/power-bi/transform-model/service-edit-data-models")[critical user facing features], and improved file share replication job reliability.

#work(
  title: "Software Engineer II",
  location: "Redmond, WA, USA",
  company: "Microsoft",
  dates: dates-helper(start-date: "Jun 2022", end-date: "Aug 2024"),
)
- Architected and lead team of three engineers to deliver the usage reporting system underlying #link("https://web.archive.org/web/20250821160929/https://learn.microsoft.com/en-us/fabric/enterprise/azure-billing")[compute] and non-mirrored storage billing for Fabric capacities, generating hundreds of millions in revenue per month.
- Eliminated under-billing of PowerBI Premium and Embedded capacities as well as reduced emission latency by 3.5X through improved Azure Storage partitioning when emitting billing records to internal commerce system.
- TODO
- TODO

#work(
  title: "Software Engineer",
  location: "Bellevue, WA, USA",
  company: "Microsoft",
  dates: dates-helper(start-date: "Aug 2020", end-date: "May 2022"),
)
- Introduced feature to garbage collection files from backup share as part of cross-region share replication job, eliminating 430 TB of data and saving 50K per month in cloud spend.
- Developed Powershell script to hot swap running processes and DLLs of local Service Fabric applications, reducing local deployment time from 10 mins to 30 seconds.
- Improved service reliability by onboarding PowerBI Premium service to Azure Monitor alerting.
- Programmed cluster placement algorithm for #link("https://web.archive.org/web/20221129061847/https://learn.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-bi/premium-gen-2")[PowerBI Premium Gen 2 capacities.]

#work(
  title: "Software Engineer Intern",
  location: "Bellevue, WA, USA",
  company: "Microsoft",
  dates: dates-helper(start-date: "May 2019", end-date: "Jul 2019"),
)
- Created prototype feature exposure service for internal use in PowerBI Premium using ASP.NET Core, Azure CosmosDB, and Azure Service Fabric

== Technical Skills

- *Languages & Frameworks:* C\#, Powershell, SQL (SQL Server)
- *Cloud & Infra:* Azure (SQL, Redis, Storage, Cosmos DB, Service Bus, Service Fabric, VMSS, Entra, Monitor)
- *Engineering & DevOps:* Stateful & Stateless Microservices, Distributed Systems, Site Reliability Engineering

== Education

#edu(
  institution: "University of Alberta",
  location: "Edmonton, AB, Canada",
  dates: dates-helper(start-date: "Sep 2015", end-date: "May 2020"),
  degree: "Bachelor of Science in Computer Engineering, Cooperative Program",
)
