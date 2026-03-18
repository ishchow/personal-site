## Purpose

Define the DNS migration from Porkbun to CloudFlare for the ishaat.ca domain, preserving all existing records with minimal downtime.

## ADDED Requirements

### Requirement: Transfer DNS to CloudFlare
The domain `ishaat.ca` SHALL be managed by CloudFlare DNS. The nameservers at the registrar (Porkbun) SHALL point to CloudFlare's assigned nameservers.

#### Scenario: DNS resolves via CloudFlare
- **WHEN** a DNS lookup is performed for `ishaat.ca`
- **THEN** the response comes from CloudFlare nameservers

### Requirement: Preserve DNS records
All existing DNS records for `ishaat.ca` SHALL be migrated to CloudFlare DNS. At minimum, the records needed for the website (`A`/`AAAA`/`CNAME` for `www` and apex) and any email records (`MX`, `TXT` for SPF/DKIM/DMARC) SHALL be preserved.

#### Scenario: Website DNS records present
- **WHEN** CloudFlare DNS is configured
- **THEN** the `www.ishaat.ca` CNAME (or equivalent) points to the CloudFlare Pages deployment

#### Scenario: Email records preserved
- **WHEN** CloudFlare DNS is configured
- **THEN** any existing MX, SPF, DKIM, or DMARC records are present and unchanged

### Requirement: Domain remains at Porkbun registrar
The domain registration SHALL remain at Porkbun. Only the DNS management is being moved to CloudFlare (by changing nameservers). The domain is NOT being transferred to CloudFlare as a registrar.

#### Scenario: Registrar unchanged
- **WHEN** the migration is complete
- **THEN** Porkbun remains the domain registrar, with nameservers pointing to CloudFlare

### Requirement: Minimal downtime
The DNS migration SHALL be performed in a way that minimizes downtime. CloudFlare DNS records SHALL be configured before changing nameservers at Porkbun.

#### Scenario: Pre-configured DNS
- **WHEN** nameservers are changed at Porkbun
- **THEN** CloudFlare already has all necessary DNS records configured, ensuring continuity
