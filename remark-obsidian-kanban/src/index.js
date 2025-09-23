const { visit } = require('unist-util-visit');

function remarkKanban(options = {}) {
  return (tree, file) => {
    const { pageResolver, hrefTemplate } = options;
    
    if (!pageResolver || !hrefTemplate) {
      return; // 如果沒有傳入必要參數就不處理
    }
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
            const card = { title: '', content: [] };
            
            // 處理第一層內容作為卡片標題
            if (listItem.children && listItem.children[0]) {
              const firstChild = listItem.children[0];
              if (firstChild.type === 'paragraph') {
                let titleText = '';
                visit(firstChild, (node) => {
                  if (node.type === 'text') {
                    titleText += node.value;
                  } else if (node.type === 'wikiLink') {
                    const linkText = node.data?.alias || node.data?.permalink || node.value || '';
                    titleText += linkText;
                  } else if (node.type === 'link' && node.children) {
                    node.children.forEach(child => {
                      if (child.type === 'text') titleText += child.value;
                    });
                  }
                });
                card.title = titleText.trim();
              }
            }
            
            // 處理縮排內容作為卡片內容
            if (listItem.children && listItem.children[1] && listItem.children[1].type === 'list') {
              const subList = listItem.children[1];
              subList.children.forEach(subItem => {
                if (subItem.type === 'listItem' && subItem.children) {
                  subItem.children.forEach(subChild => {
                    card.content.push(subChild);
                  });
                }
              });
            }
            
            if (card.title) {
              currentColumn.tasks.push(card);
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
        html += `<div style="flex: 0 0 300px; background: var(--ifm-color-emphasis-100); border: 1px solid var(--ifm-color-emphasis-300); border-radius: 8px; padding: 1rem;">`;
        html += `<h3 style="margin: 0 0 1rem 0; color: var(--ifm-color-primary); font-size: 1.1em;">${column.title} <span style="color: var(--ifm-color-emphasis-600); font-weight: normal;">${column.tasks.length}</span></h3>`;
        
        column.tasks.forEach(card => {
          html += `<div style="background: var(--ifm-card-background-color); border: 1px solid var(--ifm-color-emphasis-200); border-radius: 6px; padding: 0.75rem; margin-bottom: 0.75rem; color: var(--ifm-color-content); box-shadow: 0 1px 3px rgba(0,0,0,0.1);">`;
          html += `<div style="font-weight: 500; margin-bottom: 0.5rem; color: var(--ifm-color-primary-dark);">${card.title}</div>`;
          
          if (card.content && card.content.length > 0) {
            card.content.forEach(contentNode => {
              if (contentNode.type === 'paragraph') {
                let contentHtml = '';
                visit(contentNode, (node) => {
                  if (node.type === 'text') {
                    contentHtml += node.value;
                  } else if (node.type === 'strong') {
                    contentHtml += '<strong>';
                    if (node.children) {
                      node.children.forEach(child => {
                        if (child.type === 'text') contentHtml += child.value;
                      });
                    }
                    contentHtml += '</strong>';
                  } else if (node.type === 'emphasis') {
                    contentHtml += '<em>';
                    if (node.children) {
                      node.children.forEach(child => {
                        if (child.type === 'text') contentHtml += child.value;
                      });
                    }
                    contentHtml += '</em>';
                  } else if (node.type === 'wikiLink') {
                    const linkText = node.data?.alias || node.data?.permalink || node.value || (node.children && node.children[0] && node.children[0].value) || '';
                    
                    try {
                      // 使用傳入的 pageResolver 和 hrefTemplate
                      const resolvedPages = pageResolver(linkText);
                      const permalink = resolvedPages && resolvedPages[0] ? resolvedPages[0] : linkText.replace(/ /g, '-').toLowerCase();
                      const href = hrefTemplate(permalink);
                      
                      contentHtml += `<a href="${href}" style="color: var(--ifm-color-primary); text-decoration: none; border-bottom: 1px dotted var(--ifm-color-primary);">${linkText}</a>`;
                    } catch (error) {
                      console.warn(`Failed to resolve wikilink ${linkText}:`, error.message);
                      contentHtml += linkText;
                    }
                  } else if (node.type === 'link') {
                    contentHtml += '<a href="' + (node.url || '#') + '" style="color: var(--ifm-link-color);">';
                    if (node.children) {
                      node.children.forEach(child => {
                        if (child.type === 'text') contentHtml += child.value;
                      });
                    }
                    contentHtml += '</a>';
                  }
                });
                html += `<div style="font-size: 0.9em; color: var(--ifm-color-emphasis-700); margin-bottom: 0.25rem;">• ${contentHtml}</div>`;
              }
            });
          }
          
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
.kanban-board-container { background: var(--ifm-background-color); padding: 1rem; border-radius: 8px; }
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