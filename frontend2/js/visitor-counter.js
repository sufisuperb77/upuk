/**
 * Visitor Counter for UPUK frontend2.
 *
 * On each page load:
 *  1. POSTs to the Django backend to record the visit.
 *  2. Updates #visitor-counter with the returned total.
 *
 * Change API_BASE_URL to your Railway backend URL before deploying to production.
 * e.g. const API_BASE_URL = 'https://your-app.up.railway.app';
 */
'use strict';

const API_BASE_URL = 'https://upuk-production.up.railway.app';

document.addEventListener('DOMContentLoaded', function () {
    var badge = document.getElementById('visitor-counter');
    if (!badge) return;

    // Derive a short page name from the current filename (e.g. "about" from about.html)
    var pathParts = window.location.pathname.split('/');
    var filename = pathParts[pathParts.length - 1] || 'index';
    var page = filename.replace(/\.html?$/i, '') || 'index';

    fetch(API_BASE_URL + '/api/visitor-count/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: page }),
    })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(function (data) {
            badge.textContent = '\uD83D\uDC41\uFE0F ' + data.total.toLocaleString() + ' pelawat';
            badge.style.display = 'inline';
        })
        .catch(function () {
            // Silently hide if backend is unreachable
            badge.style.display = 'none';
        });
});
