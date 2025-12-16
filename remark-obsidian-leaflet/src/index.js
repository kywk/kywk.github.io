const { visit } = require('unist-util-visit');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Parse leaflet code block content into configuration object
 */
function parseLeafletConfig(content) {
    const config = {};
    const lines = content.trim().split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();

            if (value === 'true') {
                config[key] = true;
            } else if (value === 'false') {
                config[key] = false;
            } else if (!isNaN(value) && value !== '') {
                config[key] = parseFloat(value);
            } else {
                config[key] = value;
            }
        }
    }

    return config;
}

/**
 * Normalize a path by converting spaces to dashes in all segments
 * @param {string} urlPath - The path to normalize
 * @returns {string} Normalized path with spaces replaced by dashes
 */
function normalizeSlug(urlPath) {
    if (!urlPath) return urlPath;
    return urlPath
        .split('/')
        .map(segment => segment.replace(/ /g, '-'))
        .join('/');
}

/**
 * Read markers from a folder containing markdown files with location frontmatter
 */
function readMarkers(markerFolder, routeBase) {
    const markers = [];

    try {
        if (!fs.existsSync(markerFolder)) {
            console.warn(`Marker folder not found: ${markerFolder}`);
            return markers;
        }

        const files = fs.readdirSync(markerFolder);

        for (const file of files) {
            if (!file.endsWith('.md') || file.startsWith('_')) {
                continue;
            }

            const filePath = path.join(markerFolder, file);
            const stat = fs.statSync(filePath);

            if (!stat.isFile()) {
                continue;
            }

            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                const { data: frontmatter } = matter(content);

                if (frontmatter.location && Array.isArray(frontmatter.location) && frontmatter.location.length >= 2) {
                    const lat = parseFloat(frontmatter.location[0]);
                    const lng = parseFloat(frontmatter.location[1]);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        const fileName = file.replace(/\.md$/, '');
                        // 正規化檔名：空格轉破折號
                        const slug = fileName.replace(/ /g, '-');
                        // 正規化資料夾路徑：空格轉破折號
                        const folderPath = markerFolder.split('/').slice(1).join('/');
                        const normalizedFolderPath = normalizeSlug(folderPath);
                        const href = `${routeBase}${normalizedFolderPath}/${slug}/`;

                        markers.push({
                            lat,
                            lng,
                            title: frontmatter.title || fileName,
                            mapmarker: frontmatter.mapmarker || 'default',
                            href,
                        });
                    }
                }
            } catch (err) {
                console.warn(`Failed to parse marker file ${filePath}:`, err.message);
            }
        }
    } catch (err) {
        console.warn(`Failed to read marker folder ${markerFolder}:`, err.message);
    }

    return markers;
}

/**
 * Get marker icon configuration based on mapmarker type
 */
function getMarkerIconConfig(mapmarker) {
    const icons = {
        default: { color: '#2e8555', icon: '📍' },
        restaurant: { color: '#e74c3c', icon: '🍽️' },
        hotel: { color: '#3498db', icon: '🏨' },
        attraction: { color: '#f39c12', icon: '⭐' },
        airport: { color: '#9b59b6', icon: '✈️' },
        beach: { color: '#1abc9c', icon: '🏖️' },
        mountain: { color: '#27ae60', icon: '⛰️' },
        museum: { color: '#8e44ad', icon: '🏛️' },
        temple: { color: '#d35400', icon: '🛕' },
        market: { color: '#c0392b', icon: '🛒' },
    };

    return icons[mapmarker] || icons.default;
}

/**
 * Generate HTML for a Leaflet map using data attributes for initialization
 * Now supports dynamic light/dark theme detection
 */
function generateMapHtml(config, markers, mapId) {
    const {
        height = '500px',
        lat = 0,
        long = 0,
        minZoom = 2,
        maxZoom = 18,
        defaultZoom = 10,
    } = config;

    const markersWithIcons = markers.map(m => ({
        ...m,
        iconConfig: getMarkerIconConfig(m.mapmarker),
    }));

    // Store both light and dark tile URLs - theme will be detected at runtime
    const mapConfig = {
        lat,
        long,
        defaultZoom,
        minZoom,
        maxZoom,
        lightTileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        darkTileLayer: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        lightAttribution: '© OpenStreetMap',
        darkAttribution: '© OpenStreetMap © CARTO',
        markers: markersWithIcons,
    };

    // Use encodeURIComponent for proper UTF-8 handling instead of base64
    const encodedConfig = encodeURIComponent(JSON.stringify(mapConfig));

    return `<div class="leaflet-map-wrapper" data-leaflet-map="${mapId}" data-leaflet-config="${encodedConfig}" style="height: ${height}; width: 100%; border-radius: 8px; overflow: hidden; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"><div id="map-${mapId}" style="height: 100%; width: 100%;"></div></div>`;
}

/**
 * Remark plugin to transform Obsidian Leaflet code blocks
 */
function remarkLeaflet(options = {}) {
    const { routeBase = '/' } = options;

    return (tree, file) => {
        let mapCounter = 0;

        visit(tree, 'code', (node, index, parent) => {
            if (node.lang !== 'leaflet') {
                return;
            }

            const config = parseLeafletConfig(node.value);
            const mapId = config.id || `leaflet-map-${mapCounter++}`;

            let markers = [];
            if (config.markerFolder) {
                markers = readMarkers(config.markerFolder, routeBase);
            }

            const html = generateMapHtml(config, markers, mapId);

            parent.children[index] = {
                type: 'html',
                value: html,
            };
        });
    };
}

module.exports = remarkLeaflet;
module.exports.remarkLeaflet = remarkLeaflet;
