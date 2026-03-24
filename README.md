# Mini-CDN-Simulator

## Why I Built This

While learning system design, I kept coming across CDNs (Content Delivery Networks) and how they improve performance by caching data closer to users.

However, most explanations felt very theoretical.

So instead of just reading about it, I decided to build a small system myself to understand:

* What caching actually looks like in code
* How cache hit vs miss works in practice
* How data expiration (TTL) is handled
* What role an edge server plays

This project is my attempt to turn those concepts into something practical and easy to understand.

---

## What This Project Does

This is a Mini CDN Simulator built using Node.js.

It mimics how a CDN works in a simplified way:

1. A user requests data (`/data`)
2. The server (acting as an edge server) checks:

   * If data exists in cache → return it (Cache HIT)
   * Otherwise → fetch from origin (Cache MISS)
3. The response is stored in cache with a timestamp
4. Future requests are served from cache for faster performance
5. Cached data expires after a fixed time (TTL)

---

## Request Flow

```text id="flowtext"
Client → Edge Server → Cache → Origin → Cache → Client
```

---

## Key Features

* Cache HIT and MISS simulation
* Response time measurement to compare performance
* Origin server simulation using a public API
* Manual cache invalidation (`/invalidate`)
* TTL-based caching (data expires after 10 seconds)

---

## What I Observed

During testing:

* First request (Cache MISS):

  * Takes around 200–400ms
  * Data is fetched from the origin server

* Subsequent requests (Cache HIT):

  * Takes around 1–5ms
  * Data is served instantly from cache

This clearly shows why caching and CDNs significantly improve performance.

---

## API Endpoints

### `/`

Basic health check

### `/data`

Main CDN logic
Returns cached data or fetches from origin

### `/invalidate`

Clears cache manually (simulates CDN cache purge)

---

## What I Learned

This project helped me understand:

* How caching works in backend systems
* The difference between cache HIT and cache MISS
* Why TTL (Time To Live) is important
* How stale data can be handled
* How CDNs improve performance in real systems
* How request flow works internally in backend applications

Most importantly, it helped me move from:
“I know what a CDN is” to “I understand how it works internally”

---

## Tech Stack

* Node.js
* Express.js
* Fetch API

---

## Run Locally

```bash
npm install
node server.js
```

Then open:

```text
http://localhost:3000/data
```

---

## Future Improvements

* Add dynamic routes (`/data/:id`)
* Use Redis instead of in-memory cache
* Deploy the application
* Simulate multiple edge servers
