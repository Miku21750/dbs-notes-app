const workboxBuild = require('workbox-build');



workboxBuild.generateSW({
    globDirectory: 'dist/',
    globPatterns: [
        '**/*.{html,js,css,png,jpg,svg,woff2,json}',
    ],
    swDest: 'dist/service-worker.js',
    importScripts: ['/sw-notification.js'],
    runtimeCaching: [
        {
            urlPattern: ({request}) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
                cacheName: 'pages',
            },
        },
        {
            urlPattern: ({request}) => request.destination === 'style',
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: 'styles',
            },
        },
        {
            urlPattern: ({request}) => request.destination === 'script',
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: 'scripts',
            },
        },
        {
            urlPattern: ({request}) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                }
            }
        },
        {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'google-fonts',
            },
        },
        {
            urlPattern: /^https:\/\/story-api\.dicoding\.dev/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api-cache',
            },
        }
    ],
    skipWaiting: true,
    clientsClaim: true
}).then(({count, size}) => {
    console.log(`Generated service-worker.js, ${count} files, total ${size} bytes.`)
})