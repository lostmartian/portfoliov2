---
title: "Fintech: Software Where Being Wrong Has a Name"
date: "NOV 03, 2026"
category: "FINTECH"
hidden: false
description: "What building an IPO platform and a registrar's ERP taught me about deadlines, regulators, paper, and why Indian fintech is one of the most exciting places to write software right now."
---

Most software I had written before this year could be a little wrong. A slow page gets fixed next sprint. A confusing button gets a tooltip. A bad recommendation is just a bad recommendation.

Then, in March, I started building software for a registrar in India's capital markets, and I learned that some mistakes have names. Allot one share to the wrong investor and it isn't a bug, it's a regulatory event. Miss a deadline by an evening and it isn't a delay, it's a listing that doesn't happen on time.

Eight months in, that has changed how I think about engineering more than any framework or language ever has. This post is about those months: what I worked on, what surprised me, and why I think fintech is one of the most exciting places to be a software engineer right now.

## Money is a state machine with a deadline

When a company lists in India, there is a quiet layer of the system most people never see: the Registrar and Transfer Agent, or RTA. It sits between the company, the stock exchanges, the depositories that hold shares, and the banks that block investors' money. When an IPO closes, the RTA decides which bids are valid and who gets shares.

India runs on a T+3 timeline. Bidding closes on day T, and trading starts three working days later. In practice the real work happens in one day: every bid validated, reconciled against blocked funds, allotted by category, and approved by the exchange, before the evening of T+1.

So the system isn't really a set of screens. It's a state machine that money moves through, with a clock attached, and every transition has to be explainable to someone whose job is to ask "why?"

I find that genuinely thrilling. The constraints are hard, but they're honest. You always know what "correct" means, because somebody has written it down in a circular.

## The IPO platform: matching the registrar, not the textbook

My first piece of this world was an IPO processing and allotment platform for [Niche Technologies](/work/ipo-allotment-engine), a SEBI-registered registrar, built with a team of four.

I led the engine at its heart: the validators that decide which bids count, the reconciliation against bank and depository files, the category quotas with their spillovers, and the lotteries for oversubscribed categories. Around it I built most of the surfaces: the control-plane API with a tamper-proof audit trail, the operator portal, and the public page where investors check what they were allotted.

The lesson I keep coming back to came early. My first allotment engine followed SEBI's rules exactly as written. It was clean, tidy and wrong, because the registrar's own sheets round numbers a particular way, break ties a particular way, and choose lottery winners from numbers the exchange supplies. An allotment that disagrees with the registrar by a single share is still wrong.

So I deleted it and rebuilt it to reproduce the registrar's sheets column by column. When we finally ran a production-readiness exercise on 530,000 real bids, the bar was never "the totals match." Every single difference from the registrar's independent results had to be explained. That standard shaped everything after it.

The full story, with the decisions and the numbers, is in the [case study](/work/ipo-allotment-engine).

## After the listing: the registry nobody sees

An IPO is a burst of a few days. What comes after lasts for decades.

Once a company is listed, its RTA keeps its register of shareholders. Every folio, every holder, every change of address, every dividend, every bonus issue, every transfer and every death in the family that moves shares from one name to another passes through the registrar. Some of it arrives through the depositories. A surprising amount of it still arrives on paper, in an envelope, with a wet signature.

Since September I've been helping Niche build the ERP that runs this side of the business: the system their staff use every day to keep registers correct. It's early, and it's the most interesting domain work I've done.

A few of the pieces I've worked on:

* **Requests that follow the paperwork.** An investor who wants to update their KYC files SEBI's ISR-1 form. One form can cover several folios, each with its own holder details. So a request is worked as a checklist of real steps, not a single "approve" button, and it records changes per folio holder rather than pretending one investor is one row.
* **Bundled work.** A final dividend isn't one task. It's a main request with parts that different people work in parallel, each with its own checklist, all rolling up to one outcome.
* **Documents as first-class records.** Papers arrive by courier, get scanned, sometimes arrive with no scan at all, and come in several versions. The system records when they arrived, how, and from whom, keeps the original untouched, and logs every time someone reads one.
* **Permissions that mean something.** Who may see a shareholder's details, who may change them, and who may approve that change are three different questions, and the answers depend on which company's register you are in.
* **Screens people can actually read.** Share counts and amounts shown the way they're read in India, in lakhs and crores. Codes like residency or nomination status spelled out in words. Small things, but staff look at these screens all day.

A lot of my time hasn't gone into code at all. It has gone into learning the domain: reading circulars, sitting with the people who process requests by hand today, and working out how tax is deducted on dividends before writing a single line of the dividend flow. In fintech, the domain knowledge is the hard part. The code follows.

## What fintech taught me

**Reproduce the source of truth before you improve it.** Regulators and incumbents have encoded decades of edge cases into their spreadsheets and forms. Your first job is to match them exactly. Only then do you get to make them better.

**Make the dangerous path impossible, not just unlikely.** Moving an investor to the wrong category changes who gets shares. So the system only proposes those changes, a person approves them, and the database itself refuses a second accepted version. Good intentions don't survive an audit; structure does.

**Test against an oracle.** Real IPO data is confidential and can't be replayed. So we built a generator that creates complete, realistic IPOs, plants known errors in them, and predicts what every check should catch. When the test data lied, and it did, that oracle is how we found out.

**Paper is still real.** It's tempting to design as if every input is a clean API call. Some of the most important inputs are envelopes. Designing for them honestly, with intake records, scans, versions and audit, is what makes the system trustworthy to the people who use it.

**Words are part of the system.** A status code that only engineers understand is a bug in a domain where every action has to be explained. I've spent real time on labels, and I don't regret a minute of it.

## Why this is an exciting time

Indian capital markets have changed fast. Listings now happen in three working days. Investors bid through UPI mandates from their phones. SME IPOs have opened public markets to much smaller companies.

All of that runs on infrastructure built over decades by a small number of incumbents. A new registrar with modern software, careful engineering and an honest audit trail can genuinely compete. That's rare. In most industries the interesting systems were rebuilt long ago; here, a lot of them are still being written for the first time.

For an engineer, that combination is hard to beat: hard constraints, real stakes, a clear definition of correct, and room to build things properly.

## Where I am now

The ERP is still being built, one module at a time, and I'm enjoying every slow, careful step of it. If you're building something in fintech that has to be exactly right, I'd love to hear about it. [Say hello](mailto:sahilgangurde08@gmail.com).
