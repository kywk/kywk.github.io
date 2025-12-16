// Leaflet Map Initialization Script for Docusaurus
// Supports dynamic light/dark theme switching and UTF-8 Chinese characters

(function () {
    var initAttempts = 0;
    var maxAttempts = 50;
    var initializedMaps = {};

    // Detect current Docusaurus theme
    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function initLeafletMaps() {
        initAttempts++;

        if (typeof L === 'undefined') {
            if (initAttempts < maxAttempts) {
                setTimeout(initLeafletMaps, 200);
            }
            return;
        }

        var mapWrappers = document.querySelectorAll('.leaflet-map-wrapper[data-leaflet-config]');

        if (mapWrappers.length === 0) {
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

    // Initialize on load
    initLeafletMaps();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initAttempts = 0;
            initLeafletMaps();
        });
    }

    window.addEventListener('load', function () {
        initAttempts = 0;
        setTimeout(initLeafletMaps, 100);
    });

    // Re-run on URL changes (SPA navigation)
    var lastUrl = location.href;
    new MutationObserver(function () {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            initAttempts = 0;
            initializedMaps = {};
            setTimeout(initLeafletMaps, 300);
        }
    }).observe(document.body, { childList: true, subtree: true });
})();
