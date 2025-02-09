# Data Structure Visualizer

A modern web application for visualizing and working with JSON data structures and SQL database schemas. Built with Next.js and TypeScript, featuring a clean and intuitive interface.

## Features

### JSON Visualizer

- **Interactive Tree View**: Visualize JSON data in a collapsible tree structure
- **JSON Formatting**: Automatically format and validate JSON input
- **Path Navigation**: Click on any node to see its access path
- **Syntax Highlighting**: Different colors for different data types
- **Error Handling**: Clear error messages for invalid JSON
- **Auto-formatting**: Convert single quotes to double quotes and fix common JSON syntax issues
- **Visual Hierarchy**: Clear indentation and connecting lines for better readability
- **Expandable/Collapsible Nodes**: Click to expand/collapse object and array nodes

### SQL Schema Designer

- **Table Management**: Create and visualize database tables
- **Column Configuration**: Add columns with names, types, and primary key settings
- **Relationship Mapping**: Define and visualize relationships between tables
- **Visual Representation**: Clear visual display of tables and their relationships
- **Primary Key Indicators**: Visual indicators for primary key columns
- **Relationship Types**: Support for table relationships with column mapping

## Usage

### JSON Visualization

1. **Input JSON**:
   - Paste your JSON data into the text area
   - Click "Format" to automatically format the input
   - Click "Preview" to generate the visualization

2. **Navigate the Tree**:
   - Click on arrows to expand/collapse nodes
   - Click on any node to see its access path
   - Hover over nodes to highlight them

3. **Access Paths**:
   - When you select a node, its access path appears below the visualization
   - Use this path to access the data in your code

### SQL Schema Design

1. **Create Tables**:
   - Click "Add Table" button
   - Enter table name
   - Add columns with their properties:
     - Column name
     - Data type
     - Primary key status

2. **Define Relationships**:
   - Click "Add Relation" button
   - Select source table and column
   - Select target table and column
   - Confirm to create the relationship

3. **Visualize Schema**:
   - View tables with their columns
   - See primary key indicators
   - Examine relationships between tables

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Lucide Icons

## License

MIT License