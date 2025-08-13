const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components/ui');

// Read all files in the components directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  // Filter for story files
  const storyFiles = files.filter(file => file.endsWith('.stories.tsx'));
  
  storyFiles.forEach(file => {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the import if it exists
    if (content.includes("@storybook/react")) {
      const updatedContent = content.replace(
        /from ['"]@storybook\/react['"]/g, 
        'from \'@storybook/react-vite\''
      );
      
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated imports in ${file}`);
    }
  });
  
  console.log('All story files have been updated!');
});
