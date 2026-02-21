# URL Shortener API

## Overview

This project is a URL Shortener API built with Node.js. It allows users to generate shortened URLs, optionally provide a custom alias, track link usage, and generate detailed reports for each shortened link.

The application uses JSON files for persistent storage and implements rate limiting to prevent abuse. The goal of the project is to demonstrate backend fundamentals including routing, middleware, file system persistence, request tracking, and performance optimization techniques.

---

## Postman Documentation

[Postman API Docs](https://documenter.getpostman.com/view/35972225/2sBXcEkLjU)

---

## Features

### 1. Short URL Generation

Create a shortened URL from an original URL.

**Endpoint:**  
`POST /shorten`

**Request Body:**
```json
{
    "originalUrl": "https://risevest.com/blog/how-our-portfolio-performed-in-2025",
    "code": "rise"
}
````

* `originalUrl` (required): The full URL to shorten.
* `code` (optional): Custom alias for the short URL.

  * If not provided, the server generates a random code.
  * If provided, it is used as the short link identifier (if available).

**Behavior:**

* If `code` is empty or not provided, a random unique code is generated.
* If a custom alias is provided, the system validates availability before saving.
* The response returns the created URL object.

**Response Example:**

```json
{
    "shortenUrl": "https://url-shortener-mm0l.onrender.com/rise",
    "code": "rise",
    "originalUrl": "https://risevest.com/blog/how-our-portfolio-performed-in-2025",
    "clicks": 0,
    "createdAt": "2026-02-21T20:15:32.840Z",
    "lastAccessedAt": null
}
```

---

### 2. Rate Limiting (Sliding Window)

To prevent abuse, rate limiting is applied to the URL creation endpoint.

* Limit: 5 requests per IP address per hour
* Applied only to: `POST /shorten`
* Implementation: Sliding window algorithm
* Implemented as middleware

If a client exceeds the limit, the API responds with a `429`:

```json
{
    "message": "Too many requests"
}
```

This ensures fair usage and protects the system from excessive load.

---

### 3. URL Redirection and Click Tracking

When a shortened URL is accessed:

**Endpoint:**
`GET /:code`

The system:

* Redirects to the original URL
* Logs the click
* Updates `lastAccessed`

Each click is stored with the following data:

```json
{
    "code": "rise",
    "ipAddress": "197.211.59.99",
    "weekDay": "Saturday",
    "time": "20:18"
}
```

This enables detailed analytics per short link.

---

### 4. Report Card (Analytics Endpoint)

Generate full statistics for a specific short code.

**Endpoint:**
`GET /:code/report`

**Response includes:**

* The URL object
* An array of all recorded click objects

**Click Object Structure:**

```json
{
    "url": {
        "code": "rise",
        "originalUrl": "https://risevest.com/blog/how-our-portfolio-performed-in-2025",
        "clicks": 2,
        "createdAt": "2026-02-21T20:15:32.840Z",
        "lastAccessedAt": "2026-02-21T20:19:43.465Z"
    },
    "clicks": [
        {
            "code": "rise",
            "ipAddress": "197.211.59.99",
            "weekDay": "Saturday",
            "time": "20:18"
        },
        {
            "code": "rise",
            "ipAddress": "169.150.196.237",
            "weekDay": "Saturday",
            "time": "20:19"
        }
    ]
}
```

This feature provides a full report of link activity and usage patterns.

---

## Data Persistence

The application uses JSON files for storage:

* `.urls.json` — stores all shortened URL objects
* `.clicks.json` — stores all click tracking records

Data is written asynchronously using the Node.js file system (`fs/promises`).

To prevent excessive disk writes during high traffic scenarios, buffered saving in batches is implemented using `setTimeout`. This groups multiple rapid updates into a single disk write operation, improving performance and reducing I/O load.

This approach helps mitigate the "10,000 requests problem" where frequent writes could degrade performance.

