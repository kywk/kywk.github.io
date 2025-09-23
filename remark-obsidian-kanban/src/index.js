const { visit } = require('unist-util-visit');

function remarkKanban() {
  return (tree, file) => {
    let isKanbanBoard = false;
    
    visit(tree, 'yaml', (node) => {
      if (node.value && node.value.includes('kanban-plugin: board')) {
        isKanbanBoard = true;
      }
    });
    
    if (!isKanbanBoard) return;
    
    const columns = [];
    let currentColumn = null;
    const filteredChildren = [];
    
    tree.children.forEach((node) => {
      let shouldSkip = false;
      
      let nodeText = '';
      if (node.value) nodeText += node.value;
      visit(node, 'text', (textNode) => {
        nodeText += textNode.value;
      });
      
      if (nodeText.includes('kanban:settings') || 
          (nodeText.includes('%%') && nodeText.includes('kanban')) ||
          (nodeText.includes('```') && nodeText.includes('kanban-plugin'))) {
        shouldSkip = true;
      }
      
      if (shouldSkip) return;
      
      filteredChildren.push(node);
      
      if (node.type === 'heading' && node.depth === 2) {
        if (currentColumn) columns.push(currentColumn);
        
        let title = '';
        visit(node, 'text', (textNode) => {
          title += textNode.value;
        });
          
        currentColumn = { title: title.trim(), tasks: [] };
      }
      else if (node.type === 'list' && currentColumn) {
        node.children.forEach(listItem => {
          if (listItem.type === 'listItem') {
            let content = '';
            visit(listItem, 'text', (textNode) => {
              content += textNode.value;
            });
            
            if (content.trim()) {
              currentColumn.tasks.push({
                checked: listItem.checked || false,
                content: content.trim()
              });
            }
          }
        });
      }
    });
    
    if (currentColumn) columns.push(currentColumn);
    
    tree.children = filteredChildren;
    
    if (columns.length > 0) {
      const newChildren = [];
      
      tree.children.forEach((node) => {
        if (node.type !== 'heading' && node.type !== 'list') {
          newChildren.push(node);
        }
      });
      
      let html = '<div style="display: flex; gap: 1rem; overflow-x: auto; padding: 1rem 0;">';
      
      columns.forEach(column => {
        html += `<div style="flex: 0 0 300px; background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">`;
        html += `<h3 style="margin: 0 0 1rem 0; color: #333;">${column.title} (${column.tasks.length})</h3>`;
        
        column.tasks.forEach(task => {
          const checked = task.checked ? 'checked' : '';
          const style = task.checked ? 'opacity: 0.6; text-decoration: line-through;' : '';
          html += `<div style="background: white; border: 1px solid #eee; border-radius: 4px; padding: 0.5rem; margin-bottom: 0.5rem; ${style}">`;
          html += `<input type="checkbox" ${checked} disabled style="margin-right: 0.5rem;"> ${task.content}`;
          html += `</div>`;
        });
        
        html += `</div>`;
      });
      
      html += '</div>';
      
      newChildren.unshift({
        type: 'html',
        value: `<style>
.table-of-contents { display: none !important; }
.theme-doc-toc-desktop { display: none !important; }
.col.col--3 { display: none !important; }
.row .col:not(.col--3) { max-width: 100% !important; flex: 0 0 100% !important; }
</style><div class="kanban-board-container">${html}<script>
setTimeout(() => {
  document.querySelectorAll('*').forEach(el => {
    const text = el.textContent || '';
    if (text.includes('kanban:settings') || text.includes('kanban-plugin') && text.includes('%%')) {
      el.style.display = 'none';
    }
  });
}, 100);
</script></div>`
      });
      
      tree.children = newChildren;
    }
  };
}

module.exports = function plugin() {
  return {
    name: 'docusaurus-plugin-obsidian-kanban',
    configureMarkdownProcessor(processor) {
      processor.use(remarkKanban);
      return processor;
    }
  };
};

module.exports.remarkKanban = remarkKanban;