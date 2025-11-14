import React from 'react';

const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  const renderContent = (text) => {
    // Split by lines
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];
    let inList = false;

    lines.forEach((line, idx) => {
      // Headings
      if (line.startsWith('### ')) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${idx}`} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<h3 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('## ')) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${idx}`} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<h2 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('# ')) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${idx}`} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<h1 key={idx} className="text-3xl font-bold text-gray-900 mt-6 mb-4">{line.replace('# ', '')}</h1>);
      }
      // List items
      else if (line.match(/^[*-]\s+/) || line.match(/^\d+\.\s+/)) {
        inList = true;
        const text = line.replace(/^[*-]\s+/, '').replace(/^\d+\.\s+/, '');
        listItems.push(<li key={`li-${idx}`} className="text-gray-700 ml-4">{formatInline(text)}</li>);
      }
      // Bold sections like **text**
      else if (line.match(/\*\*[^*]+\*\*/)) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${idx}`} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<p key={idx} className="text-gray-700 mb-3 leading-relaxed">{formatInline(line)}</p>);
      }
      // Empty line
      else if (line.trim() === '') {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${idx}`} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
      }
      // Regular paragraph
      else if (line.trim() !== '') {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${idx}`} className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<p key={idx} className="text-gray-700 mb-3 leading-relaxed">{formatInline(line)}</p>);
      }
    });

    // Add remaining list items
    if (listItems.length > 0) {
      elements.push(<ul key="list-final" className="list-disc list-inside space-y-2 mb-4">{listItems}</ul>);
    }

    return elements;
  };

  const formatInline = (text) => {
    // Handle bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      // Handle italic *text*
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className="prose prose-slate max-w-none">
      {renderContent(content)}
    </div>
  );
};

export default MarkdownRenderer;
