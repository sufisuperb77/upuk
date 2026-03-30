/**
 * Visitor Counter for UPUK frontend2.
 *
 * Counts one visit per browser session (sessionStorage flag).
 * - First page opened in a session → POST (records a new visit).
 * - Browsing to other pages in the same session → GET only (no new record).
 * - Closing the browser / opening a new tab starts a fresh session.
 */
'use strict';

const API_BASE_URL = 'https://upuk-production.up.railway.app';
const SESSION_KEY = 'upuk_visited';

document.addEventListener('DOMContentLoaded', function () {
    var badge = document.getElementById('visitor-counter');
    if (!badge) return;

    // Has this browser session already been counted?
    var alreadyCounted = sessionStorage.getItem(SESSION_KEY) === '1';
    var method = alreadyCounted ? 'GET' : 'POST';

    var fetchOptions = { method: method, headers: { 'Content-Type': 'application/json' } };
    if (method === 'POST') {
        fetchOptions.body = JSON.stringify({ page: '' }); // page field kept for admin visibility
    }

    fetch(API_BASE_URL + '/api/visitor-count/', fetchOptions)
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(function (data) {
            if (method === 'POST') {
                // Mark this session as counted so subsequent pages don't POST again
                sessionStorage.setItem(SESSION_KEY, '1');
            }
            badge.textContent = '\uD83D\uDC41\uFE0F ' + data.total.toLocaleString() + ' pelawat';
            badge.style.display = 'inline';
        })
        .catch(function () {
            badge.style.display = 'none';
        });
});
