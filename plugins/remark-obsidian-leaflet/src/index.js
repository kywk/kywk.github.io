const { visit } = require('unist-util-visit');

/**
 * Remark plugin to render Obsidian Leaflet maps in Docusaurus
 */
function remarkLeaflet(options = {}) {
    const { routeBase = '' } = options;

    return (tree, file) => {
        visit(tree, 'code', (node) => {
            if (node.lang === 'leaflet') {
                // Parse leaflet configuration
                const config = parseLeafletConfig(node.value);
                
                // Replace code block with JSX component
                node.type = 'jsx';
                node.value = generateLeafletJSX(config, routeBase);
            }
        });
    };
}

function parseLeafletConfig(configText) {
    const config = {};
    const lines = configText.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, value] = trimmed.split(':').map(s => s.trim());
            if (key && value) {
                config[key] = value;
            }
        }
    }
    
    return config;
}

function generateLeafletJSX(config, routeBase) {
    const {
        id = 'leaflet-map',
        lat = '25.0330',
        long = '121.5654',
        defaultZoom = '12',
        markerFolder = ''
    } = config;

    return `<div id="${id}" className="leaflet-map" data-lat="${lat}" data-lng="${long}" data-zoom="${defaultZoom}" data-marker-folder="${markerFolder}" data-route-base="${routeBase}"></div>`;
}

module.exports = remarkLeaflet;
