export const injectCss = (id:string, cssContent:string) => {
  // Check if a style element with the given ID already exists
  let styleElement = document.getElementById(id);

  if (!styleElement) {
    // If not, create a new style element
    styleElement = document.createElement('style');
    styleElement.id = id; // Set the unique ID
    document.head.appendChild(styleElement); // Append to the <head>
  }

  // Set or update the text content of the style element
  styleElement.textContent = cssContent;
};
export const removeCss = (id:string) => {
  const styleElement = document.getElementById(id);
  if (styleElement) {
    styleElement.remove(); // Remove the style element from the DOM
  }
};