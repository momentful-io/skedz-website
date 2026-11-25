---
title: Troubleshooting
order: 5
display: accordion
---

### Schedule URL fails to load (CORS error)

Some schedule servers block browser access due to CORS (Cross-Origin Resource Sharing).

In this case you can:

1. **Download the file** and import it via “Import file”.
2. **Use a CORS proxy** such as [cors.skedz.org](https://cors.skedz.org).

Example using the Skedz CORS Proxy (FOSDEM 2026 schedule):\
<https://app.skedz.org/?url=https://cors.skedz.org/https://fosdem.org/2026/schedule/xml>

### Import data contains more data than expected

Some schedules are based on a stream of data that is updated over time. If you import such a schedule, you may see more events / sessions than expected. For example, Openki exports calendar data for all events, not just the ones connected to a specific schedule/event. In this case, you can limit the import to a specific time range using the start date end end date parameters.

In the app:

1. Click "Load from URL" and enter an URL.
2. Click "Advanced import options" and enter a start date and end date.
5. Click "Load schedule" to import the data.

Alternativeley, you can use the `start` and `end` query parameters in the URL. 