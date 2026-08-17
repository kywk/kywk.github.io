// Leaflet Map Initialization Script for Docusaurus
// Supports dynamic light/dark theme switching and UTF-8 Chinese characters
// Fixed: Wait for React hydration to complete before initializing maps

(function () {
    var initAttempts = 0;
    var maxAttempts = 50;
    var initializedMaps = {};
    var hydrationComplete = false;

    // Leaflet 本體只在頁面真的有地圖時才載入（全站 920 頁中僅少數幾頁需要）。
    // 這裡是這兩個 URL 的唯一來源，不再由 docusaurus.config.ts 全域注入。
    var LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    var LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    var assetsRequested = false;

    // Detect current Docusaurus theme
    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    // 動態注入 Leaflet CSS/JS，重複呼叫只會注入一次
    function requestLeafletAssets() {
        if (assetsRequested) return;
        assetsRequested = true;

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = LEAFLET_CSS;
        document.head.appendChild(link);

        var script = document.createElement('script');
        script.src = LEAFLET_JS;
        script.async = true;
        script.onerror = function () {
            console.error('[Leaflet Init] Failed to load Leaflet from', LEAFLET_JS);
        };
        document.head.appendChild(script);
    }

    function initLeafletMaps() {
        initAttempts++;

        // 先確認這頁有地圖，再決定要不要載入 Leaflet
        var mapWrappers = document.querySelectorAll('.leaflet-map-wrapper[data-leaflet-config]');

        if (mapWrappers.length === 0) {
            if (initAttempts < maxAttempts) {
                setTimeout(initLeafletMaps, 200);
            }
            return;
        }

        if (typeof L === 'undefined') {
            requestLeafletAssets();
            if (initAttempts < maxAttempts) {
                setTimeout(initLeafletMaps, 200);
            }
            return;
        }

        mapWrappers.forEach(function (wrapper) {
            var mapId = wrapper.getAttribute('data-leaflet-map');
            var mapEl = document.getElementById('map-' + mapId);

            if (!mapEl) return;

            // Skip if already initialized
            if (initializedMaps[mapId]) return;

            // Check if map element already has Leaflet content (avoid re-init)
            if (mapEl.classList.contains('leaflet-container')) return;

            try {
                var encodedConfig = wrapper.getAttribute('data-leaflet-config');
                // Use decodeURIComponent for proper UTF-8 support
                var configJson = decodeURIComponent(encodedConfig);
                var config = JSON.parse(configJson);

                var darkMode = isDarkMode();
                var tileLayer = darkMode ? config.darkTileLayer : config.lightTileLayer;
                var tileAttribution = darkMode ? config.darkAttribution : config.lightAttribution;

                var map = L.map('map-' + mapId).setView([config.lat, config.long], config.defaultZoom);

                var tiles = L.tileLayer(tileLayer, {
                    attribution: tileAttribution,
                    minZoom: config.minZoom,
                    maxZoom: config.maxZoom,
                }).addTo(map);

                // Store map and tile layer for theme switching
                initializedMaps[mapId] = { map: map, tiles: tiles, config: config };

                // Add markers with proper popup handling
                if (config.markers && config.markers.length > 0) {
                    config.markers.forEach(function (m) {
                        var icon = L.divIcon({
                            className: 'leaflet-marker-custom',
                            html: '<div class="leaflet-marker-icon" style="background:' + m.iconConfig.color + ';">' + m.iconConfig.icon + '</div>',
                            iconSize: [36, 36],
                            iconAnchor: [18, 18],
                            popupAnchor: [0, -18],
                        });

                        // Create popup with proper UTF-8 title
                        var popupContent = document.createElement('div');
                        popupContent.className = 'leaflet-custom-popup';
                        popupContent.innerHTML = '<strong class="popup-title">' + m.title + '</strong><br><a href="' + m.href + '" class="popup-link">查看詳情 →</a>';

                        var marker = L.marker([m.lat, m.lng], { icon: icon }).addTo(map);
                        marker.bindPopup(popupContent, {
                            maxWidth: 300,
                            minWidth: 150,
                            closeButton: true,
                            autoClose: true,
                        });
                    });
                }

                // Fix map size
                setTimeout(function () {
                    map.invalidateSize();
                }, 100);

                setTimeout(function () {
                    map.invalidateSize();
                }, 500);

            } catch (e) {
                console.error('[Leaflet Init] Failed to initialize map:', mapId, e);
            }
        });
    }

    // Update all maps when theme changes
    function updateMapsTheme() {
        var darkMode = isDarkMode();

        Object.keys(initializedMaps).forEach(function (mapId) {
            var mapData = initializedMaps[mapId];
            if (!mapData) return;

            var newTileLayer = darkMode ? mapData.config.darkTileLayer : mapData.config.lightTileLayer;
            var newAttribution = darkMode ? mapData.config.darkAttribution : mapData.config.lightAttribution;

            // Remove old tiles and add new ones
            mapData.map.removeLayer(mapData.tiles);
            mapData.tiles = L.tileLayer(newTileLayer, {
                attribution: newAttribution,
                minZoom: mapData.config.minZoom,
                maxZoom: mapData.config.maxZoom,
            }).addTo(mapData.map);
        });
    }

    // Watch for theme changes
    var themeObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'data-theme') {
                updateMapsTheme();
            }
        });
    });

    if (document.documentElement) {
        themeObserver.observe(document.documentElement, { attributes: true });
    }

    // Wait for hydration to complete before initializing
    // Docusaurus adds a specific class after hydration
    function waitForHydration(callback) {
        // Check if already hydrated (for subsequent navigation)
        var docEl = document.getElementById('__docusaurus');
        if (docEl && docEl.hasAttribute('data-has-hydrated')) {
            callback();
            return;
        }

        // Use a longer delay to ensure hydration is complete
        // React hydration typically completes within 500-1000ms
        setTimeout(function () {
            if (docEl) {
                docEl.setAttribute('data-has-hydrated', 'true');
            }
            callback();
        }, 800);
    }

    // Initialize after page is fully loaded and hydrated
    if (document.readyState === 'complete') {
        waitForHydration(function () {
            initAttempts = 0;
            initLeafletMaps();
        });
    } else {
        window.addEventListener('load', function () {
            waitForHydration(function () {
                initAttempts = 0;
                initLeafletMaps();
            });
        });
    }

    // Re-run on URL changes (SPA navigation)
    // 注意：本檔在 <head> 執行，此時 document.body 還不存在，
    // 直接 observe(document.body) 會丟 TypeError 並讓 SPA 換頁後的地圖初始化整段失效。
    var lastUrl = location.href;
    function observeUrlChanges() {
        new MutationObserver(function () {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                initAttempts = 0;
                // Clear maps for new page
                Object.keys(initializedMaps).forEach(function (mapId) {
                    try {
                        if (initializedMaps[mapId] && initializedMaps[mapId].map) {
                            initializedMaps[mapId].map.remove();
                        }
                    } catch (e) { }
                });
                initializedMaps = {};
                // Wait a bit for new page content to render
                setTimeout(initLeafletMaps, 500);
            }
        }).observe(document.body, { childList: true, subtree: true });
    }

    if (document.body) {
        observeUrlChanges();
    } else {
        document.addEventListener('DOMContentLoaded', observeUrlChanges);
    }
})();
